import { useReducer } from "react";

const useToggle = (value = false) =>
  useReducer((prevState) => !prevState, value);

export default useToggle;
