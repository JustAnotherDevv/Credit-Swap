import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MenuIcon, Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RequestNew() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    propertyName: "",
    description: "",
    loanAmount: "",
    collateralType: "",
    yieldPreference: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted request:", form);
    // TODO: connect to onchain or backend submission logic
  };

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
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-100">
                Create New Asset Request
              </h1>
              <p className="text-gray-400">
                Submit a new asset request for funding consideration.
              </p>
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100">Request Details</CardTitle>
                <CardDescription className="text-gray-400">
                  Fill in the details below to create your asset request
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="propertyName" className="text-gray-100">
                      Property Name
                    </Label>
                    <Input
                      name="propertyName"
                      value={form.propertyName}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-gray-100">
                      Description
                    </Label>
                    <Textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanAmount" className="text-gray-100">
                      Loan Amount (USD)
                    </Label>
                    <Input
                      name="loanAmount"
                      type="number"
                      value={form.loanAmount}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="collateralType" className="text-gray-100">
                      Collateral Type (e.g. yield, direct)
                    </Label>
                    <Input
                      name="collateralType"
                      value={form.collateralType}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yieldPreference" className="text-gray-100">
                      Yield Preference % (if any)
                    </Label>
                    <Input
                      name="yieldPreference"
                      type="number"
                      value={form.yieldPreference}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-purple-600 text-white hover:bg-purple-700"
                  >
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
