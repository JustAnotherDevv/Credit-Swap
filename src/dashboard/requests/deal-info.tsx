import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircleIcon } from "lucide-react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar-assetholder";

export default function RequestDetail() {
  const { id } = useParams();
  const [acceptedProposal, setAcceptedProposal] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mockRequest = {
    propertyName: "Villa Verde",
    description: "3BR eco-friendly house in southern Spain.",
    loanAmount: 150000,
    yieldPreference: 6.5,
    collateralType: "Yield-Based",
    image: "/properties/1.png",
  };

  const mockProposals = [
    { id: "p1", from: "proxybuyer.eth", rate: 5.8, months: 24 },
    { id: "p2", from: "builderdao.eth", rate: 6.2, months: 30 },
  ];

  return (
    <div className="min-h-screen w-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      <Header userRole="PB" onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex h-[calc(100vh-4rem)] w-full">
        <Sidebar sidebarOpen={sidebarOpen} userRole="PB" userId={id || "1"} />

        {/* Main Panel */}
        <main className="flex-1 p-6 overflow-y-auto w-full">
          <div className="space-y-2 mb-6">
            <h1 className="text-3xl font-bold text-gray-100">
              Request Details
            </h1>
            <p className="text-gray-400">
              Review and manage loan request #{id}
            </p>
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
              <img
                src={mockRequest.image}
                alt={mockRequest.propertyName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/600x400/1f2937/ffffff?text=Property+Image";
                }}
              />
            </div>
          </div>

          <Separator className="my-4 bg-gray-800" />

          {/* Request Info */}
          <Card className="mb-6 bg-gray-900 border-gray-800">
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Property</p>
                  <p className="font-medium text-gray-100">
                    {mockRequest.propertyName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Description</p>
                  <p className="font-medium text-gray-100">
                    {mockRequest.description}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Loan Amount</p>
                  <p className="font-medium text-gray-100">
                    ${mockRequest.loanAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Yield Preference</p>
                  <p className="font-medium text-gray-100">
                    {mockRequest.yieldPreference}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Collateral Type</p>
                  <p className="font-medium text-gray-100">
                    {mockRequest.collateralType}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-semibold mb-4 text-gray-100">
            Proposals
          </h3>
          <div
            className="grid gap-6 w-full"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {mockProposals.map((proposal) => (
              <Card
                key={proposal.id}
                className="hover:shadow-lg transition-shadow bg-gray-900 border-gray-800"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">From</p>
                      <p className="font-medium text-gray-100">
                        {proposal.from}
                      </p>
                    </div>
                    {acceptedProposal === proposal.id && (
                      <Badge className="bg-green-500">Accepted</Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Rate</p>
                      <p className="font-medium text-gray-100">
                        {proposal.rate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Term</p>
                      <p className="font-medium text-gray-100">
                        {proposal.months} months
                      </p>
                    </div>
                  </div>
                  <Button
                    disabled={!!acceptedProposal}
                    onClick={() => setAcceptedProposal(proposal.id)}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {acceptedProposal === proposal.id ? (
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                    ) : null}
                    {acceptedProposal === proposal.id
                      ? "Accepted"
                      : "Accept Proposal"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
