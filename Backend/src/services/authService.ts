import { MlTokenResponse } from "../interfaces/ITokenResponse";

export const mlAuthLoginService = () => {
    const url =
    `https://auth.mercadolibre.com.ar/authorization` +
    `?response_type=code` +
    `&client_id=${process.env.ML_CLIENT_ID}` +
    `&redirect_uri=${process.env.ML_REDIRECT_URI}`;

    return url;
}

export const exchangeCodeForToken = async (
    code: string
  ): Promise<MlTokenResponse> => {
    const response = await fetch("https://api.mercadolibre.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: process.env.ML_CLIENT_ID,
        client_secret: process.env.ML_CLIENT_SECRET,
        code,
        redirect_uri: process.env.ML_REDIRECT_URI,
      }),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
  
    return (await response.json()) as MlTokenResponse;
  };
