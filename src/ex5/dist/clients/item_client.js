class ItemClient {
  getItems = async () => {
    const response = await fetch(`/items?ts=${new Date()}`);
    const todos = await response.json();
    return todos;
  };

  postItem = async (item) => {
    await fetch("/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });
  };

  deleteItem = async (item) => {
    await fetch("/item", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });
  };

  updateItem = async (item) => {
    await fetch("/item", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });
  };
}
