import { atom } from "recoil";

const templateState = atom({
  key: 'Templates',
  default: 'local',
});

export default templateState;