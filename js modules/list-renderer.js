export default class ListRenderer {
  constructor(list, container, itemRenderer) {
    this.renderers = [];
    this.container = document.querySelector(container);
    this.filterProperty = "";
    this.filterValue = "";
    this.sortBy = "";
    this.sortDir = "asc";
    this.items = list;
    this.itemRenderer = itemRenderer;
  }

  clear() {
    this.renderers = [];
    this.container.innerHTML = "";
  }

  render() {
    for (const item of this.items) {
      const renderer = new this.itemRenderer();
      renderer.item = item;
      this.renderers.push(renderer);
    }

    let renderers = this.renderers;

    let filteredList;
    if (this.filterProperty == "") {
      filteredList = renderers;
    } else {
      filteredList = renderers.filter((item) => item.item[this.filterProperty] == this.filterValue);
    }
    for (const renderer of filteredList) {
      try {
        const html = renderer.render();
        this.container.insertAdjacentHTML("beforeend", html);

        if (renderer.postRender) {
          const element = this.container.lastElementChild;

          renderer.postRender(element);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  sort(sortBy, sortDir) {
    console.log(this.items);
    if (sortBy == "name" && sortDir == "asc") {
      this.items.sort((a, b) => a.name.localeCompare(b.name));
      this.sortDir = "asc";
      this.sortBy = "name";
    } else if (sortBy == "name" && sortDir == "desc") {
      this.items.sort((a, b) => b.name.localeCompare(a.name));
      this.sortDir = "desc";
      this.sortBy = "name";
    }
    this.clear();
    this.render();
  }

  filter(filterProperty, filterValue) {
    console.log(filterProperty, filterValue);
    // simply remember the settings
    this.filterProperty = filterProperty;
    this.filterValue = filterValue;

    // and re-render the list - this will do the actual filtering
    this.render();
  }
}
