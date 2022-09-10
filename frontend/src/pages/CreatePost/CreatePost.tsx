import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "components/Select";
import Input from "components/Input";
import Button from "components/Button";
import { CreatePostFunc } from "redux/APIs/PostApiRequest";
import { UserState } from "pages/Login/Login";

export interface PostProps {
	title?: string;
	content?: string;
	author?: string;
	interactive?: number;
}

const CreatePost = () => {
	const [titlePost, setTitlePost] = useState("");
	const [contentPost, setContentPost] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector(
		(state: UserState) => state.login.currentUser.username
	);

	const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitlePost(e.target.value);
	};

	const handleChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContentPost(e.target.value);
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const post: PostProps = {
			title: titlePost,
			content: contentPost,
			interactive: 0,
			author: currentUser,
		};

		CreatePostFunc(post, dispatch, navigate);
	};

	return (
		<>
			<div className="left_group">
				<div className="cont_header">
					<h2 className="title">Create a post</h2>
					<button type="button" className="btn_draft">
						DRAFTS
					</button>
				</div>
				<div className="content">
					<Select
						activeOption={0}
						onClickSelect={() => {
							return;
						}}
						options={["Card", "Classic", "Compact"]}
					/>
					<div className="create_post_wrap">
						<ul className="create_post_list">
							<li className="is_active">
								<button type="button" className="tab_btn">
									Post
								</button>
							</li>
							<li>
								<button type="button" className="tab_btn">
									Images&amp;Video
								</button>
							</li>
							<li>
								<button type="button" className="tab_btn">
									Link
								</button>
							</li>
							<li>
								<button type="button" className="tab_btn">
									Poll
								</button>
							</li>
							<li>
								<button type="button" className="tab_btn">
									Talk
								</button>
							</li>
						</ul>
						<form>
							<Input
								name="posttitle"
								placeholder="Title"
								defaultValue=""
								onChange={handleChangeTitle}
							/>
							<Input
								name="postdesc"
								placeholder="What are your throughts?"
								defaultValue=""
								onChange={handleChangeDesc}
							/>
						</form>
						<div className="btn_wrap">
							<Button isAround>Save Draft</Button>
							<Button
								color="secondary"
								isAround
								onClick={handleSubmit}
								disabled={contentPost ? false : true}
							>
								Post
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="right_group"></div>
		</>
	);
};

export default CreatePost;
