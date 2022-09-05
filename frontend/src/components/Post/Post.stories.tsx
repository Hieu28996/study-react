import { ComponentStory } from "@storybook/react";
import { ReactElement } from "react";
import Post from "./Post";

export default {
  title: "Components/Post",
  component: Post,
};

const Template: ComponentStory<() => ReactElement | null> = () => <Post />;

export const Default = Template.bind({});