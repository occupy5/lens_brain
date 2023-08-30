"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEventHandler, useCallback, useState } from "react";
import { LucideLoader } from "lucide-react";
import { extractLens } from "@/lib/utils";
import Link from "next/link";
import useSWR, { Fetcher } from "swr";

const EXAMPLE_PROMPTS = [
  "I want to find a partner who is skilled in VR creation",
  "Help me recommend a product manager who focuses on the DEFI field",
  "Who is paying attention to the combination of Web3 and music?"
];

const fetcher: Fetcher<{ handle: string }[], string> = async (...args) => {
  const res = await fetch(...args).then((res) => res.json());
  return res.users;
};

export default function Home() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // const { data: attendees } = useSWR("/api/attendees", fetcher);

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
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue]
  );

  return (
    <div className="flex flex-1 h-full flex-col items-center gap-8">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full md:w-2/4">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="text-2xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-violet-500">
              Lens Brain
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 pt-0">
          <div className="flex flex-row gap-4">
            <Input
              placeholder="Asking..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              name="query"
            />
            <Button
              size="lg"
              className="gap-2 flex flex-row"
              disabled={isLoading}
            >
              {isLoading && <LucideLoader size={24} className="animate-spin" />}
              Explore
            </Button>
          </div>
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
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full md:w-2/4">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-lg font-semibold leading-none tracking-tight">
              For you
            </h3>
            {/* <p className="text-sm text-muted-foreground">
            </p> */}
          </div>
          <div className="flex flex-row gap-4 p-6 pt-0">
          <Link
            href={`/profile/${extractLens(response)}`}
            
          >
            <p className="text-sm">{response}</p>
          </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
