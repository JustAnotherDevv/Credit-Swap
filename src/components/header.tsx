import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MenuIcon, Bell, Search } from "lucide-react";

interface HeaderProps {
  userRole: "AH" | "PB";
  onMenuClick?: () => void;
}

export function Header({ userRole, onMenuClick }: HeaderProps) {
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
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600" />
          <span className="text-xl font-bold text-gray-100">Dashboard</span>
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
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback className="bg-gray-700 text-gray-100">
              {userRole}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
