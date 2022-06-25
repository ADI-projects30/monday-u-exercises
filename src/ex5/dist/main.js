class Main {
  constructor() {
    this.itemClient = new ItemClient();
  }

  init = async () => {
    const addItemButton = document.getElementById("list-item-submit");
    addItemButton.addEventListener("click", this.handleItem);

    await this.renderItems();
  };

  handleItem = async () => {
    const input = document.getElementById("list-item-input");
    const inputValue = input.value;

    await this.itemClient.postItem(inputValue);
    await this.renderItems();
    input.value = "";
  };

  deleteItem = async (item) => {
    await this.itemClient.deleteItem(item);
    await this.renderItems();
  };

  updateItem = async (item, status) => {
    await this.itemClient.updateItem(item, status);
  };

  renderItems = async () => {
    const list = document.getElementById("list");
    list.innerHTML = "";

    const items = await this.itemClient.getItems();
    items.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.innerHTML = `${index + 1}. ${item.ItemName}`;

      const listItemDeleteButton = this._createDeleteButton(item);
      const checkBoxStatus = this._createCheckBox(item);
      listItem.append(listItemDeleteButton, checkBoxStatus);
      list.appendChild(listItem);
    });
  };

  _createDeleteButton = (item) => {
    const button = document.createElement("img");
    button.src = "./images/delete_icon.svg";
    button.classList.add("list-item-delete-button");
    button.addEventListener("click", (_) => this.deleteItem(item));

    return button;
  };

  getStatusFromDb = (item) => {
    if (!item.status == 0) {
      return true;
    }
    return false;
  };

  _createCheckBox = (item) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = this.getStatusFromDb(item);
    checkbox.addEventListener("change", () => {
      this.updateItem(item, checkbox.checked);
    });

    return checkbox;
  };
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
