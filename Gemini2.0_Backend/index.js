const express = require('express');
const route = require('./routes/routes');
const { dbConnect } = require('./config/Database');
require("dotenv").config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

// CORS configuration (✅ move this  above)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Database connection
dbConnect();

// Use the routes module for API routes
app.use('/api/v1', route);

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
