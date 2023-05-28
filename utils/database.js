import mongoose, { mongo } from "mongoose";

let isConnected = false;

export const connectToDB = async() =>{
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log('MongoDB is already connnected');
        return;
    }

    try{
        console.log('before');
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected=true;

        console.log('MONGODB connected');
    }catch(err){
        console.log(err);
    }
}