import React from "react";
import envConfig from "@/config";
import { cookies } from "next/headers";
import Profile from "@/app/me/profile";
export default async function MeProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  console.log(sessionToken);
  
  const result = await fetch(
    `${envConfig?.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        //Cookie: `sessionToken=${sessionToken?.value}`,
         Authorization: `Bearer ${sessionToken?.value}`,
      },
      credentials: "include",
    }
  ).then(async (res) => {
    const payload = await res.json();
    const data = {
      status: res.status,
      payload,
    };
    if (!res.ok) {
      throw data;
    }
    return data;
  });
  return (
    <div>
      <h1> Profile</h1>
      <h2>{result.payload.data.name}</h2>
      <h2>{result.payload.data.email}</h2>
      <Profile />
    </div>
  );
}
