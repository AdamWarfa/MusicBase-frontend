import { musicBase } from "./main.js";
import { endpoint } from "./main.js";

class Artist {
  constructor(name, id, image, shortDescription) {
    this.name = name;
    this.artistId = id;
    this.artistImage = image;
    this.shortDescription = shortDescription;
    this.albums;
  }

  async addArtistsToAlbums(artistId) {
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
  async addTracksToAlbum() {
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

class MusicBase {
  constructor() {
    this.albumList = [];
    this.artistList = [];
    this.trackList = [];
  }
  async getList(endpointValue) {
    const res = await fetch(endpointValue);
    const data = await res.json();
    return data;
  }

  async createArtist(name, image, shortDescription) {
    const newArtist = {
      artistName: name,
      artistImage: image,
      shortDescription: shortDescription,
    };
    const json = JSON.stringify(newArtist);

    const response = await fetch(`${endpoint}/artists.json`, {
      method: "POST",
      body: json,
    });

    return response;
  }

  async createAlbum(name, image, yearPublished) {
    const newAlbum = {
      albumTitle: name,
      albumCover: image,
      yearPublished: yearPublished,
    };
    const json = JSON.stringify(newAlbum);

    const response = await fetch(`${endpoint}/albums.json`, {
      method: "POST",
      body: json,
    });

    return response;
  }

  async createTrack(name) {
    const newTrack = {
      trackName: name,
    };
    const json = JSON.stringify(newTrack);

    const response = await fetch(`${endpoint}/tracks.json`, {
      method: "POST",
      body: json,
    });

    return response;
  }

  async deleteArtist(id) {
    const response = await fetch(`${endpoint}/artists/${id}.json`, {
      method: "DELETE",
    });
    return response;
  }

  async deleteAlbum(id) {
    const response = await fetch(`${endpoint}/albums/${id}.json`, {
      method: "DELETE",
    });
    return response;
  }

  async deleteTrack(id) {
    const response = await fetch(`${endpoint}/tracks/${id}.json`, {
      method: "DELETE",
    });
    return response;
  }

  async updateArtist(id, name, image, shortDescription) {
    const newArtist = {
      id: id,
      artistName: name,
      artistImage: image,
      shortDescription: shortDescription,
    };
    const json = JSON.stringify(newArtist);

    const response = await fetch(`${endpoint}/artists/${id}.json`, {
      method: "PUT",
      body: json,
    });

    return response;
  }

  async updateAlbum(id, name, image, yearPublished) {
    const newAlbum = {
      id: id,
      albumTitle: name,
      albumCover: image,
      yearPublished: yearPublished,
    };
    const json = JSON.stringify(newAlbum);

    const response = await fetch(`${endpoint}/albums/${id}.json`, {
      method: "PUT",
      body: json,
    });

    return response;
  }

  async updateTrack(id, name) {
    const newTrack = {
      id: id,
      trackName: name,
    };
    const json = JSON.stringify(newTrack);

    const response = await fetch(`${endpoint}/tracks/${id}.json`, {
      method: "PUT",
      body: json,
    });

    return response;
  }
}

export { Artist, Album, Track, MusicBase };
