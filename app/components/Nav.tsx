"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeSelector from "./ThemeSelector";

const Nav = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div className="font-serif top-0 w-full flex flex-col px-4 mx-auto md:justify-between lg:flex-row lg:px-8">
      <div className="flex flex-row items-center justify-between p-4 ">
        <Link
          href="/"
          className="font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-widest focus:outline-none focus:shadow-outline hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-400"
        >
          Police Officer Employment History
        </Link>
        <button
          className="text-white cursor-pointer px-3 py-1 lg:hidden "
          type="button"
          aria-label="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu stroke-slate-800 dark:stroke-white"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
      <div
        className={
          "lg:flex items-center space-x-6 p-4" +
          (navbarOpen ? " flex" : " hidden")
        }
      >
        <nav className="flex-grow ">
          <ul className="flex justify-end flex-wrap items-center">
            <li>
              <Link
                href="/about"
                className="font-medium hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-400 px-5 py-3 flex items-center transition duration-150 ease-in-out"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="font-medium hover:text-slate-600 dark:text-gray-200 dark:hover:text-gray-400 px-5 py-3 flex items-center transition duration-150 ease-in-out"
              >
                Contact
              </Link>
            </li>
            <li className="cursor-pointer hover:text-slate-600 dark:text-gray-200 dark:hover:text-gray-400 px-5 py-3 flex items-center transition duration-150 ease-in-out">
              <ThemeSelector />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
