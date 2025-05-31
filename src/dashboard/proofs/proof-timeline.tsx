import { useParams } from "react-router-dom";
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
import { CheckCircle2, Clock, Circle } from "lucide-react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

const mockProofs = [
  {
    id: 1,
    label: "Loan Accepted",
    status: "Approved",
    uploadedBy: "proxybuyer.eth",
    date: "2024-03-01",
  },
  {
    id: 2,
    label: "Month 1 Repayment",
    status: "Pending",
    uploadedBy: "proxybuyer.eth",
    date: "2024-04-01",
  },
  {
    id: 3,
    label: "Month 2 Repayment",
    status: "Not Submitted",
    uploadedBy: null,
    date: "2024-05-01",
  },
];

const TOTAL_MONTHS = 32;
const COMPLETED_MONTHS = 2; // Month 1 and 2 are shown explicitly
const FUTURE_MONTHS = TOTAL_MONTHS - COMPLETED_MONTHS;

export default function ProofTimeline() {
  const { id } = useParams();
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

  const remainingPayments = mockProofs.filter(
    (proof) => proof.status === "Not Submitted"
  ).length;

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
              <h1 className="text-3xl font-bold text-gray-100">
                Proof Timeline for Proposal #{id}
              </h1>
              <p className="text-gray-400">
                Track and manage your proof submissions and approvals.
              </p>
            </div>

            {/* Timeline Card */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100">
                  Payment Timeline
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {remainingPayments} remaining payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {mockProofs.map((proof, index) => (
                    <div key={proof.id} className="relative">
                      {/* Timeline line */}
                      {index !== mockProofs.length - 1 && (
                        <div
                          className={`absolute left-3 top-8 h-full w-0.5 ${
                            proof.status === "Approved"
                              ? "bg-green-500"
                              : proof.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                          }`}
                        />
                      )}

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {getStatusIcon(proof.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-100">
                              {proof.label}
                            </h3>
                            <Badge
                              className={
                                proof.status === "Approved"
                                  ? "bg-green-500"
                                  : proof.status === "Pending"
                                  ? "bg-yellow-500"
                                  : "bg-gray-500"
                              }
                            >
                              {proof.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">
                            Due: {proof.date}
                          </p>
                          {proof.uploadedBy && (
                            <p className="text-sm text-gray-400">
                              Uploaded by: {proof.uploadedBy}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Future Payments Section */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="mt-2 p-4 bg-gray-800/50 rounded-lg">
                          <p className="text-sm text-gray-400">
                            {FUTURE_MONTHS} monthly payments remaining
                          </p>
                          <div className="mt-2 flex gap-1">
                            {Array.from({ length: FUTURE_MONTHS }).map(
                              (_, i) => (
                                <div
                                  key={i}
                                  className="h-1.5 w-1.5 rounded-full bg-gray-600"
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proof Cards */}
            <div className="grid gap-6">
              {mockProofs.map((proof) => (
                <Card key={proof.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-gray-100">
                          {proof.label}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Due: {proof.date}
                        </p>
                      </div>
                      <Badge
                        className={
                          proof.status === "Approved"
                            ? "bg-green-500"
                            : proof.status === "Pending"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }
                      >
                        {proof.status}
                      </Badge>
                    </div>
                    {proof.uploadedBy && (
                      <p className="mt-2 text-sm text-gray-400">
                        Uploaded by: {proof.uploadedBy}
                      </p>
                    )}
                    <div className="mt-4 flex gap-2">
                      {proof.status === "Pending" && (
                        <Button
                          variant="outline"
                          className="bg-gray-800 text-gray-100 hover:bg-gray-700"
                        >
                          Approve
                        </Button>
                      )}
                      {proof.status === "Not Submitted" && (
                        <Button className="bg-purple-600 text-white hover:bg-purple-700">
                          Upload Proof
                        </Button>
                      )}
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
