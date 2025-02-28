import Sidebar from "@/components/sidebar";
import Image from "next/image";
import MobileNav from "@/components/mobileNav";
import { getLoggedInUser } from "@/lib/user.action";
import { redirect } from "next/navigation";
import ProfileInfo from "@/components/profileInfo";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect("/log-in");
  return (
    <main className=" flex h-screen w-full">
      <Sidebar user={loggedIn?.name || "Guest"} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <div className="">
            <ProfileInfo type="default" user={loggedIn || {}} />
          </div>
         

          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
