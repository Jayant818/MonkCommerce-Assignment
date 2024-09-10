import { SortableContainer } from "react-sortable-hoc";
import { VarientItemsProps } from "../types";
import VarientItem from "./VarientItem";

const VarientItems = SortableContainer<VarientItemsProps>(
	({
		product,
		onRemove,
		handleDiscountChange,
		handleDiscountTypeChange,
	}: VarientItemsProps) => {
		return (
			<div className="pt-1">
				{product.variants.map((variant, index) => (
					<VarientItem
						ind={index}
						key={variant.id}
						index={parseInt(`1${index}${product.id}`, 10)}
						variant={variant}
						onRemove={() => onRemove(variant.id)}
						handleDiscountChange={(discountValue) =>
							handleDiscountChange(discountValue, variant.id)
						}
						handleDiscountTypeChange={(discountType) =>
							handleDiscountTypeChange(discountType, variant.id)
						}
					/>
				))}
			</div>
		);
	}
);

export default VarientItems;
