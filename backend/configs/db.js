import mongoose from "mongoose";

const connectDB = async() =>{

    try{

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log('MONGO DB CONNECTED!');
    }catch(error){  
        console.log(`DB CONNECTION ERROR : ${error.message}`);
        process.exit(1);
    }
} 

export default connectDB;