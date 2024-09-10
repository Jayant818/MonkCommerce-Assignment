export interface Product {
	id: number;
	title: string;
	variants: Variant[];
	image?: {
		id: number;
		product_id: number;
		src: string;
	};
	discount?: number;
	discountType?: "flat off" | "% off";
}

export interface Variant {
	id: number;
	product_id: number;
	title: string;
	price: string;
	inventory_quantity?: number;
	discount?: number;
	discountType?: "flat off" | "% off";
}

export interface ProductItemsProps {
	products: Product[];
	canRemove: boolean;
	onRemove: (index: number, variantIndex?: number) => void;
	handleAddProduct: (newProducts: Product[], id: number) => void;
	onSortEnd: ({
		oldIndex,
		newIndex,
	}: {
		oldIndex: number;
		newIndex: number;
	}) => void;
	onDiscountChange: (
		newValue: number,
		productId: number,
		variantIndex: number | null
	) => void;
	onDiscountTypeChange: (
		newValue: string,
		productId: number,
		variantIndex: number | null
	) => void;
	onSortEndForVariants: ({
		oldIndex,
		newIndex,
	}: {
		oldIndex: number;
		newIndex: number;
	}) => void;
}

export interface ProductItemProps {
	product: Product;
	canRemove: boolean;
	onRemove: (index: number, variantIndex?: number) => void;
	onAddProduct: (newProducts: Product[], id: number) => void;
	onDiscountChange: (
		newValue: number,
		productId: number,
		variantIndex: number | null
	) => void;
	onDiscountTypeChange: (
		newValue: string,
		productId: number,
		variantIndex: number | null
	) => void;
	value: number;
	onSortEndForVariants: ({
		oldIndex,
		newIndex,
	}: {
		oldIndex: number;
		newIndex: number;
	}) => void;
	index: number; // Required by SortableElement
}

export interface DiscountInputProps {
	discount: number;
	discountType: "flat off" | "% off";
	ind?: number;
	handleDiscountChange: (discountValue: number) => void;
	handleDiscountTypeChange: (discountType: "flat off" | "% off") => void;
}

export interface VarientItemsProps {
	product: Product;
	onRemove: (variantId: number) => void;
	handleDiscountChange: (newValue: number, variantIndex: number | null) => void;
	handleDiscountTypeChange: (
		newValue: string,
		variantIndex: number | null
	) => void;
}

export interface VarientItemProps {
	variant: Variant;
	onRemove: () => void;
	ind: number;
	handleDiscountTypeChange: (discountType: string) => void;
	handleDiscountChange: (discountValue: number) => void;
}

export interface ProductPickerProps {
	onAddProducts: (products: Product[], editingProductId: string | null) => void;
	onClose: () => void;
	editingProductId: string | null;
}
