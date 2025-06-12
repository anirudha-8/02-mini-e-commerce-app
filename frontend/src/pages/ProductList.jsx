import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../services/productServices.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductForm from "../components/ProductForm.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showProductForm, setShowProductForm] = useState(false);
	const [productToEdit, setProductToEdit] = useState(null);

	const fetchProducts = async () => {
		try {
			const res = await getAllProducts();
			const data = res?.data;

			if (!data || data.length === 0) {
				setError("No products added yet.");
				setProducts([]);
			} else {
				setProducts(data);
			}
		} catch (err) {
			console.error("Fetch Error:", err);
			setError("Failed to fetch products. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this product?"))
			return;

		try {
			await deleteProduct(id);
			setProducts((prev) => prev.filter((product) => product._id !== id));
			toast.success("Product deleted successfully!");
		} catch (error) {
			console.error("Delete error:", error);
			toast.error("Failed to delete product.");
		}
	};

	const handleEdit = (product) => {
		setProductToEdit(product);
		setShowProductForm(true);
	};

	const handleCloseForm = () => {
		setShowProductForm(false);
		setProductToEdit(null);
	};

	return (
		<>
			<div className="px-6 pt-4">
				<button
					onClick={() => {
						setProductToEdit(null);
						setShowProductForm(true);
					}}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					Add New Product
				</button>

				{showProductForm && (
					<ProductForm
						productToEdit={productToEdit}
						onSuccess={fetchProducts}
						closeForm={handleCloseForm}
					/>
				)}
			</div>

			<div className="p-6">
				{loading && <p className="text-blue-600">Loading products...</p>}
				{error && <p className="text-red-500">{error}</p>}

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{!loading &&
						!error &&
						products.map((product) => (
							<ProductCard
								key={product._id}
								name={product.name}
								price={product.price}
								image={product.image}
								onDelete={() => handleDelete(product._id)}
								onEdit={() => handleEdit(product)}
							/>
						))}
				</div>
			</div>

			<ToastContainer />
		</>
	);
};

export default ProductList;
