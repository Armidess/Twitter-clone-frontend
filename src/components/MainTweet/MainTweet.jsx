import React, { useState } from "react";
import TimelineTweet from "../TimelineTweet/TimelineTweet";

import { useSelector } from "react-redux";
import axios from "axios";
import baseURL from "../../baseURL";

const MainTweet = () => {
	const [tweetText, setTweetText] = useState("");

	const { currentUser } = useSelector((state) => state.user);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let tags = [];
			for (let i = 0; i < tweetText.length; i++) {
				if (tweetText[i] === "#") {
					i++;
					let tag = "";
					while (i < tweetText.length && tweetText[i] !== " ") {
						tag += tweetText[i];
						i++;
					}
					tags.push(tag);
				}
			}

			await axios.post(`${baseURL}/tweets`, {
				userId: currentUser._id,
				description: tweetText,
				tags: tags,
			});

			window.location.reload(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			{currentUser && (
				<p className="font-bold pl-2 my-2">{currentUser.username}</p>
			)}

			<form className="border-b-2 pb-6">
				<textarea
					onChange={(e) => setTweetText(e.target.value)}
					type="text"
					placeholder="What's happening"
					maxLength={280}
					className="bg-slate-200 rounded-lg w-full p-2"
				></textarea>
				<button
					onClick={handleSubmit}
					className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
				>
					Tweet
				</button>
			</form>
			<TimelineTweet />
		</div>
	);
};

export default MainTweet;
