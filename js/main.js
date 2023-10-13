"use strict";

//Importering af funktioner/variable
import { TrackRenderer } from "./views/track-renderer.js";
import { ArtistRenderer } from "./views/artist-renderer.js";
import { AlbumRenderer } from "./views/album-renderer.js";
import ListRenderer from "./views/list-renderer.js";
// import { ItemRenderer } from "./itemrenderer.js";
import { MusicBase } from "./models/music-base.js";

//Kør startfunktionen automatisk på load
window.addEventListener("load", initApp);

//Globale variable
const endpoint = "https://musicbasebe.azurewebsites.net";
const musicBase = new MusicBase();
let trackList;
let artistList;
let albumList;

//Fetcher kunstnerlisten og aktivierer eventListeners
async function initApp() {
  await musicBase.buildTrackList();
  await musicBase.buildAlbumList();
  await musicBase.buildArtistList();

  for (let album of musicBase.albumList) {
    album.setArtistId(album.getArtistId());
  }

  for (let track of musicBase.trackList) {
    track.setAlbumId(track.getAlbumId());
  }

  globalListeners();

  // Vores MusicBase dele hedder trackList osv, og det gør vores kald til ListRenderer også. Ku være vi sku rename vores brug af ListRenderer til
  // noget andet som fx... ??
  trackList = new ListRenderer(musicBase.trackList, "#tracks-grid-container", TrackRenderer);
  trackList.render();

  artistList = new ListRenderer(musicBase.artistList, "#artists-grid-container", ArtistRenderer);
  artistList.render();

  albumList = new ListRenderer(musicBase.albumList, "#albums-grid-container", AlbumRenderer);
  albumList.render();
}

//EventListeners
function globalListeners() {
  //Sorteringsfunktion
  document.querySelector("#sort-select").addEventListener("change", () => {
    let sortValue = document.querySelector("#sort-select").value;
    console.log(sortValue);
    if (sortValue == "name") {
      let sortBy = "name";
      let sortDir = "asc";
      albumList.sort(sortBy, sortDir);
      artistList.sort(sortBy, sortDir);
      trackList.sort(sortBy, sortDir);
    } else if (sortValue == "reverse") {
      let sortBy = "name";
      let sortDir = "desc";
      albumList.sort(sortBy, sortDir);
      artistList.sort(sortBy, sortDir);
      trackList.sort(sortBy, sortDir);
    }
  });

  //Søgefunktion
  document.querySelector("#input-search").addEventListener("input", (event) => {
    const searchValue = event.target.value;

    trackList.filter("name", searchValue);

    albumList.filter("name", searchValue);

    artistList.filter("name", searchValue);
  });
}

export { musicBase, endpoint, trackList, artistList, albumList };
