// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($email: String!) {
  getUser(email: $email) {
    email
    username
    createdAt
    profileImageUrl
    spotifyProfile
    currentTrack
    isActive
  }
}
`;
export const listUsers = `query ListUsers(
  $email: String
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(
    email: $email
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      email
      username
      createdAt
      profileImageUrl
      spotifyProfile
      currentTrack
      isActive
    }
    nextToken
  }
}
`;
export const getAlbum = `query GetAlbum($id: ID!) {
  getAlbum(id: $id) {
    owner {
      email
      username
      createdAt
      profileImageUrl
      spotifyProfile
      currentTrack
      isActive
    }
    title
    tracks
  }
}
`;
export const listAlbums = `query ListAlbums(
  $filter: ModelAlbumFilterInput
  $limit: Int
  $nextToken: String
) {
  listAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      owner {
        email
        username
        createdAt
        profileImageUrl
        spotifyProfile
        currentTrack
        isActive
      }
      title
      tracks
    }
    nextToken
  }
}
`;
