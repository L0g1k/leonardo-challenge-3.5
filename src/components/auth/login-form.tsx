"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/user-context";
import { validateUsername, validateJobTitle, USERNAME_MAX_LENGTH, JOB_TITLE_MAX_LENGTH } from "@/lib/validation";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [errors, setErrors] = useState<{ username?: string; jobTitle?: string }>({});
  const { login } = useUser();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { username?: string; jobTitle?: string } = {};

    newErrors.username = validateUsername(username);
    newErrors.jobTitle = validateJobTitle(jobTitle);

    if (newErrors.username || newErrors.jobTitle) {
      setErrors(newErrors);
      return;
    }

    login(username.trim(), jobTitle.trim());
    router.push("/browse");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-white">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
          }}
          placeholder="Enter your username"
          maxLength={USERNAME_MAX_LENGTH}
          className="bg-[#333] border-none text-white placeholder:text-gray-400 h-12 rounded"
        />
        {errors.username && (
          <p className="text-sm text-orange-500">{errors.username}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobTitle" className="text-white">
          Job Title
        </Label>
        <Input
          id="jobTitle"
          type="text"
          value={jobTitle}
          onChange={(e) => {
            setJobTitle(e.target.value);
            if (errors.jobTitle) setErrors((prev) => ({ ...prev, jobTitle: undefined }));
          }}
          placeholder="Enter your job title"
          maxLength={JOB_TITLE_MAX_LENGTH}
          className="bg-[#333] border-none text-white placeholder:text-gray-400 h-12 rounded"
        />
        {errors.jobTitle && (
          <p className="text-sm text-orange-500">{errors.jobTitle}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-[#e50914] hover:bg-[#f40612] text-white font-semibold rounded"
      >
        Sign In
      </Button>
    </form>
  );
}
