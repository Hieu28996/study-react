import classNames from "classnames";

export interface PostProps {
	interactive?: number;
	title?: string;
	content?: string;
	author?: string;
	className?: string;
	dateCreated?: string;
}

const Post = (props: PostProps) => {
	const {
		interactive,
		title,
		content,
		author,
		className,
		dateCreated = "Mon Sep 05 2022 15:34:35 GMT+0700 (Giờ Đông Dương)",
	} = props;

	return (
		<div className={classNames("post", `post_${className}`)}>
			<a href="#none" className="post_link">
				<span className="blind">post link</span>
			</a>
			<div className="post_interactive">{interactive}</div>
			<div className="post_content">
				<div className="post_header skeleton_loading">
					{author && (
						<a href="#none" className="post_author">
							{author}
						</a>
					)}
					{dateCreated && <span className="post_date">{dateCreated}</span>}
				</div>
				<strong className="post_title skeleton_loading">{title}</strong>
				<p className="post_description skeleton_loading">{content}</p>
				<div className="post_controls"></div>
			</div>
		</div>
	);
};

export default Post;
