// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createAlbum = `mutation CreateAlbum($input: CreateAlbumInput!) {
  createAlbum(input: $input) {
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
export const updateAlbum = `mutation UpdateAlbum($input: UpdateAlbumInput!) {
  updateAlbum(input: $input) {
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
export const deleteAlbum = `mutation DeleteAlbum($input: DeleteAlbumInput!) {
  deleteAlbum(input: $input) {
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
