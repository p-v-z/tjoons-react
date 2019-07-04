// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateAlbum = `subscription OnCreateAlbum {
  onCreateAlbum {
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
export const onUpdateAlbum = `subscription OnUpdateAlbum {
  onUpdateAlbum {
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
export const onDeleteAlbum = `subscription OnDeleteAlbum {
  onDeleteAlbum {
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
