import express from "express";
import {
	createProduct,
	deleteProduct,
	getProducts,
	updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// get product - route
router.get("/", getProducts);

// create product - route
router.post("/", createProduct);

// delete product - route
router.delete("/:id", deleteProduct);

// update product - route
router.put("/:id", updateProduct);

export default router;
