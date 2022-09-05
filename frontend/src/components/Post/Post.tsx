interface PostProps {
	interactive?: number;
	title?: string;
	content?: string;
	author?: string;
	dateCreated?: string;
}

const Post = (props: PostProps) => {
	const {
		interactive,
		title,
		content,
		author,
		dateCreated = "Mon Sep 05 2022 15:34:35 GMT+0700 (Giờ Đông Dương)",
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
				<strong className="post_title">{title}</strong>
				<p className="post_description">{content}</p>
			</div>
		</a>
	);
};

export default Post;
