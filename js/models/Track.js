import { musicBase } from "../controller/Controller.js";
import { endpoint } from "../controller/Controller.js";

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

export { Track };
