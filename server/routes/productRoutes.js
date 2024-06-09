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
  productFiltersController,
  productCountController,
  productListController
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
=======
//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);
//filter
router.post("/product-filters",productFiltersController);
>>>>>>> 1a0bd20ae6744349211b398295be98848389a36a
//delete product
router.delete("/product/:pid", deleteProductController);

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
//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);
//filter
router.post("/product-filters",productFiltersController);

export default router;