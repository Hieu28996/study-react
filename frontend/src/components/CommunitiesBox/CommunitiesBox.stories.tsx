import CommunitiesBox, { CommunitiesBoxProps } from "components/CommunitiesBox";

export default {
	title: "Components/CommunitiesBox",
	component: CommunitiesBox,
};

const Template = (args: CommunitiesBoxProps) => <CommunitiesBox {...args} />;

export const Default = Template.bind({});
