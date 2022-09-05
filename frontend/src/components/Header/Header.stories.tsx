import { ComponentStory } from "@storybook/react";
import { ReactElement } from "react";
import Header from "./Header";

export default {
  title: "Components/Header",
  component: Header,
};

const Template: ComponentStory<() => ReactElement | null> = () => <Header />;

export const Default = Template.bind({});