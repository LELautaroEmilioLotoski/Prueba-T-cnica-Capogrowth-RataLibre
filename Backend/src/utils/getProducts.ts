
/**
 * Esta función toma un objeto que contiene los detalles y la descripción de un producto (obtenidos desde la API de Mercado Libre)
 * y devuelve un objeto formateado con los campos relevantes en español.
 */

import { IProductDetails } from "../interfaces/IProductDetails";
import { IProductInfo } from "../interfaces/IProductInfo";
import { IProductApiData } from "../interfaces/IProductApiData";

// export const getProducts = async (information: IProductInfo) => {
//     const { data, dataDescription } = information;

//     const { id, title, price, status, available_quantity, sold_quantity, category_id }: IProductApiData = data;
//     const { plain_text }= dataDescription;

//     const products: IProductDetails= {
//         "item_id": id,
//         "titulo": title,
//         "precio": price,
//         "estado": status,
//         "stock_disponible": available_quantity,
//         "vendidos": sold_quantity,
//         "categoria": category_id,
//         "descripcion": plain_text
//     };

//     console.log(products);
    

//     return products;
// }


export const getProducts = async (information: IProductInfo) => {
    const { data, dataDescription } = information;
  
    const {
      id,
      title,
      price,
      status,
      available_quantity,
      sold_quantity,
      category_id
    } = data;
  
    const { plain_text } = dataDescription;
  
    const product = {
      item_id: id,
      title,
      price,
      status,
      available_quantity,
      sold_quantity,
      category_id,
      plain_text
    };
  
    return product;
  };
  