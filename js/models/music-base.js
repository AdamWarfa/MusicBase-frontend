import { Artist, Album, Track } from "./classes.js";
import { endpoint } from "../main.js";

class MusicBase {
  constructor() {
    this.albumList = [];
    this.artistList = [];
    this.trackList = [];
  }

  async buildArtistList() {
    const fetchedArtistList = await this.getList(`${endpoint}/artists`);
    for (let artist of fetchedArtistList) {
      const newArtist = new Artist(artist.artistName, artist.id, artist.artistImage, artist.shortDescription);
      this.artistList.push(newArtist);
      await newArtist.setAlbums(artist.id);
    }
    console.log(this.artistList);
  }

  async buildAlbumList() {
    const fetchedAlbumList = await this.getList(`${endpoint}/albums`);
    for (let album of fetchedAlbumList) {
      const newAlbum = new Album(album.albumTitle, album.id, album.albumCover, album.yearPublished, album.tracks);
      this.albumList.push(newAlbum);
      await newAlbum.setTracks();
    }
    console.log(this.albumList);
  }

  async buildTrackList() {
    const fetchedTrackList = await this.getList(`${endpoint}/tracks`);
    for (let track of fetchedTrackList) {
      const newTrack = new Track(track.trackName, track.id);

      this.trackList.push(newTrack);
    }
    console.log(this.trackList);
  }

  async getList(endpointValue) {
    const res = await fetch(endpointValue);
    const data = await res.json();
    return data;
  }
}

export { MusicBase };
