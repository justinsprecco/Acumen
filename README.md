# Acumen

## Table of Contents

<!--toc:start-->

- [About The Project](#about-the-project)
- [Building from Source](#building-from-source)
  - [Prerequisites](#prerequisites)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [License](#license)

<!--toc:end-->

<!-- ABOUT THE PROJECT -->

## About The Project

Acumen is an open source, self-hosted, project management server.

<!-- BUILDING FROM SOURCE -->

## Building from Source

Acumen consists of a frontend and a backend, both using Node.js.

- The backend is using Express.js.
- The frontend is using React.js.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v20.11.1 or above)

Start with cloning the repo:
`git clone https://github.com/justinsprecco/Acumen`

### Backend

1. Navigate into the server directory: `cd server`
1. Configure environment:
   - `cp .env.example .env`
   - Configure `.env`.
1. Install dependencies with `npm install`
1. Run developement server with `npm run dev`
1. Web server is available at `https://<hostname>:3000`.

### Frontend

1. Navigate into the frontend directory: `cd client`
1. Install dependencies with `npm install`
1. Run developement server with `npm run dev`
1. Visit `http://<hostname>:5173` to access the web interface.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.
