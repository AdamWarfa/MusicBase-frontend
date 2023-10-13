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
  // console.log(artists);
  // console.log(tracks);
  // console.log(albums);
  globalListeners();

  //Viser listen grafisk
  // updateGrid();

  // Vores MusicBase dele hedder trackList osv, og det gør vores kald til ListRenderer også. Ku være vi sku rename vores brug af ListRenderer til
  // noget andet som fx... ??
  trackList = new ListRenderer(musicBase.trackList, "#tracks-grid-container", TrackRenderer);
  trackList.render();

  artistList = new ListRenderer(musicBase.artistList, "#artists-grid-container", ArtistRenderer);
  artistList.render();

  albumList = new ListRenderer(musicBase.albumList, "#albums-grid-container", AlbumRenderer);
  albumList.render();
}

async function buildArtistList() {
  const fetchedArtistList = await musicBase.getList(`${endpoint}/artists`);
  for (let artist of fetchedArtistList) {
    const newArtist = new Artist(artist.artistName, artist.id, artist.artistImage, artist.shortDescription);
    console.log(musicBase.artistList);
    musicBase.artistList.push(newArtist);
  }
}

async function buildAlbumList() {
  const fetchedAlbumList = await musicBase.getList(`${endpoint}/albums`);
  for (let album of fetchedAlbumList) {
    const newAlbum = new Album(album.albumTitle, album.id, album.albumCover, album.yearPublished, album.tracks);
    musicBase.albumList.push(newAlbum);
  }
  console.log(musicBase.albumList);
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
  document.querySelector("#input-search").addEventListener("keyup", (event) => searchAll(event.target.value));
  document.querySelector("#create-track-btn").addEventListener("click", createTrackClicked);

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
}

function searchAll(eventValue) {
  const keysSomeArtist = ["artistName", "shortDescription"];
  const keysSomeAlbums = ["albumTitle"];
  const keysSomeTracks = ["trackName"];
  const valuesSome = [eventValue];

  const resultSomeArtists = musicBase.artistList.filter((artist) => keysSomeArtist.some((key) => valuesSome.some((searchValue) => artist[key].toLowerCase().includes(searchValue.toLowerCase()))));
  const resultSomeAlbums = musicBase.albumList.filter((album) => keysSomeAlbums.some((key) => valuesSome.some((searchValue) => album[key].toLowerCase().includes(searchValue.toLowerCase()))));
  const resultSomeTracks = musicBase.trackList.filter((track) => keysSomeTracks.some((key) => valuesSome.some((searchValue) => track[key].toLowerCase().includes(searchValue.toLowerCase()))));
  trackList.render(resultSomeTracks);
  artistList.render(resultSomeArtists);
  albumList.render(resultSomeAlbums);
}

function createTrackClicked() {
  document.querySelector("#div-create-track").innerHTML = "";
  document.querySelector("#dialog-create-track").showModal();
  document.querySelector("#div-create-track").insertAdjacentHTML(
    "beforeend" /*HTML*/,
    `
    <h2>Create Track</h2>
    <form action="" method="POST" id="form-create-track">
    <select id="create-track-user-select"></select>
    <button id="submit-create-track-btn" type="submit">Add</button>
    <button id="cancel-create-track-btn" type="button">Cancel</button>
    </form>
    `
  );

  artistList.items.forEach((item) => {
    document.querySelector("#create-track-user-select").insertAdjacentHTML("beforeend" /*HTML*/, `<option value="${item.id}">${item.name}</option>`);
  });
  document.querySelector("#form-create-track").insertAdjacentHTML("beforeend" /*HTML*/, `<input type="text" name="trackName" id="input-track-name" placeholder="Track Name" required>`);
  document.querySelector("#cancel-create-track-btn").addEventListener("click", closeDialog);
}

function closeDialog() {
  // Lukker dialog, fjerner formørkelse
  document.querySelector("#dialog-create-track").close();
}

export default endpoint;
