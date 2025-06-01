import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar-proxy";

export default function DealInfoProxy() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mockRequest = {
    propertyName: "Villa Verde",
    description: "3BR eco-friendly house in southern Spain.",
    loanAmount: 150000,
    yieldPreference: 6.5,
    collateralType: "Yield-Based",
  };

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
              Submit a proposal for a Credit Swap to the request #{id}
            </p>
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

          {/* Submit Proposal Button */}
          <div className="flex justify-end">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate("/dashboard/new-proposal")}
            >
              Submit Proposal
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
