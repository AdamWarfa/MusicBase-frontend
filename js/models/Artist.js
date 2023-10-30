import { musicBase } from "../controller/Controller.js";
import { endpoint } from "../controller/Controller.js";

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

export { Artist };
