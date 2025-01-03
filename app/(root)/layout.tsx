import Sidebar from "@/components/sidebar";
import Image from "next/image";
import MobileNav from "@/components/mobileNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const loggedIn = { firstName: "Adrian", lastName:"JSM"}
  return (
    <main className=" flex h-screen w-full">
      <Sidebar user={loggedIn} />
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