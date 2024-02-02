import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../baseURL";

const RightSidebar = () => {
	const [trendingTweets, setTrendingTweets] = useState(null);
	useEffect(() => {
		const fetchTrendingTweets = async () => {
			const result = await axios.get(`${baseURL}/tweets/trending`);
			setTrendingTweets(result.data);
		};
		fetchTrendingTweets();
	}, []);
	return (
		<div className="fixed top=15 p-6 bg-slate-100 rounded-lg mx-4 space-y-4">
			<h2 className="font-medium">Trending</h2>
			{trendingTweets ? (
				trendingTweets.map((TrendingTag) => {
					return (
						<p
							key={TrendingTag._id}
							className="font-bold"
						>{`#${TrendingTag.tagName}`}</p>
					);
				})
			) : (
				<>
					<p className="font-bold">#gryffindor</p>
					<p className="font-bold">#hufflepuff</p>
					<p className="font-bold">#slytherin</p>
					<p className="font-bold">#ravenclaw</p>
					<p className="font-bold">#HarryPotter</p>
				</>
			)}
		</div>
	);
};

export default RightSidebar;
