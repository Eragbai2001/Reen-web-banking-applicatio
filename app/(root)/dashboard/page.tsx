import React from "react";
import Navbar from "@/components/Navbar";
import { getLoggedInUser } from "@/lib/user.action";

const dashboard = async () => {
  const loggedIn = await getLoggedInUser();
  // console.log(loggedIn);

  return (
    <section className=" home">
      <Navbar type="Overview" user={loggedIn || {}} />
    </section>
  );
};

export default dashboard;
