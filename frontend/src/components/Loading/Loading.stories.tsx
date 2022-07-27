import { ComponentStory } from "@storybook/react";
import { ReactElement } from "react";
import Loading from "./Loading";

export default {
  title: "Components/Loading",
  component: Loading,
};

const Template: ComponentStory<() => ReactElement | null> = () => <Loading />;

export const Default = Template.bind({});
