import { useParams } from "react-router-dom";
import { useState } from "react";
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
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/sidebar";

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
                Engagement Console
              </h1>
              <p className="text-gray-400">
                Manage your loan engagement and track progress.
              </p>
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
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-100">
                    Released to PB
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
                    Loan Remaining
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

            {/* Vault Section */}
            {userRole === "AH" && (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-100">
                    Vault & Yield Management
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Release yield to proxy buyer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleReleaseYield}
                    disabled={yieldAvailable === 0 || loanRemaining === 0}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Release Yield to Proxy Buyer
                  </Button>
                </CardContent>
              </Card>
            )}

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

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="secondary"
                asChild
                className="bg-gray-800 text-gray-100 hover:bg-gray-700"
              >
                <a href={`/dashboard/requests/${id}`}>View Full Request</a>
              </Button>
              <Button
                variant="secondary"
                asChild
                className="bg-gray-800 text-gray-100 hover:bg-gray-700"
              >
                <a href={`/dashboard/proofs/${id}`}>View Proof History</a>
              </Button>
            </div>
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
