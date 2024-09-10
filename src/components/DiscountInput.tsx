import { useState } from "react";
import { DiscountInputProps } from "../types";

const DiscountInput = ({
	discount,
	discountType,
	handleDiscountChange,
	handleDiscountTypeChange,
}: DiscountInputProps) => {
	const [showDiscount, setShowDiscount] = useState<boolean>(!!discount);

	const handleVariantDiscountChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = parseFloat(e.target.value);
		handleDiscountChange(value);
	};

	const handleVariantDiscountTypeChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const value = e.target.value as "flat off" | "% off";
		handleDiscountTypeChange(value);
	};

	const handleClick = () => {
		setShowDiscount((prevShowDiscount) => !prevShowDiscount);
		if (!showDiscount) {
			handleDiscountChange(0);
			handleDiscountTypeChange("% off");
		}
	};

	return (
		<>
			{showDiscount ? (
				<div className="flex items-center gap-1 relative ">
					<input
						type="number"
						className="border border-gray-300 focus:outline-none focus:ring-0 rounded-md py-2 px-2 w-[7.1rem]"
						placeholder="Discount"
						value={discount || ""}
						onChange={handleVariantDiscountChange}
					/>
					<select
						value={discountType}
						onChange={handleVariantDiscountTypeChange}
						className="border border-gray-300 focus:outline-none focus:ring-0 rounded-md py-2 pl-2 pr-2"
					>
						<option value="% off">%</option>
						<option value="flat off">Flat</option>
					</select>
				</div>
			) : (
				<button
					onClick={handleClick}
					className="bg-[#008060] text-white px-4 py-2 rounded w-[11.5rem]"
				>
					Add Discount
				</button>
			)}
		</>
	);
};
export default DiscountInput;
