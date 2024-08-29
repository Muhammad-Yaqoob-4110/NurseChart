# NurseChart - Frontend
Frontend for NurseChart is implemented in React. This README provides instructions on how to set up and run the application.

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
Go to the project's client directory and install the dependencies
```bash
cd client
npm install
```
## Configuration
Create a configuration file named config.js in the `NurseChart/client/src/components` directory with the following content:
```javascript
const config = {
    apiKey: "PASTE_YOUR_GEMINI_API_KEY_HERE"
};

export default config;
```

You can get your free Google Gemini Api key by following this: [Get your Google Gemini Api Key](https://ai.google.dev/gemini-api/docs/api-key)

## Running the Application
To start the React development server, run:
```bash
npm run start
```

The application will be available at http://localhost:3000 in your web browser.
