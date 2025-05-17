# Anonymous Voting Application

A simple web application that allows users to anonymously vote between two options using a 4-digit PIN login.

## Features

- Anonymous voting with 4-digit PIN
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
2. Enter a 4-digit PIN to login
3. Select your preferred option and submit your vote
4. View the results

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