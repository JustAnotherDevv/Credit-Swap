import * as React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useCurrentStep } from "../../hooks/useCurentStep";
import { useNavigate } from "react-router";

export const Navigation: React.FC = () => {
  const { currentStep } = useCurrentStep();
  const navigate = useNavigate();

  return (
    <nav
      className="navigation"
      style={{ opacity: currentStep?.backUrl ? 1 : 0 }}
    >
      <BackButton
        back={() => {
          if (currentStep?.backUrl) {
            void navigate(currentStep.backUrl);
          }
        }}
      />
      <div></div> {/* Spacer for flex layout */}
    </nav>
  );
};

export const BackButton: React.FC<{ back: () => void }> = ({ back }) => {
  return (
    <button onClick={back} className="back-button">
      <ChevronLeftIcon className="w-3.5 h-3.5" />
      <span>Back</span>
    </button>
  );
};
