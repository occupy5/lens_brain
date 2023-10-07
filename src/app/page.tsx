"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { useExploreProfiles, ProfileSortCriteria } from "@lens-protocol/react-web";
import { LucideLoader } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { extractLens } from "@/lib/utils";
import Link from "next/link";
import { formatHandleColors } from "@/lib/utils";

const EXAMPLE_PROMPTS = [
  "I want to find a partner who is skilled in VR creation.",
  "Help me recommend a product manager who focuses on the DEFI field.",
  "Who is paying attention to the combination of Web3 and music?"
];

export default function Home() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  let { data: profiles, loading: loadingProfiles } = useExploreProfiles({
    limit: 12,
    sortCriteria: ProfileSortCriteria.MostComments,
  }) as any


  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      try {
        setIsLoading(true);
        event.preventDefault();
        const endpoint = `/api/explore?q=${inputValue}`;

        const options = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(endpoint, options);

        const result = await response.json();
        console.log("response from server", result);
        setResponse(result.response);
      } 
      catch(error) {
        console.error("Error:", error);
      }
      finally {
        setIsLoading(false);
      }
    },
    [inputValue]
  );

  return (
    <Tabs defaultValue="recommend">
      <TabsList>
        <TabsTrigger value="recommend">Trending</TabsTrigger>
        <TabsTrigger value="explore">Explore</TabsTrigger>
      </TabsList>
      <TabsContent value="recommend">
        <div className="flex flex-1 flex-wrap">
          {
            loadingProfiles && (
              <div className="
                flex flex-1 justify-center items-center
              ">
                <LoadingSpinner></LoadingSpinner>
              </div>
            )
          }
          {
            profiles?.map((profile : any) => (
              <a
                key={profile.id}
                className="
                lg:w-1/4 sm:w-1/2 p-4 cursor-pointer"
                href={`/profile/${profile.handle}`}>
                <div className="space-y-3">
                    <div className="overflow-hidden rounded-md">
                      <img alt="Thinking Components" loading="lazy" decoding="async" data-nimg="1" className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square" src={profile.picture?.original?.url} />
                    </div>
                    <div className="space-y-1 text-sm">
                      <h3 className="font-medium leading-none">{profile.handle}</h3>
                      <p className="text-xs text-muted-foreground">{profile.name}</p>
                    </div>
                </div>
              </a>
            ))
          }
        </div>
      </TabsContent>
      <TabsContent value="explore">
        <div className="flex h-full w-full flex-col gap-8 mt-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full md:w-2/4">
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 pt-6">
              <Input
                placeholder="Asking..."
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                name="query"
              />
              <Button
                size="lg"
                className="gap-2 flex flex-row w-36"
                disabled={isLoading}
              >
                {isLoading && <LucideLoader size={18} className="animate-spin" />}
                Explore
              </Button>
              <div className="flex flex-col gap-2">
                <p className="text-sm">Examples:</p>
                {EXAMPLE_PROMPTS.map((prompt) => (
                  <p
                    key={prompt}
                    className="text-sm text-muted-foreground"
                    onClick={() => setInputValue(prompt)}
                  >
                    {prompt}
                  </p>
                ))}
              </div>
            </form>
          </div>
          {response != null ? (
            <div className="self-end rounded-lg border bg-card text-card-foreground shadow-sm w-full md:w-2/4">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="text-xl font-extrabold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-violet-500">
                    From Lens Brain:
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-4 p-6 pt-0">
              <Link
                href={`/profile/${extractLens(response)}`}
                
              >
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: formatHandleColors(response) }}></p>
              </Link>
              </div>
            </div>
          ) : null}
        </div>
      </TabsContent>
    </Tabs>
  );
}
