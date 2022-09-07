import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPosts } from "redux/APIs/PostApiRequest";
import Header from "components/Header";
import Post from "components/Post";
import useRefreshToken from "hooks/useRefreshToken";
import { loginSuccess } from "redux/Slice/LoginSlice";

const Home = () => {
	const dispatch = useDispatch();
	const User = useSelector((state: any) => state.login.loginState.currentUser);
	const Posts = useSelector((state: any) => state.posts.postsState);
	const refreshToken = useRefreshToken(User, dispatch, loginSuccess);

	useEffect(() => {
		GetAllPosts(dispatch, refreshToken);
		// if (!User) {
		// 	navigate("/");
		// }
		// if (User?.accessToken) {
		// }
	}, [dispatch]);

	return (
		<>
			<Header user={User} />
			<div className="container">
				<div className="left_group">
					<div className="create_post"></div>
					<div className="post_wrap">
						{Posts.posts?.posts.map((item: any, index: any) => {
							return (
								<Fragment key={index}>
									<Post
										author={item.author}
										content={item.content}
										interactive={item.interactive}
										title={item.title}
									/>
								</Fragment>
							);
						})}
					</div>
				</div>
				<div className="right_group"></div>
			</div>
		</>
	);
};

export default Home;
