// import { logoutAccount } from "@/lib/actions/user.action";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import React from "react";
import { MoveLeft } from 'lucide-react';


declare interface FooterProps {
  user: User;
  type: "mobile" | "desktop";
}
interface User {
  passWord: string;
  email: string;
  // Add other properties as needed
}

const Footer = ({ user, type = "desktop" }: FooterProps) => {

  // const router = useRouter();
  // const handleLogOut = async () => {
  //  const loogedOut = await logoutAccount();

  //  if(loogedOut) router.push("/sign-in")
  // }
  return (
    <footer className="footer">
      <Link href="/logout" className="flex gap-5">
      <MoveLeft />
       <p>
        Logout
       </p>
      </Link>

    </footer>
  );
};

export default Footer;


