import DropZone, { DropZoneProps } from "./DropZone";

export default {
	title: "Components/DropZone",
	component: DropZone,
};

const Template = (args: DropZoneProps) => <DropZone {...args} />;

export const Default = Template.bind({});
