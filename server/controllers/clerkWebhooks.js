import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks= async(req, res)=>{

    // Create a svix instance with clerk secret
    try {
        const whook= new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //getting headers
        const headers={ 
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        //verifying headers
        await whook.verify(JSON.stringify(req.body), headers)

        //getting data from request body
        const {data,type}= req.body

        //switch case for different events
        switch (type) {
            case "user.created":{
            // const userData={
            // _id: data.id,
            // email: data.email_addresses[0].email_address,
            // username: data.first_name + " " + data.last_name,
            // image: data.image_url,
            // }
            // await User.create(userData);
            // break;
            try {
                    const userData={
                        _id: data.id,
                        email: data.email_addresses[0].email_address,
                        username: data.first_name + " " + data.last_name,
                        image: data.image_url,
                    }
                    
                    // Check if user already exists to prevent duplicates
                    const existingUser = await User.findById(data.id);
                    if (existingUser) {
                        console.log('User already exists:', data.id);
                        break;
                    }
                    await User.create(userData);
                    console.log(' User created successfully:', data.id);
                } catch (userError) {
                    console.error('Failed to create user:', userError.message);
                    // Don't throw error - let the webhook continue
                }
                break;
            }

            case "user.updated":{
            const userData={
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
        }
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            } 
            
            default:
                break;
        }
        
        res.json({success:true, message:"Webhook Recieved"})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

export default clerkWebhooks;