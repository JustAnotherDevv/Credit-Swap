import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar-proxy";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";

// Simulated role ("AH" or "PB")
type Role = "AH" | "PB";
const userRole: Role = "PB"; // Property Buyer role to show payment evidence button

type TimelineStep = {
  month: number;
  status: "completed" | "current" | "upcoming";
  title: string;
  description: string;
  amount: number;
  date: string;
};

export default function ManagementConsoleProxy() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [propertyName, setPropertyName] = useState("");

  // Mock data - in a real app, this would come from an API call
  const mockLoans = {
    p1: "Villa Verde",
    p2: "Austin Duplex",
  };

  // Mock timeline data
  const timelineSteps: TimelineStep[] = [
    {
      month: 1,
      status: "completed",
      title: "Initial Payment",
      description: "First monthly payment completed",
      amount: 1000,
      date: "2024-01-15",
    },
    {
      month: 2,
      status: "completed",
      title: "Second Payment",
      description: "Second monthly payment completed",
      amount: 1000,
      date: "2024-02-15",
    },
    {
      month: 3,
      status: "current",
      title: "Current Payment",
      description: "Payment due for March",
      amount: 1000,
      date: "2024-03-15",
    },
    {
      month: 4,
      status: "upcoming",
      title: "Upcoming Payment",
      description: "Payment due for April",
      amount: 1000,
      date: "2024-04-15",
    },
  ];

  // Set property name when component mounts
  useEffect(() => {
    if (id) {
      setPropertyName(
        mockLoans[id as keyof typeof mockLoans] || "Unknown Property"
      );
    }
  }, [id]);

  const getStatusIcon = (status: TimelineStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case "current":
        return <Circle className="h-6 w-6 text-blue-500" />;
      case "upcoming":
        return <AlertCircle className="h-6 w-6 text-gray-500" />;
    }
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
          userId={id || ""}
        />

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-100">
                Payment Timeline for {propertyName}
              </h1>
              <p className="text-gray-400">
                Track your loan repayment progress and submit payment evidence.
              </p>
            </div>

            {/* Timeline */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100">
                  Payment Timeline
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Track your monthly payments and submit evidence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {timelineSteps.map((step, index) => (
                    <div key={step.month} className="relative">
                      {/* Timeline connector */}
                      {index < timelineSteps.length - 1 && (
                        <div className="absolute left-3 top-6 h-full w-0.5 bg-gray-700" />
                      )}

                      <div className="flex items-start gap-4">
                        <div className="mt-1">{getStatusIcon(step.status)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-100">
                              {step.title}
                            </h3>
                            <span className="text-sm text-gray-400">
                              {step.date}
                            </span>
                          </div>
                          <p className="text-gray-400 mt-1">
                            {step.description}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-green-500 font-semibold">
                              ${step.amount.toLocaleString()}
                            </span>
                            {step.status === "current" && userRole === "PB" && (
                              <Button
                                variant="outline"
                                className="flex items-center gap-2 text-white hover:bg-purple-300"
                                asChild
                              >
                                <a href="" rel="noopener noreferrer">
                                  <img
                                    src="/vlayer.png"
                                    alt="vLayer Logo"
                                    className="h-6 w-auto"
                                  />
                                  <span>Submit Payment Proof</span>
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
