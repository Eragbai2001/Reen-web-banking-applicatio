// import { logoutAccount } from "@/lib/actions/user.action";

import Link from "next/link";
// import { useRouter } from "next/navigation";
import React from "react";
import { MoveLeft } from "lucide-react";
import { logoutAccount } from "@/lib/user.action";
import { useRouter } from "next/navigation";

declare interface FooterProps {
  user: User;
  type: "mobile" | "desktop";
}

const Footer = ({ type = "desktop" }: FooterProps) => {
  const router = useRouter();
  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();

    if (loggedOut) router.push("/log-in");
  };
  // const router = useRouter();
  // const handleLogOut = async () => {
  //  const loogedOut = await logoutAccount();

  //  if(loogedOut) router.push("/sign-in")
  // }
  return (
    <footer className="footer">
      <Link href="/logout" className="flex gap-5">
        <MoveLeft onClick={handleLogOut} />
        <p>Logout</p>
      </Link>
    </footer>
  );
};

export default Footer;
