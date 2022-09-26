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
import CommunitiesBox from "components/CommunitiesBox";
import {
	communitiesType,
	controlCommunity,
	getCommunityType,
} from "redux/Slice/CommunitiesSlice";
import { UserState } from "pages/Login/Login";
import { getUser } from "redux/Slice/UserSlice";

export interface PostProps {
	[x: string]: any;
	title?: string;
	content?: string;
	interactive?: number;
}

export interface Community {
	_id?: string;
	name?: string;
	posts?: Array<PostProps>;
	users?: Array<string>;
	createDate?: string;
}

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [activeFilter, setActiveFilter] = useState("best");
	const [randomType, setRandomType] = useState("");
	const [selection, setSelection] = useState("");
	const User = useSelector(
		(state: UserState) => state.allUser.currentUser?.user
	);
	const Posts: Array<PostProps> =
		useSelector((state: PostProps) => state.post.posts) || [];
	const CommunityType = useSelector(
		(state: { communities: { communityType: Array<Community> } }) =>
			state.communities.communityType
	);

	const loadingPost = useSelector((state: PostProps) => state.post.isLoading);
	const type = useSelector((state: any) => state.communities.type);
	const randomTypes: Array<string> = [];

	if (type !== null) {
		type.communitiesType.map((item: { type: string }) => {
			randomTypes.push(item.type);
		});
	}

	// const refreshToken = useRefreshToken(User, dispatch, loginSuccess);
	const FilterPost = ["best", "hot", "new", "top"];

	const LazyLoad = [];
	for (let i = 0; i < 5; i++) {
		LazyLoad.push(
			<Fragment key={i}>
				<Post
					author={""}
					content={""}
					interactive={0}
					title={""}
					dateCreated={""}
					community={""}
				/>
			</Fragment>
		);
	}

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		e.preventDefault();
		navigate("/main/createpost");
	};

	const handleSelect = (option: string) => setSelection(option);

	useEffect(() => {
		dispatch(communitiesType());
	}, [dispatch]);

	useEffect(() => {
		setRandomType(randomTypes[Math.floor(Math.random() * randomTypes.length)]);
	}, [dispatch]);

	useEffect(() => {
		if (randomType !== "") {
			dispatch(getCommunityType({ type: randomType }));
		}
	}, [dispatch, randomType]);

	const handleCommunity = async (community: string) => {
		await dispatch(
			controlCommunity({ username: User.username, community: community })
		);
		await dispatch(getUser({ username: User.username }));
	};

	useEffect(() => {
		if (!User) {
			navigate("/");
		} else {
			GetAllPosts(dispatch);
		}
	}, [User, dispatch]);

	return (
		<>
			<div className="left_group">
				<div className="box">
					<div className="create_post_pin">
						<button type="button" className="btn_pin_post">
							{User !== undefined ? (
								<img
									src={User?.avatar}
									style={{ width: "38px", height: "38px" }}
									alt=""
								/>
							) : (
								<IconAvatar color="#fff" width={38} height={38} />
							)}
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
						{loadingPost
							? LazyLoad
							: Posts?.map((item, index) => {
									return (
										<Fragment key={index}>
											<Post
												author={item.users.username}
												content={item.content}
												interactive={item.interactive}
												title={item.title}
												dateCreated={item.createDate}
												community={item.communities.name}
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
					onClickCommunity={handleCommunity}
					background="https://www.redditstatic.com/desktop2x/img/leaderboard/banner-background.png"
					communities={CommunityType}
					type={randomType}
					userCommunity={User !== undefined && User.communities}
				/>
			</div>
		</>
	);
};

export default Home;
