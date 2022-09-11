import classNames from "classnames";
import { User } from "pages/Login/Login";

export interface PostProps {
	interactive?: number;
	title?: string;
	content?: string;
	author?: any;
	className?: string;
	dateCreated?: string;
	community?: string;
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
	} = props;

	return (
		<div className={classNames("post", `post_${className}`)}>
			<a href="#none" className="post_link">
				<span className="blind">post link</span>
			</a>
			<div className="post_interactive">{interactive}</div>
			<div className="post_content">
				<div className="post_header skeleton_loading">
					{community && (
						<a href="#none" className="post_author">
							r/{community}
						</a>
					)}
					{author && <span className="post_date">by {author}</span>}
					{dateCreated && <span className="post_date">{dateCreated}</span>}
				</div>
				<strong className="post_title skeleton_loading">{title}</strong>
				<p className="post_description skeleton_loading">{content}</p>
				<div className="post_controls">
					<ul>
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
		</div>
	);
};

export default Post;
