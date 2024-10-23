const express = require('express');
const cors=require('cors');
const shopRouter=require("./routes/shopRoute");

const app = express();


const corsOptions={
  origin: ['http://localhost:3000','http://localhost:5173', 'https://yourfrontenddomain.com'], // Replace with your allowed domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  credentials: true, // Allow cookies and credentials (like tokens)
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'], // Allow authorization and other headers
}

//cnfigure cors
app.use(cors(corsOptions));
// Define a simple route
app.use(shopRouter);

// Start the server
const PORT =3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});