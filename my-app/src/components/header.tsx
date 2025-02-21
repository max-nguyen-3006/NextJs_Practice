import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
export default function Header() {
  return (
    <div className="flex justify-between">
      <ul className="flex justify-center">
        <li className="mr-6">
          <Link href="/login"> Login </Link>
        </li>
        <li>
          <Link href="/register"> Register </Link>
        </li>
      </ul>

      <ModeToggle />
    </div>
  );
}
