import Sidebar from "@/components/sidebar";
import Image from "next/image";
import MobileNav from "@/components/mobileNav";
import { getLoggedInUser } from "@/lib/user.action";
import { redirect } from "next/navigation";

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
          <Image src="/logo.png" width={140} height={140} alt="menu icon" />

          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
