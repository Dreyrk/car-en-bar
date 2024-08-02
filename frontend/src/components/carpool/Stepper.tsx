"use client";

import { Button } from "../ui/button";
import { StepperActionEnum } from "../Stepper/context/StepperContext";
import useStepper from "../Stepper/context/useStepper";

export default function Stepper({ steps, submit }: { steps: React.ReactNode[]; submit: () => void }) {
  const { state, dispatch } = useStepper();

  const renderStepContent = (step: number) => {
    return steps[step] ? steps[step] : null;
  };

  return (
    <div className="grid place-items-center w-full min-w-[260px] max-w-md my-4 max-sm:px-2">
      {renderStepContent(state.step)}
      <div className="w-full flex justify-between items-center mt-8 max-sm:px-6">
        <Button onClick={() => dispatch({ type: StepperActionEnum.prev, payload: 1 })} disabled={state.step === 0}>
          Back
        </Button>
        <div className="flex gap-1 items-center justify-center">
          <StepsCircles step={state.step} maxSteps={state.maxStep} />
        </div>
        <Button
          onClick={
            state.step === state.maxStep ? submit : () => dispatch({ type: StepperActionEnum.next, payload: 1 })
          }>
          {state.step === state.maxStep ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
}

export function StepsCircles({ step, maxSteps }: { step: number; maxSteps: number }) {
  return Array.from({ length: maxSteps }, (v, k) => k).map((currentStep) =>
    currentStep <= step ? (
      <div key={currentStep} className="w-4 h-4 rounded-full bg-black"></div>
    ) : (
      <div key={currentStep} className="w-4 h-4 rounded-full bg-transparent border-2 border-slate-400"></div>
    )
  );
}
