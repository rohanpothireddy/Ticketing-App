"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use } from "react";

const MainNavLinks = () => {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/tickets", label: "Tickets" },
    { href: "/users", label: "Users" },
  ];

  const currentPath = usePathname();

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => (
        <Link key={link.label} href={link.href} className={`navbar-link ${currentPath === link.href && "cursor-default text-primary/70 hover:text-primary/60"}`}>
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNavLinks;
