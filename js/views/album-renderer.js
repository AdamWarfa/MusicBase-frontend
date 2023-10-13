import ItemRenderer from "./itemrenderer.js";
import { trackList, albumList, artistList } from "../main.js";

export class AlbumRenderer extends ItemRenderer {
  render() {
    const album = this.item;
    const html = /*html*/ ` 
        <article class="grid-box">
        <h2 class="album-name">${album.name}</h2>
        <img class="album-image" src=${album.albumCover} alt=""/>
        <p class="album-year">${album.yearPublished}</p>
        <button class="btn-connect">Tracks on ${album.name} </button>
        </article>
        `;
    return html;
  }

  postRender(element) {
    element.addEventListener("click", () => {
      console.log(this.item.albumId.toLowerCase());
    });

    document.querySelector(".grid-box:last-child button").addEventListener("click", () => {
      trackList.filter("albumId", this.item.albumId);
      artistList.filter("artistId", this.item.artistId);
      albumList.filter("name", this.item.name);
      window.scrollTo(0, 0);
    });
  }
}
