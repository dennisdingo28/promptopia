import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async(req,{params}) =>{
    try{
        await connectToDB();

        const user = await User.findById(params.id);

        if(!user)
            return new Response(`Cannot find any user with the id of ${params.id}`);
        return new Response(JSON.stringify(user),{status:200});
            
    }catch(err){
        console.log(err);
    }
}