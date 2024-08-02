"use client";

import { CarpoolType } from "@/types";
import { createContext, Dispatch, useReducer, useState } from "react";

export enum StepperActionEnum {
  prev = "prev",
  next = "next",
}

export interface StepperAction {
  type: StepperActionEnum;
  payload: number;
}

export interface StepState {
  step: number;
  maxStep: number;
}

export interface ContextType {
  state: StepState;
  dispatch: Dispatch<any>;
  carpool: Partial<CarpoolType>;
  setCarpool: React.Dispatch<React.SetStateAction<Partial<CarpoolType>>>;
}

const StepperContext = createContext<ContextType>({} as ContextType);

function stepReducer(state: StepState, action: StepperAction) {
  const { type, payload } = action;
  switch (type) {
    case StepperActionEnum.prev:
      return {
        ...state,
        step: Math.max(0, state.step - payload),
      };

    case StepperActionEnum.next:
      return {
        ...state,
        step: Math.min(state.maxStep, state.step + payload),
      };

    default:
      return state;
  }
}

export function StepperContextProvider({ children, maxStep }: { children: React.ReactNode; maxStep: number }) {
  const [state, dispatch] = useReducer(stepReducer, { step: 0, maxStep });
  const [carpool, setCarpool] = useState<Partial<CarpoolType>>({});
  return <StepperContext.Provider value={{ state, dispatch, carpool, setCarpool }}>{children}</StepperContext.Provider>;
}

export default StepperContext;
