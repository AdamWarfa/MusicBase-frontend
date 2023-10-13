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

export { MusicBase };
