// import {supabase} from '../config/supabase'
// import { Request, Response } from 'express'
// import bcrypt from 'bcryptjs'
// export const signupController = async (req:Request, res: Response) =>{
//     try{
//         const {username, email, password} = req.body
//         const user =  await supabase.from('users').select(email)

//         if(user){
//             return res.status(400)
//                 .json({message:"User already exists",sucess: false })
//         }
//         const hashedpassword = await bcrypt.hash(password,10)
//         const {data, error} = await supabase.from('Users').insert([{
//             username: username,
//             email: email,
//             password: hashedpassword
//         }])
//         if(error){
//             console.error(error)
//             return
//         }
//         console.log(data)

//     }
//     catch(error){
//         res.status(500)
//             .json({
//                 message:"Signup failed",
//                 sucess: false
//             })
//     }
// }