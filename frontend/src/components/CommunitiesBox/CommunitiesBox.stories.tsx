import CommunitiesBox, {
	CommunitiesBoxProps,
	Communities,
} from "components/CommunitiesBox";

export default {
	title: "Components/CommunitiesBox",
	component: CommunitiesBox,
};

const Template: any = (args: CommunitiesBoxProps) => (
	<CommunitiesBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
	type: "Sport",
	communities: Communities,
	background:
		"https://www.redditstatic.com/desktop2x/img/leaderboard/banner-background.png",
};
