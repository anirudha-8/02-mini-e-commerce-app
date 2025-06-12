import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../services/productServices";

const ProductForm = ({ onSuccess, productToEdit, closeForm }) => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [result, setResult] = useState("");

	const isEditMode = !!productToEdit;

	useEffect(() => {
		if (isEditMode) {
			setName(productToEdit.name);
			setPrice(productToEdit.price);
			setImage(productToEdit.image);
		}
	}, [productToEdit]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const productData = { name, price, image };

		try {
			if (isEditMode) {
				await updateProduct(productToEdit._id, productData);
				setResult("Product updated successfully!");
			} else {
				await createProduct(productData);
				setResult("New product added successfully!");
			}
			onSuccess();
			resetForm();
			closeForm();
		} catch (error) {
			console.error(error);
			setResult("Failed to save product.");
		}
	};

	const resetForm = () => {
		setName("");
		setPrice("");
		setImage("");
		setResult("");
	};

	return (
		<div className="p-4 border mt-4">
			<h1 className="text-xl font-semibold mb-2">
				{isEditMode ? "Edit Product" : "Add New Product"}
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-3">
				<input
					type="text"
					placeholder="Product Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					className="border p-2 rounded"
				/>
				<input
					type="number"
					placeholder="Product Price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					required
					className="border p-2 rounded"
				/>
				<input
					type="text"
					placeholder="Product Image URL"
					value={image}
					onChange={(e) => setImage(e.target.value)}
					required
					className="border p-2 rounded"
				/>
				<div className="flex gap-2">
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					>
						{isEditMode ? "Update" : "Add"}
					</button>
					<button
						type="button"
						onClick={resetForm}
						className="bg-gray-300 px-4 py-2 rounded"
					>
						Reset
					</button>
				</div>
			</form>
			{result && <p className="mt-2 text-green-600">{result}</p>}
		</div>
	);
};

export default ProductForm;
