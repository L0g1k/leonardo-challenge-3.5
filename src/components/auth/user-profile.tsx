"use client";

import { useState } from "react";
import { useUser } from "@/context/user-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, Pencil } from "lucide-react";

export function UserProfile() {
  const { user, updateUser, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || "");

  if (!user) return null;

  const handleSave = () => {
    if (username.trim() && jobTitle.trim()) {
      updateUser(username.trim(), jobTitle.trim());
      setIsOpen(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setUsername(user.username);
      setJobTitle(user.jobTitle);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10 transition-colors">
          <div className="w-8 h-8 rounded bg-[#e50914] flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-white">{user.username}</p>
            <p className="text-xs text-gray-400">{user.jobTitle}</p>
          </div>
          <Pencil className="w-4 h-4 text-gray-400 hidden md:block" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#181818] border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Username</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#333] border-none text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Job Title</label>
            <Input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="bg-[#333] border-none text-white"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSave}
              className="flex-1 bg-[#e50914] hover:bg-[#f40612]"
            >
              Save Changes
            </Button>
            <Button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              variant="outline"
              className="border-gray-600 text-white hover:bg-white/10"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
