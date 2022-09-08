import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllPosts } from "redux/APIs/PostApiRequest";
import { loginSuccess } from "redux/Slice/LoginSlice";
import { useRefreshToken } from "hooks";
import Post from "components/Post";
import Input from "components/Input";
import { ReactComponent as IconAvatar } from "assets/images/icon/ic_avatar.svg";
import { ReactComponent as IconImage } from "assets/images/icon/ic_image.svg";
import { ReactComponent as IconLink } from "assets/images/icon/ic_link.svg";

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const User = useSelector((state: any) => state.login.currentUser);
	const Posts: Array<any> =
		useSelector((state: any) => state.posts.postsState.posts.posts) || [];
	const refreshToken = useRefreshToken(User, dispatch, loginSuccess);

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		e.preventDefault();
	};

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
			<div className="left_group">
				<div className="box">
					<div className="create_post_pin">
						<button type="button" className="btn_pin_post">
							<IconAvatar color="#fff" width={38} height={38} />
						</button>
						<span className="status"></span>
					</div>
					<div className="create_post_inp">
						<Input
							name="createPost"
							placeholder="Create Post"
							defaultValue=""
							onFocus={handleFocus}
						/>
					</div>
					<button type="button" className="btn_create_post">
						<IconImage width={24} height={24} />
					</button>
					<button type="button" className="btn_create_post">
						<IconLink width={24} height={24} />
					</button>
				</div>
				<div className="box">
					<ul className="filter_post">
						<li>
							<button
								type="button"
								className="btn_filter_post is_active"
							></button>
						</li>
						<li>
							<button type="button" className="btn_filter_post"></button>
						</li>
						<li>
							<button type="button" className="btn_filter_post"></button>
						</li>
						<li>
							<button type="button" className="btn_filter_post"></button>
						</li>
					</ul>
				</div>
				{Posts.length > 0 ? (
					<div className="post_wrap lazy_load_list">
						{Posts?.map((item, index) => {
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
				) : null}
			</div>
			<div className="right_group"></div>
		</>
	);
};

export default Home;
