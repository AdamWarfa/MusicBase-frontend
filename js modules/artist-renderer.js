import ItemRenderer from "./itemrenderer.js";

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

        </article>
`;
    return html;
  }

  postRender(element) {
    element.addEventListener("click", () => {
      console.log(this.item);
    });
  }
}
