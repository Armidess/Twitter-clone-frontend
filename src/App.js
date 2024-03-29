import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import Error from "./pages/Error/Error";
import { useSelector } from "react-redux";

const Layout = () => {
	const { currentUser } = useSelector((state) => state.user);
	return (
		<div className="md:w-8/12 mx-auto">
			{/* {currentUser && } */}
			<Navbar />
			<Outlet></Outlet>
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Error />,
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/profile/:id",
				element: <Profile />,
			},
			{
				path: "/explore",
				element: <Explore />,
			},
			{
				path: "/signin",
				element: <Signin />,
			},
			{
				path: "/signout",
				element: <Signin />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
		],
	},
]);

function App() {
	return (
		<div>
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
}

export default App;
