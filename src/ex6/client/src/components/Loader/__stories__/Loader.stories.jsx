import React from "react";
import "./Loader.stories.css"

import { Loader } from "../Loader";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Loader",
  component: Loader,
};

const Template = ({ wrapperClassName, ...args }) => (
  <div className={wrapperClassName}>
    <Loader {...args} />
  </div>
);
export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: "secondary",
};
export const Dark = Template.bind({});
Dark.args = {
  type: "dark",
};

export const OnColor = Template.bind({});
OnColor.args = { type: "onColor", wrapperClassName: "coloredBackground" };