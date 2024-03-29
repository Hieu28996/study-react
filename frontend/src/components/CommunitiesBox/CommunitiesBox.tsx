import Button from "components/Button";
import { ReactComponent as IconArrow } from "assets/images/icon/ic_arrow.svg";

export const Communities = [
	{
		rank: 1,
		increase: true,
		img: "",
		name: "football",
	},
	{
		rank: 2,
		increase: true,
		img: "",
		name: "tennis",
	},
	{
		rank: 3,
		increase: false,
		img: "",
		name: "climbing",
	},
	{
		rank: 4,
		increase: true,
		img: "",
		name: "leafs",
	},
	{
		rank: 5,
		increase: false,
		img: "",
		name: "badminton",
	},
];

export interface CommunitiesBoxProps {
	type?: string;
	communities?: Array<any>;
	background?: string;
	onClickCommunity: (item: string) => void;
	userCommunity?: Array<any>;
}

export interface CommunitiyProps {
	rank?: string;
	increase?: boolean;
	img?: string;
	name?: string;
}

const CommunitiesBox = (props: CommunitiesBoxProps) => {
	const {
		type,
		communities = [],
		background,
		onClickCommunity,
		userCommunity,
	} = props;

	return (
		<div className="box box_community">
			<div
				className="community_header"
				style={{ backgroundImage: `url(${background})` }}
			>
				<h2 className="community_tit">Top {type} Communities</h2>
			</div>
			<div className="community">
				<ul className="community_list">
					{communities !== null && communities.length > 0
						? communities.map((item, index) => {
								return (
									<li key={index}>
										<span className="community_rank">{index + 1}</span>
										<span className="community_increase">
											<IconArrow
												width={20}
												height={20}
												color={item.increase ? "#46d160" : "#ff4500"}
												style={{ rotate: item.increase ? "0deg" : "180deg" }}
											/>
										</span>
										<span className="community_img">
											<img src={item.img} alt="" />
										</span>
										<span className="community_name">r/{item.name}</span>
										{userCommunity !== undefined &&
										userCommunity.filter(
											(community) => community._id === item._id
										).length > 0 ? (
											<Button
												color="secondary"
												isAround
												className="community_btn is_leaved"
												onClick={() => onClickCommunity(item._id)}
											>
												Leave
											</Button>
										) : (
											<Button
												color="secondary"
												isAround
												className="community_btn"
												onClick={() => onClickCommunity(item._id)}
											>
												Join
											</Button>
										)}
									</li>
								);
						  })
						: null}
				</ul>
				<Button color="secondary" isAround isFullWidth className="btn_view">
					View All
				</Button>
			</div>
		</div>
	);
};

export default CommunitiesBox;
