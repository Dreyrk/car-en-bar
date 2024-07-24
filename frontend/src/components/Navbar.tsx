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
import { Car } from "lucide-react";

export default function Navbar() {
  const currentProfile = false;
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
        {currentProfile ? (
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
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/profile" className="flex items-center gap-2">
                  <div className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile/id/settings" className="flex items-center gap-2">
                  <div className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/" className="flex items-center gap-2">
                  <div className="h-4 w-4" />
                  <span>Sign out</span>
                </Link>
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
