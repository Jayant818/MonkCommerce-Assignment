import { SortableElement } from "react-sortable-hoc";
import DragHandle from "./DragHandle";
import DiscountInput from "./DiscountInput";
import { VarientItemProps } from "../types";

const VarientItem = SortableElement<VarientItemProps>(
	({
		variant,
		onRemove,
		ind,
		handleDiscountTypeChange,
		handleDiscountChange,
	}: VarientItemProps) => {
		return (
			<div className="grid grid-cols-[20px,2fr,2fr,30px] items-center gap-4">
				<div className="col-span-1 items-center w-10">
					<DragHandle />
				</div>
				<div className="border-2 rounded bg-white py-2 px-2 col-span-1">
					<span className="text-black">{variant.title}</span>
				</div>
				<DiscountInput
					discount={variant.discount!}
					discountType={variant.discountType!}
					handleDiscountChange={handleDiscountChange}
					handleDiscountTypeChange={handleDiscountTypeChange}
					ind={ind}
				/>
				<button
					className="bg-red-500 text-white px-2 py-1 rounded col-span-1"
					onClick={() => onRemove()}
				>
					X
				</button>
			</div>
		);
	}
);

export default VarientItem;
