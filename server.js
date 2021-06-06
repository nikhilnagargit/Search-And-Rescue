const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');

app.use(express.json());

//connect the database
connectDB();

//Define the routes
app.use('/api/reportAircraft', require('./routes/api/reportAircraft'));
app.use('/api/searchArea', require('./routes/api/searchArea'));
app.use('/api/searchPattern', require('./routes/api/searchPattern'));
app.use('/api/rescueTeam', require('./routes/api/rescueTeam'));

const PORT = process.env.PORT || 5000;

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
