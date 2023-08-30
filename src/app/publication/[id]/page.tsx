"use client";

// import CreateComment from "@/components/create/CreateComment";
import { Publication } from "@/components/ui/publication";
import { PublicationComments } from "@/components/ui/publication";
import { PublisherContext } from "@/context/ProfileContext";
import { PublicationId } from "@lens-protocol/react-web";
import { useParams } from "next/navigation";
import { useContext } from "react";

const PublicationPage = () => {
  const { profileOwnedByMe: publisher } = useContext(PublisherContext);
  const router = useParams();
  return (
    <div className="flex flex-col gap-4 container mx-auto">
      <div className="border border-1 border-gray-200 dark:border-gray-700 container mx-auto p-4 rounded-sm">
        <Publication publicationId={router?.id as PublicationId} />
      </div>
      <PublicationComments publicationId={router?.id as PublicationId} />
    </div>
  );
};

export default PublicationPage;
