import { atom } from "recoil";
import templates from "../util/templates";

const templateState = atom({
  key: 'Templates',
  default: 'local',
  templates
});

export default templateState;