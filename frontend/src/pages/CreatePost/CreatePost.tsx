import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "components/Select";
import Input from "components/Input";
import Button from "components/Button";
import DropZone from "components/DropZone";
import { CreatePostFunc } from "redux/APIs/PostApiRequest";
import { UserState } from "pages/Login/Login";

export interface PostProps {
	title?: string;
	content?: string;
	author?: string;
	interactive?: number;
	community?: string;
}

const CreatePost = () => {
	const [titlePost, setTitlePost] = useState("");
	const [contentPost, setContentPost] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector(
		(state: UserState) => state.login.currentUser
	);
	const Tab = ["Post", "Images&amp;Video", "Link", "Poll", "Talk"];
	const [tab, setTab] = useState(0);

	const [community, setCommunity] = useState(
		currentUser === null ? "" : currentUser.communities[0].name
	);

	const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitlePost(e.target.value);
	};

	const handleChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContentPost(e.target.value);
	};

	const handleSelect = (item: string) => setCommunity(item);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const post: PostProps = {
			title: titlePost,
			content: contentPost,
			interactive: 0,
			author: currentUser.username,
			community: community,
		};

		CreatePostFunc(post, dispatch, navigate);
	};

	const handleTab = (index: number) => setTab(index);

	const generateContent = () => {
		switch (tab) {
			case 0:
				return (
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
				);
			case 1:
				return <DropZone maxFiles={5} />;
		}
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
					{currentUser !== null ? (
						<Select
							activeOption={0}
							onClickSelect={handleSelect}
							options={currentUser.communities.map((item) => item.name)}
						/>
					) : null}
					<div className="create_post_wrap">
						<ul className="create_post_list">
							{Tab.map((item, index) => {
								if (tab === index) {
									return (
										<li className="is_active" key={index}>
											<button
												type="button"
												className="tab_btn"
												dangerouslySetInnerHTML={{ __html: item }}
											></button>
										</li>
									);
								} else {
									return (
										<li key={index}>
											<button
												type="button"
												onClick={() => handleTab(index)}
												className="tab_btn"
												dangerouslySetInnerHTML={{ __html: item }}
											></button>
										</li>
									);
								}
							})}
						</ul>
						<div className="create_post_content">{generateContent()}</div>
						<div className="btn_wrap">
							<Button isAround>Save Draft</Button>
							<Button
								color="secondary"
								isAround
								onClick={handleSubmit}
								disabled={contentPost && titlePost && community ? false : true}
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
