import ItemRenderer from "./ItemRenderer.js";
import { trackList, albumList, artistList } from "../controller/Controller.js";

export class ArtistRenderer extends ItemRenderer {
  render() {
    const artist = this.item;
    const html = /*html*/ `
        <article class="grid-box">

            <h2 class="artist-name">${artist.name}</h2>
            <div class="card-content-first">
              <img class="artist-image" src=${artist.artistImage} alt="" />
              <p class="artist-desc">${artist.shortDescription}</p>
            </div>
            <button class="btn-connect">Albums by ${artist.name} </button>

        </article>
`;
    return html;
  }

  postRender(element) {
    element.addEventListener("click", () => {
      console.log(this.item);
    });
    document.querySelector(".grid-box:last-child button").addEventListener("click", () => {
      trackList.filter("name", this.item.name);
      artistList.filter("name", this.item.name);
      albumList.filter("artistId", this.item.artistId);
      window.scrollTo(0, 0);
    });
  }
}
