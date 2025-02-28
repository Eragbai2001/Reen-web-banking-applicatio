import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

const profileInfo = ({ user }: NavbarProps) => {
  return (
    <div className=" flex items-center gap-3  p-3">
      <button className="rounded-full p-2 hover:bg-accent">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </button>
      <Avatar className="h-12 w-12">
        <AvatarImage
          src={user?.profileImage || "/placeholder.svg"}
          alt={`${user?.name}'s avatar`}
        />
        <AvatarFallback className="bg-amber-100 text-black">
          {user?.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium">{user?.name}</span>
        <span className="text-gray-500 text-xs">
          {user?.email?.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default profileInfo;
