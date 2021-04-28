const express = require('express');
const app = express();
const connectDB = require('./config/db');

app.use(express.urlencoded({ extended: true }));

//connect the database
connectDB();

app.get('/', (req, res) => res.send('API running.'));

//Define the routes
app.use('/api/reportAircraft', require('./routes/api/reportAircraft'));
app.use('/api/searchArea', require('./routes/api/searchArea'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));