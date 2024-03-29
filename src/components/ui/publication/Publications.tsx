import {
  AnyPublication,
  ProfileId,
  usePublications,
} from "@lens-protocol/react-web";
import { Publication } from "./Publication";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Repeat } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Publications = ({
  profileId,
  limit = 10,
}: {
  profileId: ProfileId;
  limit?: number;
}) => {
  const [publications, setPublications] = useState<AnyPublication[] | []>([]);
  const [hasMorePublications, setHasMorePublications] = useState(false);

  const { data, error, loading, hasMore, next } = usePublications({
    profileId,
    limit,
  });

  useEffect(() => {
    const filteredPublications = data?.filter((publication) => {
      if (publication.__typename !== "Comment") {
        return true;
      }
    });
    if (!filteredPublications) {
      return;
    }
    setPublications(filteredPublications);
    setHasMorePublications(hasMore);
  }, [data, hasMore]);

  const loadMorePublications = () => {
    next();
  };

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col gap-4 mt-10 xl:mt-0">
      <div className="mx-auto flex flex-col gap-4">
        {publications?.map((publication, index) => {
          return (
            <Link
              href={`/publication/${publication.id}`}
              key={publication.id}
              className={cn(
                index !== data.length - 1 &&
                  "border-b hover:bg-gray-100 duration-500 dark:hover:bg-gray-900",
                "py-2"
              )}
            >
              {publication.__typename === "Mirror" ? (
                <div>
                  <div className="flex flex-row gap-2 px-4">
                    <Repeat />{" "}
                    <Link href={`/profile/${publication.profile.id}`}>
                      {publication.profile.name}
                    </Link>
                    mirrored
                  </div>
                  <Publication publicationId={publication.mirrorOf.id} />
                </div>
              ) : (
                <Publication publicationId={publication.id} />
              )}
            </Link>
          );
        })}
      </div>
      {hasMore && (
        <Button onClick={loadMorePublications} variant="outline" className="center">
          Load More
        </Button>
      )}
    </div>
  );
};

export { Publications };
