class Item {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

class Artist extends Item {
  constructor(name, id, image, shortDescription) {
    super(name, id);
    (this.artistImage = image), (this.shortDescription = shortDescription);
  }
}

class Album extends Item {
  constructor(name, id, title, cover, yearPublished) {
    super(name, id);
    (this.albumTitle = title), (this.albumId = id), (this.albumCover = cover), (this.yearPublished = yearPublished);
  }
}

class Track extends Item {
  constructor(name, id) {
    super(name, id);
    (this.trackName = name), (this.trackId = id);
  }
}

class MusicBase {
  constructor() {
    this.album = [];
    this.artist = [];
    this.track = [];
  }
}
