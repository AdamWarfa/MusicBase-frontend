class ItemRenderer {
  constructor(item) {
    this.item = item;
  }

  render() {
    return `<p>${this.item}</p>`;
  }
}

export default ItemRenderer;
