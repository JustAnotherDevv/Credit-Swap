import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar-assetholder";
import { CheckCircle2, Clock, Circle } from "lucide-react";

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

const mockTimeline = [
  {
    id: 1,
    label: "Proposal Submitted",
    status: "Approved",
    date: "2024-03-01",
  },
  {
    id: 2,
    label: "Initial Review",
    status: "Approved",
    date: "2024-03-05",
  },
  {
    id: 3,
    label: "Due Diligence",
    status: "Pending",
    date: "2024-03-10",
  },
  {
    id: 4,
    label: "Final Approval",
    status: "Not Submitted",
    date: "2024-03-15",
  },
];

export default function ProposalTracker() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userRole = "PB"; // This should come from your auth context/state
  const userId = "123"; // This should come from your auth context/state

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case "Pending":
        return <Clock className="h-6 w-6 text-yellow-500" />;
      default:
        return <Circle className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 w-screen">
      <Header
        userRole={userRole}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          userRole={userRole}
          userId={userId}
        />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-100">Proposals</h1>
              <p className="text-gray-400">
                Track and manage your property proposals.
              </p>
            </div>

            {/* Timeline Card */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100">
                  Proposal Timeline
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Track the progress of your proposals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {mockTimeline.map((step, index) => (
                    <div key={step.id} className="relative">
                      {/* Timeline line */}
                      {index !== mockTimeline.length - 1 && (
                        <div
                          className={`absolute left-3 top-8 h-full w-0.5 ${
                            step.status === "Approved"
                              ? "bg-green-500"
                              : step.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                          }`}
                        />
                      )}

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {getStatusIcon(step.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-100">
                              {step.label}
                            </h3>
                            <Badge
                              className={
                                step.status === "Approved"
                                  ? "bg-green-500"
                                  : step.status === "Pending"
                                  ? "bg-yellow-500"
                                  : "bg-gray-500"
                              }
                            >
                              {step.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">
                            Due: {step.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Proposals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockProposals.map((proposal) => (
                <Card key={proposal.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-100">
                      {proposal.property}
                    </h3>
                    <div className="space-y-2">
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
                      <p className="text-gray-300">
                        Proofs submitted: {proposal.proofSubmitted} /{" "}
                        {proposal.totalProofs}
                      </p>
                    </div>
                    {proposal.status === "Accepted" && (
                      <Button
                        variant="outline"
                        className="bg-gray-800 text-gray-100 hover:bg-gray-700"
                      >
                        Upload Next Proof
                      </Button>
                    )}
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
