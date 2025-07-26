"use client";
import React, { useState } from "react";
import MaxWidth from "../templates/max-width";
import { Button } from "../ui/button";
import { LogOut, LogIn, Menu, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAuthContext } from "../templates/providers";
import { useForm } from "react-hook-form";
import authService from "@/appwrite/auth/auth";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

function Navbar() {
  const { isLoggedIn: isAuthenticated, dispatchAuth, roles } = useAuthContext();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const handleLogout = async () => {
    if (!dispatchAuth) {
      return toast.error("Error logging out");
    }
    try {
      await authService.logout();
      dispatchAuth({
        isLoggedIn: false,
        roles: null,
        username: null,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Error logging out");
    }
  };
  const pathname = usePathname();
  // Role based dahboard path
  const dashboardPath = !isAuthenticated
    ? "/"
    : `/dashboard/${roles ? roles[0] : "user"}`;
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
              <Link href={dashboardPath}>
                <Button
                  className={cn("", {
                    "bg-green-100": pathname.includes("/dashboard"),
                  })}
                  variant="link"
                >
                  Dashboard
                </Button>
              </Link>
              <Button
                onClick={handleSubmit(handleLogout)}
                className="cursor-pointer"
              >
                Sign Out <LogOut />
              </Button>
            </>
          ) : (
            <>
              <Link href={"/#services"}>
                <Button variant="link">Services</Button>
              </Link>
              <Link href={"/#about"}>
                <Button variant="link">About Us</Button>
              </Link>
              <Link href={"/#contact"}>
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
              className={cn(
                `absolute inset-x-0 top-14 max-w-screen  overflow-hidden`,
                {
                  hidden: !isHamburgerOpen,
                }
              )}
            >
              <div
                className=" 
               gap-2 sm:gap-3 items-center flex flex-col  bg-white pb-2 border-b border-gray-300 "
              >
                {isAuthenticated ? (
                  <>
                    <Link href={dashboardPath}>
                      <Button variant="link">Dashboard</Button>
                    </Link>
                    <Button
                      onClick={handleSubmit(handleLogout)}
                      className="cursor-pointer w-32"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          Sign Out <LogOut />
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href={"/#services"}>
                      <Button variant="link">Services</Button>
                    </Link>
                    <Link href={"/#about"}>
                      <Button variant="link">About Us</Button>
                    </Link>
                    <Link href={"/#contact"}>
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
