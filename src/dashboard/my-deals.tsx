import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

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
  const userRole = "PB"; // This should come from your auth context/state
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
      <Header
        userRole={userRole}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar
          sidebarOpen={sidebarOpen}
          userRole={userRole}
          userId={userId}
        />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-100">
                My Credit Swap Proposals
              </h1>
              <p className="text-gray-400">
                Track and manage your property proposals.
              </p>
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100">Active Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4 text-gray-400">
                          Property Name
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400">
                          Loan Value
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400">
                          Interest Rate
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDeals.map((deal) => (
                        <tr
                          key={deal.id}
                          className="border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                          onClick={() =>
                            navigate(`/dashboard/manage-proxy/${deal.id}`)
                          }
                        >
                          <td className="py-3 px-4 text-gray-100">
                            {deal.propertyName}
                          </td>
                          <td className="py-3 px-4 text-gray-100">
                            {deal.loanValue}
                          </td>
                          <td className="py-3 px-4 text-gray-100">
                            {deal.interestRate}
                          </td>
                          <td className="py-3 px-4">
                            {getStatusBadge(deal.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
