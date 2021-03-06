import { plainToClass } from "class-transformer";
import { Request, Response, Router } from "express";
import { ProductController } from "../controllers/products.controller";
import { statusCodes } from "../core/enums/statuscodes.enum";
import { buildResponse } from "../core/interfaces/requests/baseResquestHandler/baseResponse.interface";
import { CreateCategory } from "../core/interfaces/requests/category/createCategory.Req";
import { Product } from "../core/interfaces/requests/products/createProducts.Req";
import { ProductFilter } from "../core/interfaces/requests/products/productsFilter.Req";
export class productRoute {
    constructor( private appRouter: Router,private productController:ProductController){
        this.startRouting();
    }
    private startRouting = () => {
        // needs admin token
        this.appRouter.post('/add-product',this.addProduct);
        this.appRouter.put('/update-product');
        this.appRouter.post('/hide-products');

        this.appRouter.get('/get-product');
        this.appRouter.get('/get-all-products');
        this.appRouter.delete('/delete-product');
        
        // categories
        this.appRouter.post('/add-category');
        this.appRouter.delete('/delete-category');
        this.appRouter.put('/update-category');
        this.appRouter.get('/get-categories');
    }

    addProduct = async (req:Request,res:Response) => {
        try {
            const reqBody = plainToClass(Product, req.body);
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
    updateProduct = async (req:Request, res:Response) => {
        try {
            const reqBody = plainToClass(Product, req.body);
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
    hideProduct = async (req:Request, res:Response) => {
        try {
            const id =(req.query.id as string);
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
    getProdcutById = async (req:Request, res:Response) => {
        try {
            const id =(req.query.id as string);
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
    getAllProductWithFilters = async (req:Request, res:Response) => {
        try {
            const reqBody = plainToClass(ProductFilter, req.body);
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
    deleteProductId = async (req:Request, res:Response) => {
        try {
            const id =(req.query.id as string);
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
    /* Categories routes*/
    addCategory = async (req:Request,res:Response) => {
        try {
            const reqBody = plainToClass(CreateCategory, req.body);
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
    updateCategory = async (req:Request,res:Response) => {
        try {
            const reqBody = plainToClass(CreateCategory, req.body);
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
    getCategoryById = async (req:Request, res:Response) => {
        try {
            const id =(req.query.id as string);
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
    getAllCategoriesWithFilter  = async (req:Request,res:Response) => {
        try {
            const reqBody = plainToClass(CreateCategory, req.body);
        } catch (error) {
            res.status(error.statusCode).json(error)
        }
    }
}