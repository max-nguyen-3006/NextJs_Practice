import React from "react";
import { cookies } from "next/headers";
import Profile from "@/app/me/profile";
import accountApiRequest from "@/app/apiRequests/account";
export default async function MeProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");

  console.log("MeProfile ---");
  
  console.log(sessionToken);
  
  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  return (
    <div>
      <h1> Profile</h1>
      <h2>{result.payload.data.name}</h2>
      <h2>{result.payload.data.email}</h2>
      <Profile />
    </div>
  );
}
