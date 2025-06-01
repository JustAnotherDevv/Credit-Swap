// ExampleStep.tsx - Shows how to use the new styled components
import React, { useState } from "react";
import {
  PrimaryButton,
  SecondaryButton,
  Card,
  Input,
  StatusBadge,
  ErrorMessage,
  SuccessMessage,
} from "./ui";
import { motion } from "motion/react";

export const ExampleStep: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setShowError(false);
    setShowSuccess(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (inputValue.length < 3) {
      setShowError(true);
    } else {
      setShowSuccess(true);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-6"
    >
      {/* Example Cards */}
      <div className="grid gap-4">
        <Card>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">
                Credit Swap Request
              </h4>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Interest Rate: 5.9% • Loan Amount: $250,000
              </p>
            </div>
            <StatusBadge status="open">Open</StatusBadge>
          </div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Repayment: 24 months • Proofs Submitted: 2/6
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">
                Austin Duplex
              </h4>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Interest Rate: 6.3% • Loan Amount: $320,000
              </p>
            </div>
            <StatusBadge status="pending">Pending</StatusBadge>
          </div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Repayment: 36 months • Proofs Submitted: 0/6
          </div>
        </Card>
      </div>

      {/* Input Example */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-white">
          Enter your proof data
        </label>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter at least 3 characters..."
        />
      </div>

      {/* Messages */}
      {showError && (
        <ErrorMessage>Input must be at least 3 characters long.</ErrorMessage>
      )}

      {showSuccess && (
        <SuccessMessage>Proof data submitted successfully!</SuccessMessage>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center pt-4">
        <SecondaryButton onClick={() => setInputValue("")}>
          Clear
        </SecondaryButton>
        <PrimaryButton
          onClick={handleSubmit}
          loading={loading}
          disabled={!inputValue}
        >
          Submit Proof
        </PrimaryButton>
      </div>
    </motion.div>
  );
};

// You can also create specific components for your use cases
export const CreditSwapCard: React.FC<{
  title: string;
  interestRate: string;
  loanAmount: string;
  repayment: string;
  proofsSubmitted: string;
  status: "open" | "pending" | "closed";
  onClick?: () => void;
}> = ({
  title,
  interestRate,
  loanAmount,
  repayment,
  proofsSubmitted,
  status,
  onClick,
}) => {
  return (
    <Card onClick={onClick} className="hover:scale-[1.02] transition-transform">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Interest Rate: {interestRate} • Loan Amount: {loanAmount}
          </p>
        </div>
        <StatusBadge status={status}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </StatusBadge>
      </div>
      <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
        Repayment: {repayment} • Proofs Submitted: {proofsSubmitted}
      </div>
    </Card>
  );
};
