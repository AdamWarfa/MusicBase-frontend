import ItemRenderer from "./itemrenderer.js";

export class AlbumRenderer extends ItemRenderer {
  render() {
    const album = this.item;
    const html = /*html*/ `
        <article class="grid-box">
        <h2 class="album-name">${album.name}</h2>
        <img class="album-image" src=${album.albumCover} alt=""/>
        <p class="album-year">${album.yearPublished}</p>
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
