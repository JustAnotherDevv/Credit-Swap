import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function CreditSwapManagement() {
  const vaultBalance = 100000;
  const [yieldGenerated, setYieldGenerated] = useState(3200); // simulated yield
  const [loanRemaining, setLoanRemaining] = useState(150000);
  const [releasedToPB, setReleasedToPB] = useState(0);

  const handleReleaseYield = () => {
    const releaseAmount = Math.min(yieldGenerated, loanRemaining);
    setYieldGenerated((y) => y - releaseAmount);
    setLoanRemaining((l) => l - releaseAmount);
    setReleasedToPB((r) => r + releaseAmount);
  };

  return (
    <div className="p-6 space-y-6  mx-auto">
      <h2 className="text-2xl font-semibold">Vault Dashboard</h2>

      <Card>
        <CardContent className="space-y-2 p-4">
          <p>
            <strong>Vault Balance:</strong> ${vaultBalance.toLocaleString()}
          </p>
          <p>
            <strong>Yield Generated:</strong> ${yieldGenerated.toLocaleString()}
          </p>
          <p>
            <strong>Amount Released to Proxy Buyer:</strong> $
            {releasedToPB.toLocaleString()}
          </p>
          <Button
            onClick={handleReleaseYield}
            disabled={yieldGenerated === 0 || loanRemaining === 0}
          >
            Release Yield to Proxy Buyer
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 p-4">
          <p>
            <strong>Loan Remaining:</strong> ${loanRemaining.toLocaleString()}
          </p>
          <Progress value={100 - (loanRemaining / 150000) * 100} />
        </CardContent>
      </Card>
    </div>
  );
}
