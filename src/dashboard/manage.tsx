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
import { Progress } from "@/components/ui/progress";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar-assetholder";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Simulated role ("AH" or "PB")
type Role = "AH" | "PB";
const userRole: Role = "AH"; // change to "PB" to see the other view

export default function ManagementConsole() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [yieldAvailable, setYieldAvailable] = useState(3200);
  const [released, setReleased] = useState(3000);
  const [loanRemaining, setLoanRemaining] = useState(150000 - released);
  const [propertyName, setPropertyName] = useState("");

  // Mock data - in a real app, this would come from an API call
  const mockLoans = {
    p1: "Villa Verde",
    p2: "Austin Duplex",
  };

  // Set property name when component mounts
  useEffect(() => {
    if (id) {
      setPropertyName(
        mockLoans[id as keyof typeof mockLoans] || "Unknown Property"
      );
    }
  }, [id]);

  const handleReleaseYield = () => {
    const amount = Math.min(yieldAvailable, loanRemaining);
    setReleased(released + amount);
    setYieldAvailable(yieldAvailable - amount);
    setLoanRemaining(loanRemaining - amount);
  };

  const chartData = {
    labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5"],
    datasets: [
      {
        label: "Monthly Paybacks",
        data: [1000, 1200, 800, 1100, 900],
        backgroundColor: "#4ade80",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
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
          userId={id || ""}
        />

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-100">
                My Credit Swap for {propertyName}
              </h1>
              <p className="text-gray-400">
                Manage your loan engagement and track progress.
              </p>
            </div>

            {/* Property Image */}
            <div className="w-full h-100 relative rounded-lg overflow-hidden">
              <img
                src="/properties/4.png"
                alt={`${propertyName} property image`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="secondary"
                asChild
                className="bg-gray-800 text-gray-100 hover:bg-gray-700"
              >
                <a href={`/dashboard/requests/${id}`}>
                  View Credit Swap Request & Proposals
                </a>
              </Button>
              <Button
                variant="secondary"
                asChild
                className="bg-gray-800 text-gray-100 hover:bg-gray-700"
              >
                <a href={`/dashboard/proofs/${id}`}>View Proof of Property</a>
              </Button>
            </div>

            {/* Stat Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-100">
                    Yield Available
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Available for release
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">
                    ${yieldAvailable.toLocaleString()}
                  </div>
                  {userRole === "AH" && (
                    <Button
                      onClick={handleReleaseYield}
                      disabled={yieldAvailable === 0 || loanRemaining === 0}
                      className="bg-purple-600 hover:bg-purple-700 mt-4 w-full"
                    >
                      Release Yield to Proxy Buyer
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-100">
                    Payments Released to Proxy Buyer
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Total released amount
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">
                    ${released.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-100">
                    Remaining Credit Swap Loan
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Outstanding balance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">
                    ${loanRemaining.toLocaleString()}
                  </div>
                  <Progress
                    value={(released / 150000) * 100}
                    className="mt-2"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100">Payback History</CardTitle>
                <CardDescription className="text-gray-400">
                  Monthly payment tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Bar data={chartData} options={chartOptions} />
              </CardContent>
            </Card>

            {/* Proof Timeline Section */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100">Proof Timeline</CardTitle>
                <CardDescription className="text-gray-400">
                  Payment verification status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center text-green-500">
                    <span className="mr-2">✔</span> Loan Accepted (Month 0)
                  </li>
                  <li className="flex items-center text-green-500">
                    <span className="mr-2">✔</span> Payment Received (Month 1)
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="mr-2">⬜</span> Payment Pending (Month 2)
                  </li>
                </ul>
                {userRole === "PB" && (
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-100 hover:bg-gray-800"
                  >
                    Upload Month 2 Proof
                  </Button>
                )}
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
