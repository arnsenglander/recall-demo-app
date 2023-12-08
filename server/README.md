# Server

The server is an Express API that predominantly serves as a proxy for the recall API. It also contains starter code that allows you to integrate with various SQL databases.

## Project Structure
The server is organized as follows:

`controllers/`: This directory contains route handlers for each endpoint. These handlers process incoming requests, interact with the database, and return appropriate responses.

`data/`: A data directory for storing database data on-disk. This is generated on the fly and only for development/testing purposes with SQLite (the default).

`db/`: The db directory contains the database setup, including [Sequelize](https://sequelize.org/api/v6/identifiers) configuration. 

`models/`: Database schemas defined using Sequelize. These schemas allow you to easily define data models and automatically generate SQL code for migrations via Sequelize.

`services/`: Encapsulates functionality related to external API's and services (i.e. the Recall API). 

## Getting Started

Install Dependencies:

```bash
npm install
```

Setup Environment Variables:
- Create a .env file in the root of the server directory (or just duplicate .env.example for simplicity).
- Add your Recall API key to the .env file:
```bash
RECALL_API_KEY=your_recall_api_key_here
```

Run the Server:
```bash
npm start
```

The server will run on http://localhost:3000 by default.

## Database Configuration

The server uses Sequelize as the ORM, allowing it to work with various database systems. 

You can adapt the database type and connection details by modifying the Sequelize configuration. See [db/config.ts](/server/db/config.ts) for more info.

### Defining Models
The [models/](/server/models/) directory is where you define new database models.

If you're unfamiliar with Sequelize, there's an [example model](/server/models/meeting.ts) provided.

**Important note:** Sequelize is just a general-purpose, well-maintained ORM solution. There are many great ones out there, so feel free to use your own.

## Make it your own

Feel free to customize this template based on additional details specific to your project.
