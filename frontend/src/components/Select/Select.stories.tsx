import Select, { SelectProps } from "components/Select";

export default {
	title: "Components/Select",
	component: Select,
};

const Template: any = (args: SelectProps) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
	options: ["Card", "Classic", "Compact"],
	activeOption: 0,
};
