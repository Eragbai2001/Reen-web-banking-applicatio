"use client";

import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { sidebarLinks } from "@/constants/index";

export default function Navbar({
  type,
  userId = "1234567890",
  user,
}: NavbarProps) {
  return (
    <div className="hidden md:flex h-16 items-center justify-around w-full  ">
      {/* Left section */}
      <div>
        {sidebarLinks.map(
          (item) =>
            type === item.label && (
              <h1
                key={item.label}
                className="text-xl font-semibold text-[#252525] "
              >
                {item.label}
              </h1>
            )
        )}
      </div>

      {/* Center section */}
      <div className="flex flex-col items-end">
        <p className="text-lg font-medium text-[#33B786] ">
          {" "}
          <span className="text-black">Hello&apos;</span>
          {user.name}{" "}
        </p>
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
            className="w-full pl-8 border-none shadow-none "
          />
        </div>
        <button className="rounded-full p-2 hover:bg-accent">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </button>
        <Avatar>
          <AvatarImage
            src={user.profileImage || "/placeholder.svg"}
            alt={`${user.name}'s avatar`}
          />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
