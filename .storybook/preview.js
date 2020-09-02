import { addParameters } from "@storybook/vue";
import "./main.pcss";

addParameters({
  backgrounds: [
    { name: "white", value: "#ffffff"},
    { name: "grey", value: "#8395a7", default: true  },
  ],
  darkMode: {
    current: "dark",
  },
});
