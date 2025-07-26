"use client";
import React, { useState } from "react";
import MaxWidth from "../templates/max-width";
import { Button } from "../ui/button";
import { Users, LogOut, LogIn, File, Menu, CrossIcon, X } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function Navbar() {
  const isAuthenticated = false;
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <header
      className={cn(
        "w-full  px-2 top-0 border-b border-gray-200 sticky z-40 bg-white/70 backdrop-blur",
        {
          "backdrop-blur-none bg-white border-none ": isHamburgerOpen,
        }
      )}
    >
      <MaxWidth className="flex w-full  justify-between px-2 sm-px-4 md:px-8 h-14 items-center">
        <Link href={"/"}>
          <div className="text-2xl font-semibold text-primary">
            m<span className="text-zinc-800">h</span>
          </div>
        </Link>
        <nav className=" gap-2 sm:gap-3 items-center hidden sm:flex">
          {isAuthenticated ? (
            <>
              <Link href={"/tickets"}>
                <Button className="" variant={"link"}>
                  <File className="h-5 w-5" />
                </Button>
              </Link>
              <Link href={"/customers"}>
                <Button variant={"link"}>
                  <Users className="h-5 w-5" />
                </Button>
              </Link>
              <Button className="cursor-pointer">
                Sign Out <LogOut />
              </Button>
            </>
          ) : (
            <>
              <Link href={"#services"}>
                <Button variant="link">Services</Button>
              </Link>
              <Link href={"#about"}>
                <Button variant="link">About Us</Button>
              </Link>
              <Link href={"#contact"}>
                <Button variant="link">Contact Us</Button>
              </Link>
              <Link href={"/login"}>
                <Button className="cursor-pointer">
                  Sign In <LogIn />
                </Button>
              </Link>
            </>
          )}
        </nav>
        {/* hamburger menu */}
        <div className="sm:hidden  z-40">
          <Button
            onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
            variant={"ghost"}
          >
            {isHamburgerOpen ? (
              <X className="h-full" />
            ) : (
              <Menu className="h-6 w-6 " />
            )}
          </Button>
          {
            <motion.nav
              initial={{
                opacity: 0,
                y: 100,
              }}
              animate={
                isHamburgerOpen
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 100,
                    }
              }
              transition={{
                duration: 0.4,
                type: "spring",
              }}
              className=" absolute inset-x-0 top-14 max-w-screen  overflow-hidden
                "
            >
              <div
                className=" 
               gap-2 sm:gap-3 items-center flex flex-col  bg-white pb-2 border-b border-gray-300 "
              >
                {isAuthenticated ? (
                  <>
                    <Link href={"/tickets"}>
                      <Button className="" variant={"link"}>
                        {" "}
                        <File className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href={"/customers"}>
                      <Button variant={"link"}>
                        {" "}
                        <Users className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Button className="cursor-pointer">
                      Sign Out <LogOut />
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href={"#services"}>
                      <Button variant="link">Services</Button>
                    </Link>
                    <Link href={"#about"}>
                      <Button variant="link">About Us</Button>
                    </Link>
                    <Link href={"#contact"}>
                      <Button variant="link">Contact Us</Button>
                    </Link>
                    <Link href={"/login"}>
                      <Button className="cursor-pointer">
                        Sign In <LogIn />
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.nav>
          }
        </div>
      </MaxWidth>
    </header>
  );
}

export default Navbar;
