import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MenuIcon,
  CheckCircleIcon,
  HomeIcon,
  SearchIcon,
  ClipboardListIcon,
  Bell,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  };

  const mockProposals = [
    { id: "p1", from: "proxybuyer.eth", rate: 5.8, months: 24 },
    { id: "p2", from: "builderdao.eth", rate: 6.2, months: 30 },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 w-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
        <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-400 hover:text-gray-100 hover:bg-gray-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600" />
            <span className="text-xl font-bold text-gray-100">Dashboard</span>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search requests..."
                className="pl-10 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-100 hover:bg-gray-800"
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="User"
              />
              <AvatarFallback className="bg-gray-700 text-gray-100">
                PB
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4 space-y-6 hidden lg:block">
          <nav className="space-y-2">
            <a
              href="/dashboard/explore"
              className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-100"
            >
              <HomeIcon className="h-4 w-4" /> Explore
            </a>
            <a
              href="/dashboard/proposals"
              className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-100"
            >
              <SearchIcon className="h-4 w-4" /> Proposals
            </a>
            <a
              href={`/dashboard/manage/${id}`}
              className="flex items-center gap-2 text-sm font-medium text-purple-400"
            >
              <ClipboardListIcon className="h-4 w-4" /> Engagement
            </a>
          </nav>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-2 mb-6">
            <h1 className="text-3xl font-bold text-gray-100">
              Request Details
            </h1>
            <p className="text-gray-400">
              Review and manage loan request #{id}
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
