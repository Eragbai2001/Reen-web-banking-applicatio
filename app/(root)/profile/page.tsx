import React from "react";
import Navbar from "@/components/Navbar";
import { getLoggedInUser } from "@/lib/user.action";

const page = async () => {
  const loggedIn = await getLoggedInUser();

  return <Navbar type="profile" user={loggedIn || {}} />;
};

export default page;
