import { useState, useCallback } from "react";
import { arrayMoveImmutable } from "array-move";
import ProductItems from "./ProductItems";
import { Product } from "../types";

const ProductList = () => {
	const [id, setId] = useState<number>(2);
	const [products, setProducts] = useState<Product[]>([
		{
			id: 1,
			title: "",
			variants: [],
		},
	]);

	const handleAddProduct = useCallback((newProducts: Product[], id: number) => {
		setProducts((prevProducts) => {
			const updatedProducts = [...prevProducts];
			const indexToReplace = updatedProducts.findIndex(
				(product) => product.id === id
			);

			if (indexToReplace !== -1) {
				updatedProducts[indexToReplace] = newProducts[0];
				const remainingNewProducts = newProducts.slice(1);
				updatedProducts.splice(indexToReplace + 1, 0, ...remainingNewProducts);
			} else {
				updatedProducts.push(...newProducts);
			}

			return updatedProducts;
		});
	}, []);

	const handleRemoveProduct = useCallback(
		(productIndex: number, variantId?: number) => {
			setProducts((prevProducts) => {
				const newProducts = [...prevProducts];
				if (typeof variantId === "number") {
					const product = newProducts[productIndex];
					product.variants = product.variants.filter((v) => v.id !== variantId);
				} else {
					newProducts.splice(productIndex, 1);
				}
				return newProducts;
			});
		},
		[]
	);

	const handleDiscountChange = useCallback(
		(newValue: number, productId: number, variantId: number | null) => {
			setProducts((prevProducts) =>
				prevProducts.map((product) => {
					if (product.id === productId) {
						if (variantId !== null) {
							return {
								...product,
								variants: product.variants.map((v) =>
									v.id === variantId ? { ...v, discount: newValue } : v
								),
							};
						} else {
							return { ...product, discount: newValue };
						}
					}
					return product;
				})
			);
		},
		[]
	);

	const handleDiscountTypeChange = useCallback(
		(
			newValue: "flat off" | "% off",
			productId: number,
			variantId: number | null
		) => {
			setProducts((prevProducts) =>
				prevProducts.map((product) => {
					if (product.id === productId) {
						if (variantId !== null) {
							return {
								...product,
								variants: product.variants.map((v) =>
									v.id === variantId ? { ...v, discountType: newValue } : v
								),
							};
						} else {
							return { ...product, discountType: newValue };
						}
					}
					return product;
				})
			);
		},
		[]
	);

	const handleClick = useCallback(() => {
		setProducts((prevProducts) => [
			...prevProducts,
			{ id: id, title: "", variants: [] },
		]);
		setId((prevId) => prevId + 1);
	}, [id]);

	const onSortEnd = useCallback(
		({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
			console.log(oldIndex, newIndex);
			setProducts((prevProducts) =>
				arrayMoveImmutable(prevProducts, oldIndex, newIndex)
			);
		},
		[]
	);

	const onSortEndForVariants = ({
		oldIndex,
		newIndex,
	}: {
		oldIndex: number;
		newIndex: number;
	}) => {
		console.log(oldIndex, newIndex);
		const oldVarIndex = parseInt(oldIndex.toString().charAt(1));
		const newVarIndex = parseInt(newIndex.toString().charAt(1));
		const productId = parseInt(oldIndex.toString().slice(2));
		console.log("Yuppp", productId, oldVarIndex, newVarIndex);

		setProducts((prevProducts) =>
			prevProducts.map((product) => {
				if (product.id === productId) {
					const newVariants = arrayMoveImmutable(
						product.variants,
						oldVarIndex,
						newVarIndex
					);
					return { ...product, variants: newVariants };
				}
				return product;
			})
		);
	};

	return (
		<div className="w-full min-h-[80vh] flex flex-col justify-start items-center ">
			<div className="w-60% flex flex-col items-center  h-full ">
				<h2 className="text-xl font-bold mb-4 self-start mt-10">Product</h2>
				<div className="space-y-4 items-center ">
					<div className="flex justify-between pl-20">
						<div>Product</div>
						<div>Discount</div>
					</div>

					<ProductItems
						products={products}
						canRemove={products.length > 1}
						handleAddProduct={handleAddProduct}
						onRemove={handleRemoveProduct}
						onSortEnd={onSortEnd}
						onDiscountChange={handleDiscountChange}
						onDiscountTypeChange={handleDiscountTypeChange}
						onSortEndForVariants={onSortEndForVariants}
					/>

					<div className="flex justify-end pr-20">
						<button
							onClick={handleClick}
							className="border-2 border-[#008060] bg-white text-[#008060] px-4 py-2 rounded "
						>
							Add Product
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
