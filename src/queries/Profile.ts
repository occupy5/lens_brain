import { gql } from 'graphql-request'

export const FETCH_PROFILE = gql`
query Profile($request: SingleProfileQueryRequest!) {
  profile(request: $request) {
    id
    handle
    name
    ownedBy
    bio
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalCollects
    }
  }
}`

export const FETCH_HANDLE_BY_ADDRESS = gql`
query Profiles($request: ProfileQueryRequest!) {
  profiles(request: $request) {
    items {
      handle
      bio
      interests
    }
    pageInfo {
      prev
      next
    }
  }
}
`
export const FETCH_HANDLE_MOST_COMMENTS = gql`
query exploreProfiles($request: ExploreProfilesRequest!) {
  exploreProfiles(request: $request) {
    items {
      handle
      bio
      interests
    }
    pageInfo {
      prev
      next
    }
  }
}
`

export type Profile = {
  profile: {
    id: string,
    ownedBy: string,
    name: string,
    followNftAddress: string
    bio: string,
    stats: Record<string, number>,
  }
}