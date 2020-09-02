import addLine from "./addLine"

export default {
  title: "addLine",
  components: {addLine}
}

export const defaultView = () => ({
  components: {addLine},
  template: `
    <add-line /> 
  `
})