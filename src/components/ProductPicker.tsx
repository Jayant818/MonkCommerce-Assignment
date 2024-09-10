import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { Product, ProductPickerProps, Variant } from "../types";

const ProductPicker: React.FC<ProductPickerProps> = ({
	onAddProducts,
	onClose,
	editingProductId,
}) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	const [hasMoreProducts, setHasMoreProducts] = useState<boolean>(true);

	const fetchProducts = async () => {
		if (!hasMoreProducts && page > 1) return;

		setLoading(true);
		try {
			const response = await axios.get(`/api/task/products/search`, {
				params: {
					search: searchQuery || undefined,
					page,
					limit: 10,
				},
				headers: {
					"x-api-key": "72njgfa948d9aS7gs5",
				},
			});

			const fetchedProducts: Product[] = response.data || [];
			setProducts((prevProducts) =>
				page === 1 ? fetchedProducts : [...prevProducts, ...fetchedProducts]
			);
			setHasMoreProducts(fetchedProducts.length === 10);
		} catch (error) {
			console.error("Error fetching products:", error);
		} finally {
			setLoading(false);
		}
	};

	const debouncedSearch = useCallback(
		debounce((query: string) => {
			setSearchQuery(query);
			setPage(1);
			setProducts([]);
			setHasMoreProducts(true);
		}, 500),
		[]
	);

	useEffect(() => {
		fetchProducts();
	}, [searchQuery, page]);

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const element = e.target as HTMLDivElement;
		if (
			element.scrollHeight - element.scrollTop <= element.clientHeight + 1 &&
			!loading &&
			hasMoreProducts
		) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	const handleProductSelect = (product: Product) => {
		setSelectedProducts((prevSelectedProducts) => {
			const existingProduct = prevSelectedProducts.find(
				(p) => p.id === product.id
			);
			if (existingProduct) {
				return prevSelectedProducts;
			}
			return [
				...prevSelectedProducts,
				{
					...product,
					variants: product.variants.map((v) => ({
						...v,
						discount: 0,
						discountType: "% off",
					})),
					discount: 0,
					discountType: "% off",
				},
			];
		});
	};

	const handleProductDeselect = (product: Product) => {
		setSelectedProducts((prevSelectedProducts) =>
			prevSelectedProducts.filter((p) => p.id !== product.id)
		);
	};

	const handleVariantSelect = (variant: Variant, product: Product) => {
		setSelectedProducts((prevSelectedProducts) => {
			const productIndex = prevSelectedProducts.findIndex(
				(p) => p.id === product.id
			);
			if (productIndex === -1) {
				return [
					...prevSelectedProducts,
					{
						...product,
						variants: [{ ...variant, discount: 0, discountType: "% off" }],
						discount: 0,
						discountType: "% off",
					},
				];
			} else {
				const updatedProduct = { ...prevSelectedProducts[productIndex] };
				if (!updatedProduct.variants.some((v) => v.id === variant.id)) {
					updatedProduct.variants.push({
						...variant,
						discount: 0,
						discountType: "% off",
					});
				}
				return [
					...prevSelectedProducts.slice(0, productIndex),
					updatedProduct,
					...prevSelectedProducts.slice(productIndex + 1),
				];
			}
		});
	};

	const handleVariantDeselect = (variant: Variant, product: Product) => {
		setSelectedProducts((prevSelectedProducts) =>
			prevSelectedProducts.map((p) =>
				p.id === product.id
					? {
							...p,
							variants: p.variants.filter((v) => v.id !== variant.id),
					  }
					: p
			)
		);
	};

	const handleAddProducts = () => {
		onAddProducts(selectedProducts, editingProductId);
		onClose();
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		debouncedSearch(e.target.value);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
			<div className="bg-white p-8 rounded-lg w-[40%] max-h-[80vh] flex flex-col">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Select Products</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<div className="relative mb-4">
					<input
						type="text"
						onChange={handleSearchChange}
						placeholder="Search product"
						className="border border-gray-300 pl-10 pr-4 py-2 w-full rounded-md"
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
				<div className="flex-grow overflow-y-auto" onScroll={handleScroll}>
					{products.map((product) => (
						<div key={product.id} className="mb-4">
							<label className="flex items-center">
								<input
									type="checkbox"
									checked={selectedProducts.some((p) => p.id === product.id)}
									onChange={(e) =>
										e.target.checked
											? handleProductSelect(product)
											: handleProductDeselect(product)
									}
									className="mr-2 w-5 h-5 rounded-sm border-gray-300 text-green-500 focus:ring-green-500"
								/>
								{product.image?.src && (
									<img
										src={product.image.src}
										alt={product.title}
										className="w-20 h-20 mr-2 object-cover rounded"
									/>
								)}
								<span className="font-bold">{product.title}</span>
							</label>
							{product.variants.map((variant) => (
								<div
									key={variant.id}
									className="grid grid-cols-12 gap-4 ml-6 mt-2 items-center"
								>
									<input
										type="checkbox"
										checked={selectedProducts.some((p) =>
											p.variants.some((v) => v.id === variant.id)
										)}
										onChange={(e) =>
											e.target.checked
												? handleVariantSelect(variant, product)
												: handleVariantDeselect(variant, product)
										}
										className="mr-2 col-span-1 w-5 h-5 rounded-sm border-gray-300 text-green-500 focus:ring-green-500"
									/>
									<span className="col-span-5">{variant.title}</span>
									<span className="col-span-3">
										{variant.inventory_quantity || "0"} available
									</span>
									<span className="col-span-3">${variant.price}</span>
								</div>
							))}
						</div>
					))}
					{loading && <p className="text-center">Loading...</p>}
				</div>
				<div className="mt-4 flex justify-between items-center">
					<p className="text-base">
						{selectedProducts.length} products selected
					</p>
					<div className="flex">
						<button
							className="border-2 border-[#008060] bg-white text-[#008060] px-4 py-2 rounded mr-2 hover:bg-[#008060] hover:text-white transition-colors"
							onClick={onClose}
						>
							Cancel
						</button>
						<button
							className="bg-[#008060] text-white px-4 py-2 rounded hover:bg-[#006048] transition-colors"
							onClick={handleAddProducts}
						>
							Add Products
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPicker;
