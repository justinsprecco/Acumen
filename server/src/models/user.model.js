import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const { hash, compare } = bcrypt;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hashedPassword = await hash(this.password, 8);
    user.password = hashedPassword;
  }
  next();
});

userSchema.statics.register = async function (username, email, password) {
  const existingUser = await this.findOne({ $or: [{ username }, { email }] });
  if (existingUser) throw new Error("Username or email already exists");

  const newUser = new this({ username, email, password });
  await newUser.save();
  return { userId: newUser._id };
};

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) throw new Error("User not found");

  const isMatch = await compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  return { userId: user._id };
};

const User = model("User", userSchema);

export default User;
