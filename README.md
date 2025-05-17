# Anonymous Voting Application

A simple web application that allows users to anonymously vote between two options using a 4-character PIN login.

## Features

- Anonymous voting with secure PIN codes (2 letters + 2 numbers)
- Two voting options: Google Meet (~$100/person) or Zoom (free)
- Real-time results display with vote counts and percentage bars
- Simple and intuitive user interface

## Installation

1. Clone this repository
2. Install dependencies
   ```
   npm install
   ```
3. Start the application
   ```
   npm start
   ```

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Enter your 4-character PIN to login
3. Select your preferred option and submit your vote
4. View the results

## PIN Codes

The system generates 15 unique PIN codes that each contain 2 letters and 2 numbers, avoiding confusing characters like P, O, 0, B, 6, Q, I, 1, D.

In development mode, you can see the list of valid PINs by:
- Checking the console output when the server starts
- Accessing the `/admin-codes` endpoint

## Deployment

### Deploying to Render

1. Create a Git repository with this code
2. Sign up for [Render](https://render.com)
3. Create a new Web Service
4. Connect your repository
5. Render will automatically detect the configuration in `render.yaml`
6. Click "Create Web Service"

Render will automatically deploy your application and provide a URL to access it.

### Environment Variables

- `PORT`: Port for the server (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `SESSION_SECRET`: Secret for session encryption

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript) for templating
- CSS for styling

## Development

To run the application in development mode with automatic restart:

```
npm run dev
```

Note: This requires nodemon, which you can install globally with `npm install -g nodemon` 