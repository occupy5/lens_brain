import { Profile } from "@lens-protocol/react-web";
import Image from "next/image";

const ProfileBio = ({ profile }: { profile: Profile }) => {
  return (
    <div className="space-y-3 lg:w-2/3">
      <div className="overflow-hidden rounded-md">
        <img alt="Thinking Components" loading="lazy" decoding="async" data-nimg="1" className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square" src={profile.picture?.original?.url} />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{profile.name}</h3>
        <p className="text-xs text-muted-foreground">{profile.bio}</p>
      </div>
    </div>
  );
};

export { ProfileBio };
