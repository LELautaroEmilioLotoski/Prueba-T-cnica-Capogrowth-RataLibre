
/**
 * Esta función toma un objeto que contiene los detalles y la descripción de un producto (obtenidos desde la API de Mercado Libre)
 * y devuelve un objeto formateado con los campos relevantes en español.
 */

import { IProductInfo } from "../interfaces/IProductInfo";


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
  