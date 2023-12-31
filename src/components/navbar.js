"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import ThemeBtn from "./themeBtn";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Using ref and event listener to close the popup menu items when clicked elsewhere on screen
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
      setIsProfileOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen((isProfileOpen) => !isProfileOpen);
  };

  const getLinks = () => {
    return (
      <>
        {/* Public Links */}
        {/* <Link
          href="/"
          className="px-3 py-2 rounded-md text-sm font-medium hover:bg-base-300"
        >
          Home
        </Link>
        <Link
          href="/public"
          className="px-3 py-2 rounded-md text-sm font-medium hover:bg-base-300"
        >
          Public
        </Link> */}
        {/* <ThemeBtn /> */}
      </>
    );
  };

  return (
    <nav className="bg-base-100 my-2">
      {/* Desktop View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <Link href="/">
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <div className="w-8 h-8 relative">
                <Image src="/logo1.png" alt="Logo" height={28} width={28} />
              </div>
              <span className="text-2xl font-semibold mx-2 sm:hidden">CMA</span>
              <span className="hidden sm:block text-2xl font-semibold mx-2">
                Cerence Marketing Assistant
              </span>
            </div>
          </Link>

          {/* Menu Items */}
          <div ref={menuRef} className="hidden md:block">
            <div className="flex">
              <div className="ml-10 flex items-baseline space-x-4">
                {getLinks()}
              </div>

              {/* Hamburger icon and User Profile */}
              <div ref={profileRef} className="ml-4 flex items-center">
                <div className="relative">
                  {/* <div>
                    <button
                      className="max-w-xs rounded-full flex items-center text-sm m-2"
                      id="user-menu"
                      aria-haspopup="true"
                      onClick={toggleProfile}
                    >
                      <span className="sr-only">User Menu</span>
                      <BiDotsVerticalRounded size={24} />
                    </button>
                  </div> */}

                  {/* Dropdown */}
                  {isProfileOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg ring-1 ring-opacity-5 focus:outline-none bg-base-100 z-10"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <div className="py-1" role="none">
                        <a
                          className="block px-4 py-2 text-sm hover:bg-base-300 cursor-pointer"
                          role="menuitem"
                        >
                          <ThemeBtn />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu
          <div ref={menuRef} className="-mr-2 flex md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div> */}
          <ThemeBtn />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-base-100">
          <div className="flex flex-wrap px-2 gap-2 ml-3">{getLinks()}</div>
          {/* <div className="px-2 py-3">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-base-300"
            >
              <ThemeBtn />
            </a>
          </div> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
