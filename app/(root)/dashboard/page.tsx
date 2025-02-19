import React from "react";
import Navbar from "@/components/Navbar";
import { getLoggedInUser } from "@/lib/user.action";

const dashboard = async () => {
  const loggedIn = await getLoggedInUser();
  return (
    <section className=" home">
      <Navbar type="Overview" user={loggedIn?.name || "Guest"} />
    </section>
  );
};

export default dashboard;
