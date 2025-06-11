import mongoose from "mongoose";
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		if (!products.length) {
			return res.status(404).json({ success: false, message: "No products!" });
		}
		res.status(200).json({
			success: true,
			message: "All products retrieved successfully!",
			data: products,
		});
	} catch (error) {
		console.error(`Failed to retrieve products: ${error.message}`);
		res.status(500).json({ success: false, message: "Server Error!" });
	}
};

export const createProduct = async (req, res) => {
	const product = req.body; // user will send this data, from frontend

	if (!product.name || !product.price || !product.image) {
		return res
			.status(400)
			.json({ success: false, message: "Please, provide all the fields!" });
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.log(`Error in product creation: ${error.message}`);
		res.status(500).json({ success: false, message: "Internal Server Error!" });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;
	console.log(`id: ${id}`);

	try {
		const deleteProduct = await Product.findByIdAndDelete(id);
		if (!deleteProduct) {
			return res
				.status(404)
				.json({ success: false, message: "Product not found!" });
		}
		res
			.status(200)
			.json({ success: true, message: "Product deleted successfully!" });
	} catch (error) {
		console.log(`Error in deletion product: ${error.message}`);
		res.status(500).json({ success: false, message: "Server Error!" });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const { name, price, image } = req.body;
	console.info(`updating product with id: ${id}`);

	if (!mongoose.Types.ObjectId.isValid(id)) {
		console.error(`Invalid Product`);
		return res.status(400).json({ success: false, message: "Invalid Product" });
	}

	try {
		// validate request body
		if (!name || !price || !image) {
			return res
				.status(400)
				.json({ success: false, message: "Missing required fields!" });
		}

		// find and update the product using product id
		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			{
				name,
				price,
				image,
			},
			{ new: true }
		);
		if (!updatedProduct) {
			return res
				.status(404)
				.json({ success: false, message: "Product not found!" });
		}
		res.status(200).json({
			success: true,
			message: "Product update successfully!",
			updatedProduct,
		});
	} catch (error) {
		console.error(`Error in updating of product: ${error.message}`);
		res.status(500).json({ success: false, message: "Internal Server Error!" });
	}
};
