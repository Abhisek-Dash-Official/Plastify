"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = ["Home", "About", "Contact", "Checkout"];

export default function Header() {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState("Home");

  useEffect(() => {
    navLinks.forEach((ele) => {
      if (pathname.toLowerCase().includes(ele.toLowerCase())) {
        setActivePage(ele);
      }
    });
  }, [pathname]);

  return (
    <header className="w-full py-4 bg-[#2f3e46] text-white shadow-md h-[85px] fixed top-0 z-50">
      <div
        className="container mx-auto flex justify-between items-center px-4"
        href="/"
      >
        <Link href="/">
          <img
            src="/img/brandLogo.png"
            alt="Plastics"
            className="w-[150px] bg-white rounded-full"
          />
        </Link>

        <nav>
          <ul className="flex space-x-6 text-xl">
            {navLinks.map((link) => (
              <li key={link}>
                <Link
                  href={`/${link.toLowerCase()}`}
                  className={`hover:underline transition ${
                    activePage === link ? "text-yellow-400" : ""
                  }`}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
