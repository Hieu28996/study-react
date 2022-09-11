import ProfileBox from "components/ProfileBox";
import { ProfileBoxProps } from "./ProfileBox";

export default {
	title: "Components/ProfileBox",
	component: ProfileBox,
};

const Template: any = (args: ProfileBoxProps) => <ProfileBox {...args} />;

export const Default = Template.bind({});
Default.args = {
	username: "hieu28996",
};
