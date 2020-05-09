const express = require('express');
const connectDb = require('./config/db');
const app = express();

/// Connect db
connectDb();

// Init middleware
app.use(express.json({extended: false}));

// Define Routes
app.get('/', (req,res) => {res.send('Hello World')});
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


const PORT= process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
