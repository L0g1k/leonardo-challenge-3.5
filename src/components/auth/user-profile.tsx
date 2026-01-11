"use client";

import { useState } from "react";
import Image from "next/image";
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
import { Pencil } from "lucide-react";
import { validateUsername, validateJobTitle, USERNAME_MAX_LENGTH, JOB_TITLE_MAX_LENGTH } from "@/lib/validation";

export function UserProfile() {
  const { user, updateUser, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || "");
  const [errors, setErrors] = useState<{ username?: string; jobTitle?: string }>({});

  if (!user) return null;

  const handleSave = () => {
    const newErrors: { username?: string; jobTitle?: string } = {};
    newErrors.username = validateUsername(username);
    newErrors.jobTitle = validateJobTitle(jobTitle);

    if (newErrors.username || newErrors.jobTitle) {
      setErrors(newErrors);
      return;
    }

    updateUser(username.trim(), jobTitle.trim());
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setUsername(user.username);
      setJobTitle(user.jobTitle);
      setErrors({});
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          aria-label="Edit profile"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/leonardo.png"
              alt="Profile"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
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
            <label htmlFor="profile-username" className="text-sm text-gray-400">Username</label>
            <Input
              id="profile-username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
              }}
              maxLength={USERNAME_MAX_LENGTH}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "profile-username-error" : undefined}
              className="bg-[#333] border-none text-white"
            />
            {errors.username && (
              <p id="profile-username-error" role="alert" className="text-sm text-orange-500">{errors.username}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="profile-jobtitle" className="text-sm text-gray-400">Job Title</label>
            <Input
              id="profile-jobtitle"
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
                if (errors.jobTitle) setErrors((prev) => ({ ...prev, jobTitle: undefined }));
              }}
              maxLength={JOB_TITLE_MAX_LENGTH}
              aria-invalid={!!errors.jobTitle}
              aria-describedby={errors.jobTitle ? "profile-jobtitle-error" : undefined}
              className="bg-[#333] border-none text-white"
            />
            {errors.jobTitle && (
              <p id="profile-jobtitle-error" role="alert" className="text-sm text-orange-500">{errors.jobTitle}</p>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSave}
              className="flex-1 bg-[#e50914] hover:bg-[#f40612] text-white"
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
