
'use client'

import React from "react";
import { useRouter } from "next/navigation";

export default function ButtonRedirect() {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/login");
  };
  return (
    <div>
      {" "}
      <button onClick={handleNavigate}> Login using useRouter </button>
    </div>
  );
}
