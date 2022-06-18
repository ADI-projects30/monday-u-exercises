import { ItemClient } from "./clients/item_client.js";

class Main {
  constructor() {
    this.itemClient = new ItemClient();
  }

  init = async () => {
    const addItemButton = document.getElementById("list-item-submit");
    addItemButton.addEventListener("click", this.handleItem);
    this.spinerAndRender(); // this will make it so that any time you refresh the page you'll see the items already in your todo list
  };

  handleItem = async () => {
    await this.itemClient.sendPostRequest();
    const taskInput = document.getElementById("list-item-input");
    taskInput.value = "";
    this.spinerAndRender();
  };

  deleteItem = async (item) => {
    const myList = document.getElementById("list");
    const list = document.getElementById("list").childNodes;
    var nodes = Array.from(myList.childNodes);
    const taskIndex = nodes.indexOf(item);
    await this.itemClient.sendDeleteRequest(taskIndex);
    this.spinerAndRender();
  };

  renderItems = async () => {
    const list = document.getElementById("list");
    list.innerHTML = "";
    const items = await this.itemClient.sendGetRequest();
    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.innerHTML = item["task"];

      const listItemDeleteButton = this._createDeleteButton(item);
      listItem.appendChild(listItemDeleteButton);
      list.appendChild(listItem);
    });
  };

  spinerAndRender = async () => {
    loader.style.display = "flex";
    await this.renderItems();
    loader.style.display = "none";
  };

  _createDeleteButton = () => {
    const button = document.createElement("img");
    button.src = "./images/delete_icon.svg";
    button.classList.add("list-item-delete-button");
    button.addEventListener("click", (e) =>
      this.deleteItem(e.target.closest("li"))
    );
    return button;
  };
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
