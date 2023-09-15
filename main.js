"use strict";

//Importering af funktioner/variable
import { getArtists, createArtist, endpoint, getTracks, getAlbums } from "./rest-services.js";

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
  console.log(artists);
  globalListeners();

  //Viser listen grafisk
  showArtists(artists);
  showAllTrack(tracks);
  showAlbum(albums);
}

//EventListeners
function globalListeners() {
  document.querySelector("#btn-close-create").addEventListener("click", () => closeDialog(document.querySelector("#create-dialog")));
  document.querySelector("#btn-create").addEventListener("click", createClicked);
  document.querySelector("#home-link").addEventListener("click", goHome);
  document.querySelector("#sort-select").addEventListener("change", chooseSort);
  document.querySelector("#input-search").addEventListener("keyup", (event) => showArtists(artists.filter((artist) => artist.name.toLowerCase().includes(event.target.value.toLowerCase()))));
}

//Dom manipulation på kunstnerlisten
function showArtists(artistList) {
  document.querySelector("#artists-grid-container").innerHTML = "";
  for (const artist of artistList) {
    document.querySelector("#artists-grid-container").insertAdjacentHTML(
      "beforeend",
      /*HTML*/ `
        <article class="grid-box">

            <h2 class="artist-name">${artist.name}</h2>
            <div class="card-content-first">
              <img class="artist-image" src=${artist.image} alt="" />
              <p class="artist-desc">${artist.shortDescription}</p>
            </div>

        </article>
    `
    );
  }
}

function showAllTrack(tracklist) {
  document.querySelector("#tracks-grid-container").innerHTML = "";
  for (const track of tracklist) {
    document.querySelector("#tracks-grid-container").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
      <article class="grid-box">

    <h2 class="artist-name">${track.name}</h2>
    </article>
    `
    );
  }
}

function showAlbum(albumlist) {
  document.querySelector("#albums-grid-container").innerHTML = "";
  for (const album of albumlist) {
    document.querySelector("#albums-grid-container").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <article class="grid-box">
    <h2 class="album-name">${album.name}</h2>
    <img class="album-image" src=${album.image} alt=""/>
    <p class="album-year">${album.yearPublished}</p>
    </article>
    `
    );
  }
}

function updateGrid() {
  showArtists(artists);
}

function createClicked() {
  document.querySelector("#create-dialog").showModal();
  document.querySelector("#create-form").addEventListener("submit", createArtist);
}

function closeDialog(dialog) {
  dialog.close();
}

//Ændr nuværende view til "home" så den fulde liste skal vises
function goHome() {
  document.querySelector("#grid-container").innerHTML = "";
  view = "home";
  updateGrid();
}

//Vælg og kald den korrekte sorteingsfunktion baseret på valgt value i dropdownmenuen
function chooseSort() {
  let sortValue = document.querySelector("#sort-select").value;
  console.log(sortValue);
  switch (sortValue) {
    case "name":
      artists.sort(sortByName);
      console.log(artists);
      updateGrid();
      break;
  }
}

//Sorter efter Navn
function sortByName(a, b) {
  return a.name.localeCompare(b.name);
}

async function search(searchValue) {
  showArtists(artists.filter((artist) => artist.name.toLowerCase().includes(searchValue.toLowerCase())));
}

//Eksportering af funktioner/variable
export { updateGrid, artists };
