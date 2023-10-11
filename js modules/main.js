"use strict";

//Importering af funktioner/variable
import { getArtists, endpoint, getTracks, getAlbums } from "./rest-services.js";
import { TrackRenderer } from "./track-renderer.js";
import { ArtistRenderer } from "./artist-renderer.js";
import { AlbumRenderer } from "./album-renderer.js";
import ListRenderer from "./list-renderer.js";
// import { ItemRenderer } from "./itemrenderer.js";
import { Artist, Album, Track, MusicBase } from "./classes.js";

//Kør startfunktionen automatisk på load
window.addEventListener("load", initApp);

//Globale variable
const musicBase = new MusicBase();
let trackList;
let artistList;
let albumList;

//Fetcher kunstnerlisten og aktivierer eventListeners
async function initApp() {
  await buildTrackList();
  await buildAlbumList();
  await buildArtistList();

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

  document.querySelector("#input-search").addEventListener("input", (event) => {
    const searchValue = event.target.value;
    console.log(searchValue);
    trackList.filter("name", searchValue);
    trackList.render();
    trackList.filter("name", searchValue);
    artistList.render();
    trackList.filter("name", searchValue);
    albumList.render();
  });
}

async function buildArtistList() {
  const fetchedArtistList = await getArtists(`${endpoint}/artists`);
  for (let artist of fetchedArtistList) {
    const newArtist = new Artist(artist.artistName, artist.id, artist.artistImage, artist.shortDescription);
    musicBase.artistList.push(newArtist);
    await newArtist.addArtistsToAlbums(artist.id);
  }
  console.log(musicBase.artistList);
}

async function buildAlbumList() {
  const fetchedAlbumList = await getAlbums(`${endpoint}/albums`);
  for (let album of fetchedAlbumList) {
    const newAlbum = new Album(album.albumTitle, album.id, album.albumCover, album.yearPublished, album.tracks);
    musicBase.albumList.push(newAlbum);
  }
  console.log(musicBase.albumList);
}
async function buildTrackList() {
  const fetchedTrackList = await getTracks(`${endpoint}/tracks`);
  for (let track of fetchedTrackList) {
    const newTrack = new Track(track.trackName, track.id);

    musicBase.trackList.push(newTrack);
  }
}

// async function addArtistsToAlbums(artistId) {
//   const fetchedList = await getTracks(`${endpoint}/artists/${artistId}/albums`);

//   const albumIdList = findAlbumId(fetchedList);

//   const albumByArtistList = [];
//   for (const albumId of albumIdList) {
//     const foundAlbum = musicBase.albumList.find((album) => album.albumId == albumId);
//     albumByArtistList.push(foundAlbum);
//   }
//   console.log(albumByArtistList);
//   return albumByArtistList;
// }

// function findAlbumId(artistAlbumList) {
//   const albumIdList = [];
//   for (let item of artistAlbumList) {
//     const albumId = item.albumId;
//     albumIdList.push(albumId);
//   }

//   return albumIdList;
// }

//EventListeners
function globalListeners() {
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

export { musicBase };
