import mongoose from "mongoose";
import 'dotenv/config';
import colors from 'colors';
import users from "./users.js";
import products from "./products.js";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import Order from "./models/order.model.js";
import connectDB from "./configs/db.js";


connectDB();

const importData = async() =>{
    try{

        await Order.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        await User.deleteMany();

        // insert users 
        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((p) => (
            {
                ...p,
                user : adminUser
            }
        ));

        // insert products with admin id
        const dbProducts  = await Product.insertMany(sampleProducts);

        // consoling the success message
        console.log("Data Imported!");
        process.exit();
    }catch(error){
        console.log(`DATABASE MANIPULATION ERROR:  ${error.message}`.red.inverse);
    }
}


const destroyData = async() =>{

    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        await User.deleteMany();

        console.log("Data Removed!");
    }catch(error){
        console.log(`DATABASE MANIPULATION ERROR:  ${error.message}`.red.inverse);
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}
