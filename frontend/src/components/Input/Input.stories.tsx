import { ComponentStory, ComponentMeta } from "@storybook/react";
import Input from "components/Input";

export default {
  title: "Components/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
  <Input {...args} />
);

export const InputDefault = Template.bind({});
InputDefault.args = {
  
};
