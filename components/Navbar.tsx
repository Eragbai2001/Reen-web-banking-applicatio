"use client";

import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { sidebarLinks } from "@/constants/index";

export default function Navbar({
  type,
  userName = "Aideloje Josiah",
  userId = "1234567890",
  userImage = "/placeholder.svg",
  user,
}: NavbarProps) {
  return (
    <div className="flex h-16 items-center justify-between w-full ">
      {/* Left section */}
      <div>
        {sidebarLinks.map(
          (item) =>
            type === item.label && (
              <h1
                key={item.label}
                className="text-xl font-semibold text-[#252525]"
              >
                {item.label}
              </h1>
            )
        )}
      </div>

      {/* Center section */}
      <div className="flex flex-col items-end">
        <p className="text-sm font-medium text-[#33B786] ">{user.name}</p>
        <p className="text-2xl text-muted-foreground font-bold text-black ">
          {userId}
        </p>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <div className="relative w-64 ">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-8 border-none  shadow-none "
          />
        </div>
        <button className="rounded-full p-2 hover:bg-accent">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </button>
        <Avatar>
          <AvatarImage src={userImage} alt={`${userName}'s avatar`} />
          <AvatarFallback>
            {userName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
