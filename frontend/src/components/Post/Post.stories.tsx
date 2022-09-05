import { ComponentStory } from "@storybook/react";
import { ReactElement } from "react";
import Post from "./Post";

export default {
	title: "Components/Post",
	component: Post,
};

const Template: ComponentStory<() => ReactElement | null> = (args: any) => (
	<Post {...args} />
);

export const Default = Template.bind({});
Default.args = {
	interactive: 30000,
	title:
		"Anyone knows what is the thing at the front of this case that has 6 switches?",
	content:
		"Have a thing with a girl, her delusional ex has convinced himself that they are still together. We met after she was single. Anyone knows what is the thing at the front of this case that has 6 switches?Anyone knows what is the thing at the front of this case that has 6 switches?Anyone knows what is the thing at the front of this case that has 6 switches?Anyone knows what is the thing at the front of this case that has 6 switches?Anyone knows what is the thing at the front of this case that has 6 switches?",
	author: "hieu28996",
};
