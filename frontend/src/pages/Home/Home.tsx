import { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { GetAllPosts } from "redux/APIs/PostApiRequest";
// import { loginSuccess } from "redux/Slice/LoginSlice";
// import { useRefreshToken } from "hooks";
import Post from "components/Post";
import Input from "components/Input";
import Select from "components/Select";
import { ReactComponent as IconAvatar } from "assets/images/icon/ic_avatar.svg";
import { ReactComponent as IconImage } from "assets/images/icon/ic_image.svg";
import { ReactComponent as IconLink } from "assets/images/icon/ic_link.svg";
import CommunitiesBox, { Communities } from "components/CommunitiesBox";

export interface PostProps {
	[x: string]: any;
	title?: string;
	content?: string;
	interactive?: number;
}

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [activeFilter, setActiveFilter] = useState("best");
	const [selection, setSelection] = useState("");
	const User = useSelector((state: any) => state.login.currentUser);
	const Posts: Array<PostProps> =
		useSelector((state: PostProps) => state.post.posts) || [];
	// const refreshToken = useRefreshToken(User, dispatch, loginSuccess);
	const FilterPost = ["best", "hot", "new", "top"];

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		e.preventDefault();
		navigate("/main/createpost");
	};

	const handleSelect = (option: string) => setSelection(option);

	useEffect(() => {
		if (!User) {
			navigate("/");
		}
		if (User?.accessToken) {
			GetAllPosts(dispatch);
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
					{FilterPost && (
						<ul className="filter_post">
							{FilterPost.map((item, index) => {
								return (
									<li key={index}>
										<button
											type="button"
											className={classNames(
												"btn_filter_post",
												`ic_${item}`,
												activeFilter === item ? "is_active" : ""
											)}
										>
											{item}
										</button>
									</li>
								);
							})}
						</ul>
					)}
					<Select
						activeOption={0}
						onClickSelect={handleSelect}
						options={["Card", "Classic", "Compact"]}
					/>
				</div>
				{Posts.length > 0 ? (
					<div className="post_wrap lazy_load_list">
						{Posts?.map((item, index) => {
							return (
								<Fragment key={index}>
									<Post
										author={item.users.username}
										content={item.content}
										interactive={item.interactive}
										title={item.title}
										dateCreated={item.createDate}
										className={selection.toLowerCase()}
									/>
								</Fragment>
							);
						})}
					</div>
				) : null}
			</div>
			<div className="right_group">
				<CommunitiesBox
					background="https://www.redditstatic.com/desktop2x/img/leaderboard/banner-background.png"
					communities={Communities}
					type="Sport"
				/>
			</div>
		</>
	);
};

export default Home;
