import ItemRenderer from "./itemrenderer.js";
import { trackList, albumList, artistList } from "./main.js";

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
      console.log(this.item);
    });

    // document.querySelector(".grid-box:last-child button").addEventListener("click", () => {
    //   trackList.filter("name", this.item.name);
    //   artistList.filter("name", this.item.name);
    //   albumList.filter("artistId", this.item.artistId);
    // });
  }
}
