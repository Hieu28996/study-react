import { Fragment, useEffect, useState } from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import ProfileBox from "components/ProfileBox";
import { UserState } from "pages/Login/Login";
import { PostProps } from "pages/Home/Home";
import Post from "components/Post";
import { AvatarState, uploadAvatar } from "redux/Slice/UpdateAvartarSlice";
import { getUser } from "redux/Slice/UserSlice";

const Profile = () => {
	const [activeFilter, setActiveFilter] = useState("new");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loginUser = useSelector((state: UserState) => state.login.currentUser);
	const currentUser = useSelector(
		(state: { allUser: { currentUser: UserState } }) =>
			state.allUser.currentUser
	);
	const avatarUser = useSelector(
		(state: { avatar: AvatarState }) => state.avatar.avatarUser
	);
	const Posts: Array<PostProps> =
		useSelector((state: PostProps) => state.post.posts) || [];
	const FilterPost = ["new", "hot", "top"];

	useEffect(() => {
		dispatch(getUser({ username: loginUser.username }));
	}, [dispatch]);

	return (
		<>
			<div className="left_group">
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
				</div>
				{Posts.length > 0 ? (
					<div className="post_wrap lazy_load_list">
						{Posts?.map((item, index) => {
							if (loginUser?.username === item.users.username) {
								return (
									<Fragment key={index}>
										<Post
											author={item.users.username}
											content={item.content}
											interactive={item.interactive}
											title={item.title}
											dateCreated={item.createDate}
											community={item.communities.name}
										/>
									</Fragment>
								);
							}
						})}
					</div>
				) : null}
			</div>
			<div className="right_group">
				<ProfileBox
					image={
						loginUser !== null
							? avatarUser !== undefined
								? avatarUser?.avatar
								: loginUser.avatar
							: ""
					}
					username={loginUser !== null ? loginUser.username : ""}
					onClickCreatePost={() => {
						navigate("/main/createpost");
					}}
					onChangeAvatar={async (e: React.ChangeEvent<HTMLInputElement>) => {
						const file = e.target.files?.[0];

						if (file !== undefined) {
							await dispatch(
								uploadAvatar({ username: loginUser.username, avatar: file })
							).then(() => dispatch(getUser({ username: loginUser.username })));
						}
					}}
				/>
				<div className="box box_profile_info">
					<h3 className="box_tit">You're a moderator of these communities</h3>
					<div className="box_content">
						{loginUser !== null && (
							<ul className="community_info">
								{loginUser.communities.map((item, index) => {
									return (
										<li key={index}>
											<span className="community_name">r/{item.name}</span>
											<Button isAround color="secondary">
												<span className="community_join">Joined</span>
												<span className="community_leave">Leave</span>
											</Button>
										</li>
									);
								})}
							</ul>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
