import { ComponentStory } from "@storybook/react";
import { ReactElement } from "react";
import Register from "./Register";

export default {
  title: "Components/Register",
  component: Register,
};

const Template: ComponentStory<() => ReactElement | null> = () => <Register />;

export const Default = Template.bind({});