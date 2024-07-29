"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Car, CircleUserRound, LogOut, Settings } from "lucide-react";
import { useGetProfileQuery, useLogoutMutation } from "@/graphql/generated/schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loader from "./ui/loader";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const { data, loading, error } = useGetProfileQuery({
    onCompleted: (data) => {
      setAuthenticated(!!data.getProfile.id);
    },
  });
  const [logout] = useLogoutMutation();

  const signOut = async () => {
    try {
      const { data, errors } = await logout();
      if (data?.logout.success && !errors) {
        router.push("/authenticate");
      } else {
        toast.error(`Cannot sign out: ${data?.logout.message}`);
        console.error(`Cannot logout: ${errors}`);
      }
    } catch (e) {
      toast.error(`Something wrong with logout`);
      console.error(`Cannot logout: ${(e as Error).message}`);
    } finally {
      setAuthenticated(false);
    }
  };
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Car />
          <span className="font-bold">Car-en-bar</span>
        </Link>
        <nav className="items-center gap-6 text-sm font-medium flex">
          <Link href="/carpool" className="text-muted-foreground hover:text-foreground">
            Carpool
          </Link>
          <Link href="/bus" className="text-muted-foreground hover:text-foreground">
            Bus
          </Link>
        </nav>
        {loading ? (
          <Loader />
        ) : authenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="pt-2">
              <h3 className="mx-auto p-2 font-semibold">
                Welcome {data?.getProfile.username ? data?.getProfile.username : "Unknown"} !
              </h3>
              <DropdownMenuItem>
                <Link href={`/profile/${data?.getProfile.id}`} className="flex items-center gap-2">
                  <CircleUserRound size={15} />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/profile/${data?.getProfile.id}/settings`} className="flex items-center gap-2">
                  <Settings size={15} />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button onClick={signOut} className="flex items-center gap-2">
                  <span>Sign out</span>
                  <LogOut size={15} />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/authenticate"}>Login / Register</Link>
        )}
      </div>
    </header>
  );
}
