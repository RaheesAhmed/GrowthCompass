import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

interface SettingsSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsSheet: React.FC<SettingsSheetProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const handleLogout = () => {
    onOpenChange(false);
    window.location.href = "/";
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[540px] overflow-hidden flex flex-col"
      >
        <SheetHeader className="flex flex-row justify-between items-center">
          <SheetTitle>Settings</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-8 w-8"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto space-y-6 py-6">
          {/* Add basic settings here if needed */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsSheet;
