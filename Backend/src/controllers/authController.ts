import { Request, Response } from "express";
import{ mlAuthLoginService, exchangeCodeForToken, saveTokenInBdd } from "../services/authService";
import { MlTokenResponse } from "../interfaces/ITokenResponse";

export const mlAuthLoginController = async(req: Request, res: Response) => {
    
    try {
        const redirectUri = await mlAuthLoginService()
        
        res.redirect(redirectUri);
    } catch (error) {
        console.log("ALGO SALIÓ MAL");
        console.log(error);
        throw error
    }

}

export const mlCallback = async (req: Request, res: Response) => {
    const { code } = req.query;

    if (typeof code !== "string") {
      return res.status(400).json({
        error: "Invalid or missing authorization code",
      });
    }
  
    try {
      const tokenData: MlTokenResponse = await exchangeCodeForToken(code);
      
      if (tokenData.access_token != undefined){
        await saveTokenInBdd(tokenData, tokenData.user_id)
      }

      const data = res.json({
        message: "Callback OK",
        tokenData,
      });

      return data
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Error exchanging code for token",
      });
    }
  };