"use strict";

//Importering af funktioner/variable
import { getArtists, endpoint, getTracks, getAlbums } from "./rest-services.js";

//Kør startfunktionen automatisk på load
window.addEventListener("load", initApp);

//Globale variable
let artists;
let tracks;
let albums;

//Fetcher kunstnerlisten og aktivierer eventListeners
async function initApp() {
  artists = await getArtists(`${endpoint}/artists`);
  tracks = await getTracks(`${endpoint}/tracks`);
  albums = await getAlbums(`${endpoint}/albums`);
  // console.log(artists);
  // console.log(tracks);
  // console.log(albums);
  globalListeners();

  //Viser listen grafisk
  updateGrid();
}

//EventListeners
function globalListeners() {
  document.querySelector("#sort-select").addEventListener("change", chooseSort);
  document.querySelector("#input-search").addEventListener("keyup", (event) => searchAll(event.target.value));
}

function searchAll(eventValue) {
  const keysSomeArtist = ["artistName", "shortDescription"];
  const keysSomeAlbums = ["albumTitle"];
  const keysSomeTracks = ["trackName"];
  const valuesSome = [eventValue];

  const resultSomeArtists = artists.filter((artist) => keysSomeArtist.some((key) => valuesSome.some((searchValue) => artist[key].toLowerCase().includes(searchValue.toLowerCase()))));
  const resultSomeAlbums = albums.filter((album) => keysSomeAlbums.some((key) => valuesSome.some((searchValue) => album[key].toLowerCase().includes(searchValue.toLowerCase()))));
  const resultSomeTracks = tracks.filter((track) => keysSomeTracks.some((key) => valuesSome.some((searchValue) => track[key].toLowerCase().includes(searchValue.toLowerCase()))));
  showArtists(resultSomeArtists);
  showAlbums(resultSomeAlbums);
  showTracks(resultSomeTracks);
}

//Dom manipulation på kunstnerlisten
function showArtists(artistList) {
  document.querySelector("#artists-grid-container").innerHTML = '<h2 class="gridTitle">Artists<h2>';

  for (const artist of artistList) {
    document.querySelector("#artists-grid-container").insertAdjacentHTML(
      "beforeend",
      /*HTML*/ `
        <article class="grid-box">

            <h2 class="artist-name">${artist.artistName}</h2>
            <div class="card-content-first">
              <img class="artist-image" src=${artist.artistImage} alt="" />
              <p class="artist-desc">${artist.shortDescription}</p>
            </div>

        </article>
    `
    );
  }
}

function showTracks(tracklist) {
  document.querySelector("#tracks-grid-container").innerHTML = '<h2 class="gridTitle">Tracks<h2>';

  for (const track of tracklist) {
    document.querySelector("#tracks-grid-container").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
      <article class="grid-box">

    <h2 class="artist-name">${track.trackName}</h2>
    </article>
    `
    );
  }
}

function showAlbums(albumlist) {
  document.querySelector("#albums-grid-container").innerHTML = '<h2 class="gridTitle">Albums<h2>';

  for (const album of albumlist) {
    document.querySelector("#albums-grid-container").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <article class="grid-box">
    <h2 class="album-name">${album.albumTitle}</h2>
    <img class="album-image" src=${album.albumCover} alt=""/>
    <p class="album-year">${album.yearPublished}</p>
    </article>
    `
    );
  }
}

function updateGrid() {
  showArtists(artists);
  showTracks(tracks);
  showAlbums(albums);
}

//Vælg og kald den korrekte sorteingsfunktion baseret på valgt value i dropdownmenuen
function chooseSort() {
  let sortValue = document.querySelector("#sort-select").value;

  switch (sortValue) {
    case "name":
      artists.reverse();
      albums.reverse();
      tracks.reverse();
      updateGrid();
      break;
    case "reverse":
      artists.reverse();
      albums.reverse();
      tracks.reverse();
      updateGrid();
      break;
  }
}
