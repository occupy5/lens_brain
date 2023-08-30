import { Profile } from "@lens-protocol/react-web";
import Image from "next/image";

const ProfileBio = ({ profile }: { profile: Profile }) => {
  return (
    <div className="flex flex-col">
      <div className="text-xl bold">{profile.name}</div>
      <div className="text-gray-600 mt-6">{profile.bio}</div>
    </div>
  );
};

export { ProfileBio };
