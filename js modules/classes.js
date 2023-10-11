import { musicBase } from "./main.js";
import { getArtists, getAlbums, getTracks, endpoint } from "./rest-services.js";

class Artist {
  constructor(name, id, image, shortDescription) {
    this.name = name;
    this.artistId = id;
    this.artistImage = image;
    this.shortDescription = shortDescription;
    this.albums;
  }
  async addArtistsToAlbums(artistId) {
    const fetchedList = await getTracks(`${endpoint}/artists/${artistId}/albums`);

    const albumIdList = this.findAlbumId(fetchedList);

    const albumByArtistList = [];
    for (const albumId of albumIdList) {
      const foundAlbum = musicBase.albumList.find((album) => album.albumId == albumId);
      albumByArtistList.push(foundAlbum);
    }
    this.albums = albumByArtistList;
  }

  findAlbumId(artistAlbumList) {
    const albumIdList = [];
    for (let item of artistAlbumList) {
      const albumId = item.albumId;
      albumIdList.push(albumId);
    }

    return albumIdList;
  }
}

class Album {
  constructor(name, id, cover, yearPublished, tracks) {
    this.name = name;
    this.albumId = id;
    this.albumCover = cover;
    this.yearPublished = yearPublished;
    this.tracks = tracks;
  }
}

class Track {
  constructor(name, id) {
    this.name = name;
    this.trackId = id;
    this.albumId;
  }
}

class MusicBase {
  constructor() {
    this.albumList = [];
    this.artistList = [];
    this.trackList = [];
  }
}

export { Artist, Album, Track, MusicBase };
