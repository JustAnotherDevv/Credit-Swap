import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

const mockProposals = [
  {
    id: "p1",
    property: "Villa Verde",
    rate: 5.9,
    months: 24,
    status: "Accepted",
    proofSubmitted: 2,
    totalProofs: 6,
  },
  {
    id: "p2",
    property: "Austin Duplex",
    rate: 6.3,
    months: 36,
    status: "Pending",
    proofSubmitted: 0,
    totalProofs: 6,
  },
];

export default function ProposalTracker() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userRole = "PB"; // This should come from your auth system
  const userId = "123"; // This should come from your auth system

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 w-screen flex flex-col">
      <Header
        userRole={userRole}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1">
        <Sidebar
          sidebarOpen={sidebarOpen}
          userRole={userRole}
          userId={userId}
        />

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-100">
                Your Proposals
              </h1>
              <p className="text-gray-400">
                Track and manage your property proposals
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
              {mockProposals.map((proposal) => (
                <Card key={proposal.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-100">
                      <BriefcaseIcon className="text-purple-500 h-5 w-5" />
                      {proposal.property}
                    </div>
                    <p className="text-gray-300">
                      Offered Rate: {proposal.rate}%
                    </p>
                    <p className="text-gray-300">
                      Repayment: {proposal.months} months
                    </p>
                    <p className="text-gray-300">
                      Status:{" "}
                      <Badge
                        className={
                          proposal.status === "Accepted"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }
                      >
                        {proposal.status}
                      </Badge>
                    </p>
                    <p className="text-sm text-gray-400">
                      Proofs Submitted: {proposal.proofSubmitted}/
                      {proposal.totalProofs}
                    </p>
                    <Button className="w-full mt-2 bg-purple-600 text-white hover:bg-purple-700">
                      View Progress
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
