import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type Role = "AH" | "PB";

interface SidebarProps {
  sidebarOpen: boolean;
  userRole: Role;
  userId: string;
}

export function Sidebar({ sidebarOpen, userRole, userId }: SidebarProps) {
  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-800 bg-gray-950 transition-transform lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex h-full flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="w-full h-32 mb-4 bg-gray-800 rounded-lg flex items-center justify-center">
            <img
              src="/asset-holder.png"
              alt="Asset Holder Logo"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-100">
            Asset Holder Dashboard
          </h2>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <a
            href="/dashboard/explore"
            className="text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-gray-100 group flex items-center rounded-lg px-3 py-2 transition-colors"
          >
            My Credit Swaps
          </a>
          <a
            href="/dashboard/requests/new"
            className="text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-gray-100 group flex items-center rounded-lg px-3 py-2 transition-colors"
          >
            Create New Request
          </a>
        </nav>

        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback className="bg-gray-700 text-gray-100">
                {userRole}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-100 truncate">
                {userRole === "PB" ? "Asset Holder" : "Proxy Buyer"}
              </p>
              <p className="text-xs text-gray-400 truncate">ID: #{userId}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-100 hover:bg-gray-800"
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
