import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";

const ExploreTweets = () => {
	const [explore, setExplore] = useState(null);
	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const exploreTweets = await axios.get("/tweets/explore");
				exploreTweets.data.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt); // Descending order
				});
				setExplore(exploreTweets.data);
			} catch (err) {
				console.log("error", err);
			}
		};
		fetchData();
	}, [currentUser._id]);
	return (
		<div className="mt-6">
			{explore &&
				explore.map((tweet) => {
					return (
						<div key={tweet._id} className="p-2">
							<Tweet tweet={tweet} setData={setExplore} />
						</div>
					);
				})}
		</div>
	);
};

export default ExploreTweets;
