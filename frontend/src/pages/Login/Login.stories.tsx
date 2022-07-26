import { ComponentStory, ComponentMeta } from "@storybook/react";
import Login  from "./Login";

export default {
    title: "Components/Login",
    component: Login,
  } as ComponentMeta<typeof Login>;

  const Template: ComponentStory<typeof Login> = () => (
    <Login />
  );

  export const InputDefault = Template.bind({});
