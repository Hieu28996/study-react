import Button from "components/Button";
import { ReactComponent as IconAvatar } from "assets/images/icon/ic_avatar.svg";
import { ReactComponent as IconPlus } from "assets/images/icon/ic_plus.svg";
import { ChangeEventHandler, MouseEventHandler } from "react";

export interface ProfileBoxProps {
	image?: string;
	username?: string;
	onClickCreatePost?: MouseEventHandler<HTMLButtonElement>;
	onClickSocial?: MouseEventHandler<HTMLButtonElement>;
	onChangeAvatar?: ChangeEventHandler<HTMLInputElement>;
}

const ProfileBox = (props: ProfileBoxProps) => {
	const { image, username, onClickCreatePost, onClickSocial, onChangeAvatar } =
		props;

	return (
		<div className="box box_profile">
			<div className="profile_header">
				<div className="profile_avatar">
					<label htmlFor="myfile">
						{image ? (
							<img src={image} alt="" />
						) : (
							<IconAvatar width={80} height={80} color="#fff" />
						)}
					</label>
					<input
						type="file"
						id="myfile"
						name="myfile"
						onChange={onChangeAvatar}
					/>
				</div>
			</div>
			<span className="profile_name">u/{username}</span>
			<Button color="primary" isAround isFullWidth className="btn_profile_post">
				Create Avatar
			</Button>
			<div className="social">
				<Button color="gray" isAround onClick={onClickSocial}>
					<IconPlus width={24} height={24} color="#000" />
					<span>Add social link</span>
				</Button>
			</div>
			<Button
				color="secondary"
				isAround
				isFullWidth
				onClick={onClickCreatePost}
			>
				New post
			</Button>
		</div>
	);
};

export default ProfileBox;
