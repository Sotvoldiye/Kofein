import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from './ui/button';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "./ui/avatar";
import { Link } from 'react-router-dom';

export default function TopNavbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <input
        type="text"
        placeholder="Qidirish..."
        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 "
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="white"
            className="relative h-12 px-4 rounded-xl  transition-all hover:bg-none group ring:outline-0"
          >
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-gray-900">
                  {user?.name} {user?.surename}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {user?.position || "Xodim"}
                </p>
              </div>

              <Avatar className="h-10 w-10 ring-2 ring-green-600 group-hover:bg-green-300">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-green-600 text-white font-bold">
                  {user?.name?.[0]}{user?.surename?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </Button>
        </DropdownMenuTrigger>

        {/* MUHIM QISM – tugma chap chetidan boshlanadi, o‘ngga o‘tmaydi */}
        <DropdownMenuContent
          side="bottom"
          align="end"                    // chap tomonga hizalash
          alignOffset={0}                // tugma ichidagi paddingni hisobga olib, aniq chap chetga
          sideOffset={8}                   // tugmadan biroz pastga
          className="w-64 origin-top-left bg-white border border-gray-200 rounded-2xl shadow-2xl 
                     data-[state=open]:animate-in data-[state=closed]:animate-out
                     data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
                     data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
                     data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top-4
                     duration-200 ease-out "
        >


          {/* Menyu itemlar */}
          <div className="">
            <Link to="/profile" className="cursor-pointer transition-colors font-medium text-[15px] px-2 flex gap-2 items-center py-1">
             <i className='fa-regular fa-user'></i> Profil
            </Link>
            <div className="cursor-pointer transition-colors font-medium text-[15px] px-2 flex gap-2 items-center pb-2">
             <i class="fa-solid fa-gear"></i> Sozlamalar
            </div>
            <div className="text-red-600 cursor-pointer transition-colors font-medium text-[15px]  border-t px-2 flex gap-2 items-center py-2"
                 onClick={() => {
                   localStorage.removeItem("user");
                   window.location.href = "/login";
                 }}>
              <i class="fa-solid fa-arrow-right-from-bracket"></i> Chiqish
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      
    </div>
  );
}