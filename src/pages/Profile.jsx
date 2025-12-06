import React from "react";
import ProfileNav from "../components/ProfileNav";

export default function Profile() {
  return (
    <div className="flex">
      <ProfileNav />
      <div className="flex items-center justify-center w-full bg-[#F1F3F4]">
        Ushbu sahifa tez orada ishga tushadi
      </div>
    </div>
  );
}
