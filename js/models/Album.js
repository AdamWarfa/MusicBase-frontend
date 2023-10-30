import { musicBase } from "../controller/Controller.js";
import { endpoint } from "../controller/Controller.js";

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

export { Album };
