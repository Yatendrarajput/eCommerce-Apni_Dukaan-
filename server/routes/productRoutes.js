import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
<<<<<<< HEAD
  productFiltersController
=======
  productFiltersController,
  productCountController,
  productListController
>>>>>>> aa783d76f93c0526a8b04847191b353e482e4d5f
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js"
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

<<<<<<< HEAD
//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);
//filter
router.post("/product-filters",productFiltersController);
=======
//delete product
router.delete("/product/:pid", deleteProductController);
>>>>>>> aa783d76f93c0526a8b04847191b353e482e4d5f

//search products
router.get('/search/:keyword',searchProductController)
//searching on the basis of keyword

//similar product
router.get('/related-product/:pid/:cid',relatedProductController);

//filter
router.post("/product-filters",productFiltersController);

//product count
router.get('/product-count',productCountController);

//product per page
router.get('/product-list/:page',productListController);
export default router;