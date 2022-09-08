import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllPosts } from "redux/APIs/PostApiRequest";
import { loginSuccess } from "redux/Slice/LoginSlice";
import { useRefreshToken } from "hooks";
import Header from "components/Header";
import Post from "components/Post";
// import { useLazyLoadList } from "hooks/useLazyLoadList";

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const User = useSelector((state: any) => state.login.currentUser);
	const Posts = useSelector((state: any) => state.posts.postsState.posts);
	const refreshToken = useRefreshToken(User, dispatch, loginSuccess);

	useEffect(() => {
		if (!User) {
			navigate("/");
		}
		if (User?.accessToken) {
			GetAllPosts(dispatch, refreshToken);
		}
	}, [dispatch]);

	return (
		<>
			<Header user={User} />
			<div className="container">
				<div className="left_group">
					<div className="create_post"></div>
					<div className="post_wrap lazy_load_list">
						{Posts?.posts.map((item: any, index: any) => {
							return (
								<Fragment key={index}>
									<Post
										author={item.author.username}
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
