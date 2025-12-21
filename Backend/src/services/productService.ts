import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { IProductDetails } from "../interfaces/IProductDetails";
import { IProductInfo } from "../interfaces/IProductInfo";

/**
 * getProductMlService
 *
 * Esta función obtiene los productos publicados por un vendedor específico desde la API de Mercado Libre.
 * 
 * Pasos:
 * 1. Obtiene el repositorio de usuarios (User) de la base de datos local.
 * 2. Busca en la base de datos al usuario cuyo sellerId coincida con el proporcionado. 
 *    Si no existe, lanza un error.
 * 3. Realiza una petición GET a la API de Mercado Libre para traer los productos (items) publicados por el vendedor.
 *    Se utiliza el token JWT del usuario en la cabecera Authorization para autenticación.
 * 4. Si la respuesta de la API no es exitosa, lanza un error con el código HTTP correspondiente.
 * 5. Devuelve los datos recibidos de la API en formato JSON.
 */

export const getProductMlService = async (sellerId: string, userToken: string) => {
  // Paso 1: obtenemos el repositorio de usuarios
  const userRepository = AppDataSource.getRepository(User);

  // Paso 2: buscamos el usuario por sellerId
  let user = await userRepository.findOne({
    where: { sellerId },
  });

  if (!user) {
    // Si no se encuentra, lanzamos un error
    throw new Error("El usuario no fué encontrado");
  }

  // Paso 3: petición a la API de Mercado Libre para obtener los productos del usuario
  const response = await fetch(
    `https://api.mercadolibre.com/users/${sellerId}/items/search`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`, // Token de autenticación de Mercado Libre
      },
    }
  );

  // Paso 4: control de errores HTTP
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  // Paso 5: devolvemos la data en JSON
  const data = await response.json();

  return data;
};

/**
 * getProductsDetailed
 *
 * Esta función obtiene información detallada y la descripción de uno o varios productos desde la API de Mercado Libre,
 * utilizando IDs de productos (en formato string, separados por coma).
 * 
 * Pasos:
 * 1. Obtiene el repositorio de la entidad User.
 * 2. Busca al usuario en la base de datos cuyo sellerId coincida con el proporcionado.
 *    Si no se encuentra, lanza un error.
 * 3. Realiza dos peticiones GET a la API de Mercado Libre:
 *    a) Una para obtener los detalles generales del/los producto(s) según los IDs.
 *    b) Otra para obtener la(s) descripción/descripciones de ese/estos producto(s).
 *    Ambas peticiones usan el token JWT de Mercado Libre para autenticación.
 * 4. Si alguna de las respuestas de la API no es exitosa, lanza un error con el código HTTP correspondiente.
 * 5. Devuelve un objeto con los detalles y la descripción obtenida(s) desde la API.
 */

export const getProductsDetailed = async(sellerId: string, userToken: string, productsIds: string): Promise<IProductInfo> => {
    // Paso 1: obtener el repositorio de usuarios
    const userRepository = AppDataSource.getRepository(User);

    // Paso 2: buscar el usuario según sellerId
    let user = await userRepository.findOne({
      where: { sellerId },
    });
  
    if (!user) {
      // Si el usuario no existe, lanzar error
      throw new Error("El usuario no fue encontrado");
    }

    // Paso 3a: solicitud a la API de ML para detalles de producto(s) por IDs
    const response = await fetch(
      `https://api.mercadolibre.com/items/${productsIds}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // Token ML
        },
      }
    );

    // Paso 3b: solicitud a la API de ML para descripción/es de producto(s) por IDs
    const secondResponde = await fetch(
      `https://api.mercadolibre.com/items/${productsIds}/description`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // Token ML
        },
      }
    );

    // Paso 4: verificar si las respuestas son exitosas
    if (!response.ok || !secondResponde.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // Paso 5: devolver detalles y descripciones parseados como JSON
    const data = await response.json() as IProductInfo['data'];
    const dataDescription = await secondResponde.json() as IProductInfo['dataDescription'];  

    return {data, dataDescription};
}


export const productsSavedInBdd = async(products: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
  const productRepository = AppDataSource.getRepository(Product);

  let product = await productRepository.findOne({
    where: { item_id: products.item_id },
  });

  if (!product) {
    product = productRepository.create(products);
    await productRepository.save(product);
  }
  return product;
}