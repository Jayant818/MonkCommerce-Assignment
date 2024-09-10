import { SortableContainer } from "react-sortable-hoc";
import ProductItem from "./ProductItem";
import { ProductItemsProps } from "../types";

const ProductItems = SortableContainer<ProductItemsProps>(
	(props: ProductItemsProps) => {
		const {
			products,
			canRemove,
			onRemove,
			handleAddProduct,
			onDiscountChange,
			onDiscountTypeChange,
			onSortEndForVariants,
		} = props;

		return (
			<div className="space-y-3">
				{products.map((product, index) => (
					<ProductItem
						key={`item-${product.id}`}
						index={index}
						value={index}
						product={product}
						canRemove={canRemove}
						onRemove={onRemove}
						onAddProduct={handleAddProduct}
						onDiscountChange={onDiscountChange}
						onDiscountTypeChange={onDiscountTypeChange}
						onSortEndForVariants={onSortEndForVariants}
					/>
				))}
			</div>
		);
	}
);

export default ProductItems;
