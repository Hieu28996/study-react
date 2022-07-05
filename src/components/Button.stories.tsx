import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "components/Button";

export default {
  title: "Components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <div style={{ background: "#341267", padding: "20px" }}>
    <Button {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  children: "하이",
};
export const PrimaryWhite = Template.bind({});
PrimaryWhite.args = {
  children: "하이",
};

export const PrimaryDisable = Template.bind({});
PrimaryDisable.args = {
  children: "하이",
  disabled: true,
};
export const Secondary = Template.bind({});
Secondary.args = {
  children: "하이",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  children: "하이",
};
