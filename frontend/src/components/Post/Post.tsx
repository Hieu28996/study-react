import classNames from "classnames";

interface PostProps {
	interactive?: number;
	title?: string;
	content?: string;
	author?: string;
	dateCreated?: string;
	isLoading: boolean;
}

const Post = (props: PostProps) => {
	const {
		interactive,
		title,
		content,
		author,
		dateCreated = "Mon Sep 05 2022 15:34:35 GMT+0700 (Giờ Đông Dương)",
		isLoading = false,
	} = props;

	return (
		<a href="#none" className="post">
			<div className="post_interactive">{interactive}</div>
			<div className="post_content">
				<div className="post_header">
					<a href="#none" className="post_author">
						{author}
					</a>
					<span className="post_date">{dateCreated}</span>
				</div>
				<strong
					className={classNames("post_title", isLoading && "skeleton_loading")}
				>
					{title}
				</strong>
				<p className="post_description">{content}</p>
				<div className="post_controls"></div>
			</div>
		</a>
	);
};

export default Post;
