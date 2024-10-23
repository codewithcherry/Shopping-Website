const mongoose=require('mongoose');

exports.connectDb=(URI)=>{
    mongoose.connect(URI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('MongoDB connection failed:', error);
         })
}