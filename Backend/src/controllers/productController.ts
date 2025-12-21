import { Request, Response } from "express";
import { getProductMlService, getProductsDetailed, productsSavedInBdd } from "../services/productService";
import { getProductsIds } from "../utils/getProductsIds";
import { getProducts } from "../utils/getProducts";
import { IProductInfo } from "../interfaces/IProductInfo";

export const productMlController = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userToken = (req as any).mlToken; 

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {        
        const respuesta = await getProductMlService(userId, userToken);
        const productsIds = await getProductsIds(respuesta);

        const productsDetailed = await getProductsDetailed(userId, userToken, productsIds);

        const products = await getProducts(productsDetailed);

        console.log(`ESTE ES EL LOG DEL CONTROLADOR: ${products}`);
        

        await productsSavedInBdd(products);

        return res.json(productsDetailed);// devolver algo al cliente
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
