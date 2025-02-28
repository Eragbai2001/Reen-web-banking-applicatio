"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";

interface User {
  id: string;
  name: string;
  email: string;
  // Add other fields as necessary
}
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Footer from "./homefooter";

declare interface MobileNavProps {
  user: User;
}
const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          {" "}
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className=" bg-white ">
          <Link
            href="/"
            className=" cursor-pointer items-center gap-1 flex Px-4 "
          >
            <Image
              src="/logo.png"
              width={140}
              height={140}
              alt="Horizon logo"
            />
          </Link>
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);
                  return (
                    <Link
                      href={item.route}
                      key={item.label}
                      className={cn("sidebar-link", {
                        "text-[#33B786]": isActive,
                      })}
                    >
                      <div className=" relative size-6  ">
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          fill
                          className={cn({ "!fill-[#33B786] ": isActive })}
                        />
                      </div>
                      <p
                        className={cn("sidebar-label", {
                          "!text-[#33B786]": isActive,
                        })}
                      >
                        {item.label}
                      </p>
                    </Link>
                  );
                })}
                USER
              </nav>
            </SheetClose>
            <Footer user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
