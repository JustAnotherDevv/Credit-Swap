import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar-proxy";

const mockDeals = [
  {
    id: 1,
    propertyName: "Sunset Apartments",
    loanValue: "€2,500,000",
    interestRate: "4.5%",
    status: "accepted",
  },
  {
    id: 2,
    propertyName: "Downtown Plaza",
    loanValue: "€5,000,000",
    interestRate: "5.2%",
    status: "pending",
  },
  {
    id: 3,
    propertyName: "Riverside Complex",
    loanValue: "€3,750,000",
    interestRate: "4.8%",
    status: "rejected",
  },
  {
    id: 4,
    propertyName: "Hillside Villas",
    loanValue: "€8,000,000",
    interestRate: "5.0%",
    status: "completed",
  },
];

export default function MyDeals() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { userRole } = useUser();
  const userId = "123"; // This should come from your auth context/state

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      accepted: "bg-green-500",
      pending: "bg-yellow-500",
      rejected: "bg-red-500",
      completed: "bg-blue-500",
    };

    return (
      <Badge className={statusStyles[status as keyof typeof statusStyles]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 w-screen">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
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
                My Credit Swap Proposals
              </h1>
              <p className="text-gray-400">
                Track and manage your Credit Swap proposals and their status.
              </p>
            </div>

            <div className="grid gap-6">
              {mockDeals.map((deal) => (
                <Card
                  key={deal.id}
                  className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
                  onClick={() =>
                    navigate(`/dashboard/deal-info-proxy/${deal.id}`)
                  }
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-100">
                        {deal.propertyName}
                      </CardTitle>
                      {getStatusBadge(deal.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Loan Value</p>
                        <p className="text-lg font-semibold text-gray-100">
                          {deal.loanValue}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Interest Rate</p>
                        <p className="text-lg font-semibold text-gray-100">
                          {deal.interestRate}
                        </p>
                      </div>
                    </div>
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
