"use client";

import accountApiRequest from "@/app/apiRequests/account";
import { clientSessionToken } from "@/lib/http";

import React, { useEffect } from "react";

export default function Profile() {
  console.log("Profile");
  console.log(clientSessionToken.value);

  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.meClient();
      console.log(result);
    };
    fetchRequest();
  }, []);

  return <div>profile</div>;
}
