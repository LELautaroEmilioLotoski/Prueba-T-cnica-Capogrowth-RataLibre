import { AppDataSource } from "../config/data-source";
import { MlToken } from "../entities/MlToken";
import { User } from "../entities/User";
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

  /**
   * Guarda el token de Mercado Libre en la base de datos.
   * 
   * El sellerId corresponde al ID del usuario en Mercado Libre.
   *
   * 1. Busca el usuario por sellerId, o lo crea si no existe.
   * 2. Busca el token asociado a ese usuario, o lo crea si no existe.
   * 3. Actualiza o asigna accessToken, refreshToken y expiresIn.
   * 4. Guarda el token en la base y lo retorna.
   */

  export const saveTokenInBdd = async (
    tokenData: MlTokenResponse,
    sellerId: string
  ) => {
    // Repositorio para la entidad User
    const userRepository = AppDataSource.getRepository(User);
    // Repositorio para la entidad MlToken
    const tokenRepository = AppDataSource.getRepository(MlToken);
  
    // 1. Buscar si ya existe un usuario con ese sellerId
    let user = await userRepository.findOne({
      where: { sellerId },
    });
  
    // 2. Si el usuario no existe, lo crea y lo guarda
    if (!user) {
      user = userRepository.create({ sellerId });
      await userRepository.save(user);
    }
  
    // 3. Buscar si ya existe un token para ese usuario
    let token = await tokenRepository.findOne({
      where: { user: { id: user.id } },
      relations: ['user'],
    });
  
    // 4. Si el token no existe, crea uno nuevo asociado al usuario
    if (!token) {
      token = tokenRepository.create({
        user,
      });
    }
  
    // 5. Actualiza los datos del token con la información recibida
    token.accessToken = tokenData.access_token;
    token.refreshToken = tokenData.refresh_token;
    token.expiresIn = tokenData.expires_in;
  
    // 6. Guarda y retorna el token
    return await tokenRepository.save(token);
  };