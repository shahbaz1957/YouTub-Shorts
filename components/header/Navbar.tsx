import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "../ui/ModeToggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

function Navbar() {
  return (
    <div className="flex items-center h-14 justify-between">
      <div className="text-2xl font-bold">
        <h1 className="cursor-pointer">
          YT<span className="text-red-600 ">Shotrs</span>
        </h1>
      </div>

      {/* serch box  */}
      <div className="w-1/2">
        <Input type="text" placeholder="Search....."></Input>
      </div>
      {/* Account Management */}

      <div className="flex flex-row ">
        <Link href="/upload">
          <Button className="mr-2 hover:bg-indigo-200">
            <Plus />
            Create
          </Button>
        </Link>

        <header className="flex gap-2">
           <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>

        <div className="ml-2 cursor-pointer">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
