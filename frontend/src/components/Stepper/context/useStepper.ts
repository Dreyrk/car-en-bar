import { useContext } from "react";
import StepperContext from "./StepperContext";

const useStepper = () => {
  return useContext(StepperContext);
};

export default useStepper;
