# Recall Demo App

A demo app demonstrating how to easily extract, interact with, and analyze meeting data using the [Recall API](https://recallai.readme.io/reference/recall-overview).

While it doesn't comprehensively cover all of Recall's APIs, it provides an easily extendable starting point for a variety of applications.

Some app ideas that could easily be built on top of this template:

- Real-time Sales coaching/assistants
- Employee Training and Development
- Content Creation & Marketing
- Project management integration
- Consumer facing personal productivity/time management
- Customer support optimization

## Project Structure

The repository is organized as a monorepo:

- [`server/`](server/): Express server folder responsible for handling API requests, interacting with the database, and proxying the Recall API.
- [`client/`](client/): React frontend folder containing the user interface for interacting with the intelligence data.
- [`types/`](types/): Typescript definitions shared by the frontend application and server.

_See each directory's README file for more in-depth information._

## Getting Started

### Prerequisites

- Node.js (version >= 16)

### Installation & Configuration

1. Clone the repository:

   ```bash
   git clone github.com/zakislaboratory/recall-demo-app
   ```

2. Create a `.env` file in the [server/](server/) directory.
   
   _Note: For simplicity, duplicate the [.env.example](/server/.env.example) file and name it `.env`_

4. Set the `RECALL_API_KEY` environment variable to your Recall API key.

### Install dependencies

Starting from the root of the project, navigate to the server directory and install dependencies:

```bash
cd server && npm install
```

Then, navigate to the client directory and install the react app's dependencies:

```bash
cd .. && cd client && npm install
```

### Run the app

At the root of the server directory, run:

```bash
npm run serve
```

Open another terminal window. Now, at the root of the client directory, run:

```bash
npm run dev
```

The app is now running on http://localhost:5173/ 🎉
