export default class ListRenderer {
  constructor(list, container, itemRenderer) {
    this.container = document.querySelector(container);
    this.items = list;
    this.itemRenderer = itemRenderer;
  }

  render() {
    this.container.innerHTML = "";
    const filteredList = this.items.filter(
      (item) =>
        this.filterValue === "all" ||
        item[this.filterProperty] == this.filterValue
    );
    for (const item of filteredList) {
      const renderer = new this.itemRenderer();
      renderer.item = item;
      const html = renderer.render();
      this.container.insertAdjacentHTML("beforeend", html);
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
    this.render();
  }
  filter(filterProperty, filterValue) {
    if (filterProperty.includes(":") && filterValue === undefined) {
      [this.filterProperty, this.filterValue] = filterProperty.split(":");
    } else {
      this.filterProperty = filterProperty;
      this.filterValue = filterValue;
    }
    this.render();
  }
}
