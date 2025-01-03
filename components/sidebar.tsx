"use client";
import { sidebarLinks } from "@/constants/index";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./homefooter";

declare interface User {
  email: string;
  passWord: string;
  // Add other properties as needed
}

declare interface SiderbarProps {
  user: User;
}

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="mb-12 cursor-pointer items-center gap-2 flex"
        >
          <Image
            src="/logo.png"
            width={140}
            height={140}
            alt="Horizon logo"
            className=" "
          />
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link", { "text-[#33B786]": isActive })}
            >
              <div className=" relative size-6  ">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({ "!fill-[#33B786] ": isActive })}
                />
                
              </div>
              <p className={cn("sidebar-label", { "!text-[#33B786]": isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}
        USER
      </nav>
      <Footer user={user} type="desktop"/>
    </section>
  );
};

export default Sidebar;
