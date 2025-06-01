import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar-assetholder";
import { useNavigate } from "react-router-dom";

const mockProposals = [
  {
    id: "p1",
    property: "Villa Verde",
    rate: 5.9,
    months: 24,
    status: "Open",
    proofSubmitted: 2,
    totalProofs: 6,
    loanAmount: 250000,
    image: "/properties/1.png",
  },
  {
    id: "p2",
    property: "Austin Duplex",
    rate: 6.3,
    months: 36,
    status: "Pending",
    proofSubmitted: 0,
    totalProofs: 6,
    loanAmount: 320000,
    image: "/properties/2.png",
  },
  {
    id: "p3",
    property: "Miami Beach Condo",
    rate: 5.5,
    months: 48,
    status: "Open",
    proofSubmitted: 4,
    totalProofs: 6,
    loanAmount: 450000,
    image: "/properties/3.png",
  },
  {
    id: "p4",
    property: "Seattle Townhouse",
    rate: 6.1,
    months: 30,
    status: "Open",
    proofSubmitted: 1,
    totalProofs: 6,
    loanAmount: 380000,
    image: "/properties/4.png",
  },
  {
    id: "p5",
    property: "Denver Loft",
    rate: 5.7,
    months: 36,
    status: "Pending",
    proofSubmitted: 3,
    totalProofs: 6,
    loanAmount: 290000,
    image: "/properties/5.png",
  },
  {
    id: "p6",
    property: "Portland Bungalow",
    rate: 6.0,
    months: 24,
    status: "Open",
    proofSubmitted: 5,
    totalProofs: 6,
    loanAmount: 275000,
    image: "/properties/6.png",
  },
];

export default function MyRequests() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userRole = "PB"; // This should come from your auth system
  const userId = "123"; // This should come from your auth system
  const navigate = useNavigate();

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
                Credit Swap Requests
              </h1>
              <p className="text-gray-400">
                Manage your requests for Credit Swaps and ongoing loans.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
              {mockProposals.map((proposal) => (
                <Card key={proposal.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4 space-y-2">
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                      <img
                        src={proposal.image}
                        alt={proposal.property}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/600x400/1f2937/ffffff?text=Property+Image";
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-100">
                      <BriefcaseIcon className="text-purple-500 h-5 w-5" />
                      {proposal.property}
                    </div>
                    <p className="text-gray-300">
                      Interest Rate: {proposal.rate}%
                    </p>
                    <p className="text-gray-300">
                      Loan Amount: ${proposal.loanAmount.toLocaleString()}
                    </p>
                    <p className="text-gray-300">
                      Repayment: {proposal.months} months
                    </p>
                    <p className="text-gray-300">
                      Status:{" "}
                      <Badge
                        className={
                          proposal.status === "Open"
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
                    <Button
                      className="w-full mt-2 bg-purple-600 text-white hover:bg-purple-700"
                      onClick={() =>
                        navigate(`/dashboard/manage/${proposal.id}`)
                      }
                    >
                      View More Info
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
