import classNames from "classnames";

export interface PostProps {
	interactive?: number;
	title?: string;
	content?: string;
	author?: string;
	className?: string;
	dateCreated?: string;
	community?: string;
	images?: string[];
	isLoading?: boolean;
}

const Post = (props: PostProps) => {
	const {
		interactive,
		title,
		content,
		author,
		className,
		dateCreated,
		community,
		images,
		isLoading,
	} = props;

	return (
		<div className={classNames("post", className && `post_${className}`)}>
			<a href="#none" className="post_link">
				<span className="blind">post link</span>
			</a>
			<div className="post_interactive">{interactive}</div>
			<div className="post_content">
				<div
					className={classNames("post_header", isLoading && "skeleton_loading")}
				>
					{community && (
						<a href="#none" className="post_author">
							r/{community}
						</a>
					)}
					{author && <span className="post_date">by {author}</span>}
					{dateCreated && <span className="post_date">{dateCreated}</span>}
				</div>
				<strong
					className={classNames("post_title", isLoading && "skeleton_loading")}
				>
					{title}
				</strong>
				{images !== undefined && images?.length > 0 && (
					<ul className="post_images">
						{images.map((item, index) => {
							return (
								<li key={index} className="post_image">
									<img src={item} alt="" />
								</li>
							);
						})}
					</ul>
				)}
				<p
					className={classNames(
						"post_description",
						isLoading && "skeleton_loading"
					)}
				>
					{content}
				</p>
				<ul className="post_controls">
					<li>
						<button type="button" className="post_controls_btn">
							Comments
						</button>
					</li>
					<li>
						<button type="button" className="post_controls_btn">
							Award
						</button>
					</li>
					<li>
						<button type="button" className="post_controls_btn">
							Share
						</button>
					</li>
					<li>
						<button type="button" className="post_controls_btn">
							Save
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Post;
