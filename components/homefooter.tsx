import Link from "next/link";
import React from "react";
import { MoveLeft } from "lucide-react";
import { logoutAccount } from "@/lib/user.action";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      await logoutAccount();
      router.push("/log-in");
    } catch (error) {
      // Handle error
      console.error("Logout failed:", error);
    }
  };
  return (
    <footer className="footer">
      <div  className="flex gap-5 ">
        <MoveLeft  onClick={handleLogOut} />
        <p>Logout</p>
      </div>
    </footer>
  );
};

export default Footer;
