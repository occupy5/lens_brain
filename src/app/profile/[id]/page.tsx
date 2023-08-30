"use client";

import { Profile } from "@/components/ui/profile";
import { ProfileId } from "@lens-protocol/react-web";
import { useParams } from "next/navigation";

const ProfilePage = () => {
  const id = useParams();
  return (
    <div className="flex flex-col gap-4 border container p-8 rounded-sm mx-auto bg-card text-card-foreground shadow-md">
      <Profile handle={id?.id.toString()} />
    </div>
  )
};

export default ProfilePage;
