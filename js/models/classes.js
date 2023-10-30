import { musicBase } from "../main.js";
import { endpoint } from "../main.js";

class Artist {
  constructor(name, id, image, shortDescription) {
    this.name = name;
    this.artistId = id;
    this.artistImage = image;
    this.shortDescription = shortDescription;
    this.albums;
  }

  getAlbums() {
    return this.albums;
  }

  async setAlbums(artistId) {
    const fetchedList = await musicBase.getList(`${endpoint}/artists/${artistId}/albums`);

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
  constructor(name, id, cover, yearPublished, oldTracks) {
    this.name = name;
    this.albumId = id;
    this.albumCover = cover;
    this.yearPublished = yearPublished;
    this.tracks = oldTracks;
  }

  get Tracks() {
    return this.tracks;
  }

  setTracks() {
    const trackIdList = this.findTrackId(this.tracks);
    const trackByAlbumList = [];
    for (const trackId of trackIdList) {
      const foundTrack = musicBase.trackList.find((track) => track.trackId == trackId);
      trackByAlbumList.push(foundTrack);
    }

    this.tracks = trackByAlbumList;
  }

  findTrackId(albumTrackList) {
    const trackIdList = [];
    for (let item of albumTrackList) {
      const trackId = item.trackId;
      trackIdList.push(trackId);
    }
    return trackIdList;
  }

  getArtistId() {
    const artist = musicBase.artistList.find((artist) => artist.albums.includes(this));
    return artist.artistId;
  }

  setArtistId(artistId) {
    this.artistId = artistId;
  }
}

class Track {
  constructor(name, id) {
    this.name = name;
    this.trackId = id;
  }

  getAlbumId() {
    try {
      const album = musicBase.albumList.find((album) => album.tracks.includes(this));
      return album.albumId;
    } catch (error) {
      console.log("error with " + this.name);
    }
  }
  setAlbumId(albumId) {
    this.albumId = albumId;
  }
}

export { Artist, Album, Track };
