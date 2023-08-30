import { ProfileId, useProfile } from "@lens-protocol/react-web";
import React from "react";
import { Publications } from "@/components/ui/publication";
import { ProfileBio } from "@/components/ui/profile";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const ProfileByHandle = ({ handle }: { handle: string }) => {
  const {
    data: profile,
    error,
    loading,
  } = useProfile({
    handle,
  });

  if (error) {
    return <div>Error</div>;
  }
  if (loading) {
    return (
      <div className="w-full flex flex-row items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col xl:flex-row rounded-lg bg-card text-card-foreground w-full p-4 mb-4">
      <div className="xl:w-1/3">
        <ProfileBio profile={profile}/>
      </div>
      <div className="xl:w-2/3">
        <Publications profileId={profile.id} />
      </div>
    </div>
  );
};

export { ProfileByHandle };
