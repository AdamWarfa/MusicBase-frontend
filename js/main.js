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
let renderedTracks;
let renderedArtists;
let renderedAlbums;

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
  renderedTracks = new ListRenderer(musicBase.trackList, "#tracks-grid-container", TrackRenderer);
  renderedTracks.render();

  renderedArtists = new ListRenderer(musicBase.artistList, "#artists-grid-container", ArtistRenderer);
  renderedArtists.render();

  renderedAlbums = new ListRenderer(musicBase.albumList, "#albums-grid-container", AlbumRenderer);
  renderedAlbums.render();
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
      renderedAlbums.sort(sortBy, sortDir);
      renderedArtists.sort(sortBy, sortDir);
      renderedTracks.sort(sortBy, sortDir);
    } else if (sortValue == "reverse") {
      let sortBy = "name";
      let sortDir = "desc";
      renderedAlbums.sort(sortBy, sortDir);
      renderedArtists.sort(sortBy, sortDir);
      renderedTracks.sort(sortBy, sortDir);
    }
  });

  //Søgefunktion
  document.querySelector("#input-search").addEventListener("input", (event) => {
    const searchValue = event.target.value;

    renderedTracks.filter("name", searchValue);

    renderedAlbums.filter("name", searchValue);

    renderedArtists.filter("name", searchValue);
  });
}

export { musicBase, endpoint, renderedTracks as trackList, renderedArtists as artistList, renderedAlbums as albumList };
