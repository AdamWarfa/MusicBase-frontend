import ItemRenderer from "./ItemRenderer.js";

export class TrackRenderer extends ItemRenderer {
  render() {
    const track = this.item;
    const html = /*html*/ `
        <article class="grid-box">
        <h2 class="track-name">${track.name}</h2>
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
