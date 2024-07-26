import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

type UserBoxProps = {
  user: {
    id: number;
    username?: string | null;
  };
};

export default function UserBox({ user }: UserBoxProps) {
  const rating = "no rating";
  return (
    <Link href={`/user/${user.id}`} className="w-full flex justify-between items-center gap-4 px-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{"None"}</AvatarFallback>
      </Avatar>
      <div className="flex-grow flex-col flex">
        <span>{user.username}</span>
        <span>{rating}</span>
      </div>
      <Button className="my-auto hover:animate-bounce-left" variant={"ghost"}>
        <ChevronRight size={30} />
      </Button>
    </Link>
  );
}
