"use strict";

//Importering af funktioner/variable
import { TrackRenderer } from "./track-renderer.js";
import { ArtistRenderer } from "./artist-renderer.js";
import { AlbumRenderer } from "./album-renderer.js";
import ListRenderer from "./list-renderer.js";
// import { ItemRenderer } from "./itemrenderer.js";
import { Artist, Album, Track, MusicBase } from "./classes.js";

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
  await buildArtistList();
  await buildAlbumList();
  await buildTrackList();
  globalListeners();

  //Viser listen grafisk
  // updateGrid();

  // Vores MusicBase dele hedder trackList osv, og det gør vores kald til ListRenderer også. Ku være vi sku rename vores brug af ListRenderer til
  // noget andet som fx... ??
  trackList = new ListRenderer(
    musicBase.trackList,
    "#tracks-grid-container",
    TrackRenderer
  );
  trackList.render();

  artistList = new ListRenderer(
    musicBase.artistList,
    "#artists-grid-container",
    ArtistRenderer
  );
  artistList.render();

  albumList = new ListRenderer(
    musicBase.albumList,
    "#albums-grid-container",
    AlbumRenderer
  );
  albumList.render();
}

async function buildArtistList() {
  const fetchedArtistList = await musicBase.getList(`${endpoint}/artists`);
  for (let artist of fetchedArtistList) {
    const newArtist = new Artist(
      artist.artistName,
      artist.id,
      artist.artistImage,
      artist.shortDescription
    );
    musicBase.artistList.push(newArtist);
  }
}

async function buildAlbumList() {
  const fetchedAlbumList = await musicBase.getList(`${endpoint}/albums`);
  for (let album of fetchedAlbumList) {
    const newAlbum = new Album(
      album.albumTitle,
      album.id,
      album.albumCover,
      album.yearPublished,
      album.tracks
    );
    musicBase.albumList.push(newAlbum);
  }
}
async function buildTrackList() {
  const fetchedTrackList = await musicBase.getList(`${endpoint}/tracks`);
  for (let track of fetchedTrackList) {
    const newTrack = new Track(track.trackName, track.id);

    musicBase.trackList.push(newTrack);
  }
}

//EventListeners
function globalListeners() {
  document
    .querySelector("#input-search")
    .addEventListener("keyup", search_data);

  document.querySelector("#sort-select").addEventListener("change", () => {
    let sortValue = document.querySelector("#sort-select").value;
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
}

function search_data() {
  // search INPUT string
  const searchInput = document.querySelector("#input-search").value;
  // make Regular Expression search VALUE - i for case insensetiv
  const searchValue = new RegExp(`${searchInput}`, "i");

  // ------------ SEARCH WITH .FILTER() FROM GLOBAL ARRAY items[] -----------------
  const search_results_track = musicBase.trackList.filter((track) =>
    search_item(track)
  );
  const search_results_artist = musicBase.artistList.filter((artist) =>
    search_item(artist)
  );
  const search_results_album = musicBase.albumList.filter((album) =>
    search_item(album)
  );

  // search through json object properties
  function search_item(dataItem) {
    for (let key in dataItem) {
      if (searchValue.test(dataItem[key])) {
        return dataItem;
      }
    }
  }
  // SHOW search result if any
  if (search_results_track.length > 0) {
    trackList.items = search_results_track;
    trackList.render();
  }
  if (search_results_artist.length > 0) {
    artistList.items = search_results_artist;
    artistList.render();
  }
  if (search_results_album.length > 0) {
    albumList.items = search_results_album;
    albumList.render();
  } else {
    console.log("no results");
  }
}

export default endpoint;
