import { useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import ProfileBox from "components/ProfileBox";
import { UserState } from "pages/Login/Login";

const Profile = () => {
	const [activeFilter, setActiveFilter] = useState("new");
	const navigate = useNavigate();
	const currentUser = useSelector(
		(state: UserState) => state.login.currentUser
	);
	const FilterPost = ["new", "hot", "top"];

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
				<div className="box"></div>
			</div>
			<div className="right_group">
				<ProfileBox
					username={currentUser !== null ? currentUser.username : ""}
					onClickCreatePost={() => {
						navigate("/main/createpost");
					}}
				/>
				<div className="box box_profile_info">
					<h3 className="box_tit">You're a moderator of these communities</h3>
					<div className="box_content">
						{currentUser !== null && (
							<ul className="community_info">
								{currentUser.communities.map((item, index) => {
									return (
										<li key={index}>
											<span className="community_name">{item.name}</span>
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
