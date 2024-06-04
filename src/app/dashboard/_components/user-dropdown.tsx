import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuGroup,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MixerVerticalIcon, PinLeftIcon, RocketIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

type UserDropdownProps = {
 user: Session["user"];
};

export function UserDropdown({ user }: UserDropdownProps) {
 if (!user) return;
 return (
  <DropdownMenu>
   <DropdownMenuTrigger asChild>
    <Button
     variant="link"
     className="relative h-8 items-center justify-between w-full px-0 space-x-2 hover:no-underline"
     style={{ boxShadow: "none" }}
    >
     <Avatar className="h-8 w-8">
      <AvatarImage src={user.image as string} alt={user.name as string} />
      <AvatarFallback>W</AvatarFallback>
     </Avatar>
     <div className="flex flex-col flex-1 text-left space-y-1">
      {user.name && <p className="text-sm font-medium leading-none">{user.name}</p>}
      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
     </div>
    </Button>
   </DropdownMenuTrigger>

   <DropdownMenuContent className="w-fit" align="start" forceMount>
    <DropdownMenuLabel className="font-normal">
     <div className="flex flex-col space-y-1">
      {user.name && <p className="text-sm font-medium leading-none">{user.name}</p>}
      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
     </div>
    </DropdownMenuLabel>

    <DropdownMenuSeparator />

    <DropdownMenuGroup>
     <DropdownMenuItem>
      <Link href="#" className="flex items-center w-full">
       <MixerVerticalIcon className="w-3 h-3 mr-3" />
       Configurações
      </Link>
     </DropdownMenuItem>

     <DropdownMenuItem>
      <Link href="#" className="flex items-center w-full">
       <RocketIcon className="w-3 h-3 mr-3" />
       Upgrade
      </Link>
     </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => signOut()}>
     <Link href="#" className="flex items-center w-full">
      <PinLeftIcon className="w-3 h-3 mr-3" />
      Log out
     </Link>
    </DropdownMenuItem>
   </DropdownMenuContent>
  </DropdownMenu>
 );
}
