import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, Bell, Search, ChevronDown } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { userRole, setUserRole } = useUser();
  const navigate = useNavigate();

  const users = {
    AH: {
      name: "Sally Moneybags",
      role: "Asset Holder",
      image: "/users/sally.png",
      path: "/dashboard/my-requests",
    },
    PB: {
      name: "Yash Goldman",
      role: "Proxy Buyer",
      image: "/users/yash.png",
      path: "/dashboard/my-deals",
    },
  };

  const currentUser = users[userRole];

  const handleUserSwitch = (role: "AH" | "PB") => {
    setUserRole(role);
    navigate(users[role].path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-gray-400 hover:text-gray-100 hover:bg-gray-800"
          onClick={onMenuClick}
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-15 w-15 p-1 rounded-lg object-cover"
          />
          <span className="text-4xl font-bold text-gray-100">Credit Swap</span>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-100 hover:bg-gray-800"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-gray-100 hover:bg-gray-800"
              >
                <img
                  src={currentUser.image}
                  alt={currentUser.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">{currentUser.name}</div>
                  <div className="text-xs text-gray-400">
                    {currentUser.role}
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-gray-900 border-gray-800"
            >
              <DropdownMenuItem
                className="flex items-center gap-2 text-gray-100 cursor-pointer"
                onClick={() => handleUserSwitch("AH")}
              >
                <img
                  src="/users/sally.png"
                  alt="Sally Moneybags"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium">Sally Moneybags</div>
                  <div className="text-xs text-gray-400">Asset Holder</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 text-gray-100 hover:bg-gray-800 cursor-pointer"
                onClick={() => handleUserSwitch("PB")}
              >
                <img
                  src="/users/yash.png"
                  alt="Yash Goldman"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium">Yash Goldman</div>
                  <div className="text-xs text-gray-400">Proxy Buyer</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
