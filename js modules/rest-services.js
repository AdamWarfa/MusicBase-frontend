"use strict";

//Endpoint
const endpoint = "https://musicbasebe.azurewebsites.net";

//Fetch den fulde liste af kunstnere
async function getArtists(endpointValue) {
  const res = await fetch(endpointValue);
  const data = res.json();
  return data;
}

// fetch den fulde liste af tracks
async function getTracks(endpointValue) {
  const res = await fetch(endpointValue);
  const data = res.json();
  return data;
}

// fetch den fulde liste af albums
async function getAlbums(endpointValue) {
  const res = await fetch(endpointValue);
  const data = res.json();
  return data;
}

//Eksportering af funktioner/variable
export { getArtists, getAlbums, getTracks, endpoint };
