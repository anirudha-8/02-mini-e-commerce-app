import axios from "axios";

const BASE_URL = "http://localhost:8080/api/product";

export const getAllProducts = async () => {
	try {
		const response = await axios.get(BASE_URL);
		return response.data;
	} catch (error) {
		console.error(`Failed to fetch the products: ${error.message}`);
		throw error;
	}
};

export const createProduct = async (product) => {
	try {
		const response = await axios.post(BASE_URL, product);
		return response.data;
	} catch (error) {
		console.error(`Failed to create new product: ${error.message}`);
		throw error;
	}
};

export const deleteProduct = async (id) => {
	try {
		const response = await axios.delete(`${BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Failed to delete the product: ${error.message}`);
		throw error;
	}
};

export const updateProduct = async (id, product) => {
	try {
		const response = await axios.put(`${BASE_URL}/${id}`, product);
		return response.data;
	} catch (error) {
		console.error(`Failed to update the product: ${error.message}`);
		throw error;
	}
};
