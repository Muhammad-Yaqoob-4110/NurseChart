# NurseChart Backend
This repository contains the backend code for the NurseChart application. It provides APIs and services necessary for the application to function.

## Prerequisites

- Node.js (version 14 or later)
- npm (Node Package Manager)

## Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Muhammad-Yaqoob-4110/NurseChart.git
cd NurseChart
```

## Install Dependencies
Navigate to the backend directory and install the required dependencies:
```bash
cd backend
npm install
```

## Configuration
You need to create a configuration file to set up the MongoDB URL and JWT verification token. This file should be placed in the `NurseChart/backend/utils` directory.

Create a file named config.json in the `NurseChart/backend/utils` directory with the following content:

```javascript
{
    "mongodb_url": "PASTE_YOUR_MONGO_URL",
    "jwt_verify_token": "adsfasdfjkh$#asdfasdf.adsfxc"
}
```

## Running the Server
To start the backend server with `nodemon`, use the following command:
```bash
nodemon start
```
The server will be available at http://localhost:3850

