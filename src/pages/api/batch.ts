import { NextRequest } from "next/server";
import client from "@/lib/graphql";
import { FETCH_HANDLE_MOST_COMMENTS } from "@/queries/Profile";
import { sql } from "@vercel/postgres";

export const config = {
  runtime: 'edge',
}

export const fetchHandleByPopular = async () => {
  return client.request<{ exploreProfiles: { items: { handle: string, bio: string | null }[] } }>(FETCH_HANDLE_MOST_COMMENTS, {
    request: { limit: 50, sortCriteria: 'MOST_PUBLICATION' },
  }).then((data) => data.exploreProfiles.items)
}

export default async function handler(req: NextRequest) {
  

  const handles = await fetchHandleByPopular();
  console.log(handles)
  if(handles) {
    for (const item of handles) {
      await sql`INSERT INTO users (handle, attendee, description) VALUES (${item.handle.toLowerCase()}, true, ${item.bio === null ? '' : item.bio})`
    }
  }

  return new Response(
    JSON.stringify({
      response: 'ok',
      handles,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}
