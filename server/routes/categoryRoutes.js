import  express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js'

const router =express.Router()

//routes 
//create category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController);

//update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get all categories
router.get('/get-category',categoryController)

//get a single category
router.get('/single-category/:slug',singleCategoryController)

//delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default router
