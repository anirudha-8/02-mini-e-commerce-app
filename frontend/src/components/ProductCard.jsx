const ProductCard = ({ name, price, image, onDelete, onEdit }) => {
	return (
		<div className="border p-4 rounded shadow">
			<div className="mb-2">
				<img
					src={image}
					alt={name}
					className="w-full h-48 object-cover rounded"
				/>
			</div>
			<h2 className="text-lg font-semibold">{name}</h2>
			<p className="text-gray-700 mb-2">₹{price}</p>
			<div className="flex gap-2">
				<button
					onClick={onEdit}
					className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
				>
					Edit
				</button>
				<button
					onClick={onDelete}
					className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
