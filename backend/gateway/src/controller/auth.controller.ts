import { supabase } from "../config/supabase";
import { Request, Response } from "express";

export const testSignup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(400).json(error);

  res.json(data);
};

export const testLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json(error);

  res.json(data.session); 
};
