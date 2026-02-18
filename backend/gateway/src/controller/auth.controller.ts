import {supabase} from '../config/supabase'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JsonWebTokenError } from 'jsonwebtoken'
export const signupController = async (req:Request, res: Response) =>{
    try{
        const {username, email, password} = req.body
        const {data: existingUser, error: fetchError} =  await supabase.from('Users').select('*').eq('email',email).single()

        if(existingUser){
            return res.status(400)
                .json({message:"User already exists",sucess: false })
        }
        const hashedpassword = await bcrypt.hash(password,10)
        const {data, error} = await supabase.from('Users').insert([{
            username: username,
            email: email,
            password: hashedpassword
        }]).select()
        if(error){
            console.error(error)
            return res.status(500)
                .json({message: "Database error", success: false})
        }
        return res.status(201)
            .json({
                message: "SignUp Successfull",
                user:{
                    id: data?.[0]?.id,
                    username: data?.[0]?.username,
                    email: data?.[0]?.email
                }
            })
        

    }
    catch(error){
        res.status(500)
            .json({
                message:"Signup failed",
                sucess: false
            })
    }
}

export const loginController = async(req: Request, res: Response) =>{
    try{
    const {email, password} = req.body
    const errorMessage= "Email or password incorrect"
    const {data: userExists} = await supabase.from('Users').select('*').eq('email', email).single()
    if(!userExists){
        return res.status(403)
            .json({message: errorMessage, success: false})
    }
    console.log(userExists)
    // const hashedpassword = await bcrypt.hash(password,10)
    // console.log(hashedpassword)
    const ispassEqual = await bcrypt.compare(password, userExists.password)
    if(!ispassEqual){
        return res.status(403)
            .json({message: errorMessage, success: false})
    }
    const jwtToken = jwt.sign(
        {username: userExists.username, id: userExists.id},
        process.env.JWT_SECRET as string,
        {expiresIn: '24h'}
    )
    res.status(200)
        .json({
            message:"Login Successful",
            token: jwtToken,
            email: userExists.email,
            username: userExists.username
        })

    }
    catch(err){
        console.log(err)
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })

    }
}