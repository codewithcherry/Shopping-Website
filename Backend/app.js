const express = require('express');
const cors=require('cors');
require('dotenv').config();
const DB=require("./database/database");
const shopRouter=require("./routes/shopRoute");
const authRouter=require("./routes/authRoute");
const bodyParser=require('body-parser')

const app = express();

const URI=process.env.MONGO_URI;
const corsOptions={
  origin: ['http://localhost:3000','http://localhost:5173', 'https://yourfrontenddomain.com'], // Replace with your allowed domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  credentials: true, // Allow cookies and credentials (like tokens)
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'], // Allow authorization and other headers
}

//cnfigure cors
app.use(cors(corsOptions));
//configure body-parser to deal incoming json
app.use(bodyParser.json())
// Define a simple route
app.use('/products',shopRouter);
app.use('/',authRouter);

//connect database

DB.connectDb(URI);

// Start the server
const PORT =3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});