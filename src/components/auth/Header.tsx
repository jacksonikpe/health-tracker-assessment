import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { capitalizeUsername } from "@/lib/utils";

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

const Header = ({ username, onLogout }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Health Tracker</h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:inline text-sm text-gray-600">
              Welcome,{" "}
              <span className="font-semibold">
                {capitalizeUsername(username)}
              </span>
            </span>

            <span className="sm:hidden text-sm font-semibold text-gray-800">
              {username}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="gap-2 border-gray-300 hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" />

              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
