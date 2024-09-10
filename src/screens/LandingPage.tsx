import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";

const LandingPage = () => {
	return (
		<div className="w-full min-h-screen bg-white">
			<Navbar />
			<ProductList />
		</div>
	);
};

export default LandingPage;
