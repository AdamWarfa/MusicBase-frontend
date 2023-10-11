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

    // const filteredList = renderers.filter((renderer) => renderer.item.active == "Ja");
    // console.log(filteredList);

    for (const renderer of renderers) {
      try {
        const html = renderer.render();
        this.container.insertAdjacentHTML("beforeend", html);

        const element = this.container.lastElementChild;

        if (renderer.postRender) {
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
}

//   sort(sortBy, sortDir) {
//     try {
//       if (this.sortBy === sortBy && this.sortDir === "asc") {
//         list = list.reverse();
//         this.sortDir = "desc";
//       } else if (this.sortBy === sortBy && this.sortDir === "desc") {
//         list = list.reverse();
//         this.sortDir = "asc";
//       } else {
//         if (sortType == "number") {
//           list.sort((a, b) => a[`${sortBy}`] - b[`${sortBy}`]);
//         } else if (sortType == "string") {
//           list.sort((a, b) => a[`${sortBy}`].localeCompare(b[`${sortBy}`]));
//         }
//       }

//       console.log(list);
//     } catch (error) {}
//     this.sortBy = sortBy;
//     this.clear();

//     this.render();
//   }
