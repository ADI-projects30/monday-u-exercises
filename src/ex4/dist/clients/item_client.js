// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
export class ItemClient {
  sendPostRequest = async () => {
    let textField = document.querySelector("input");
    let newItem = textField.value;
    let todo = {
      item: newItem,
    };
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const tasks = await response.json();
    return tasks;
  };

  sendGetRequest = async () => {
    try {
      const response = await fetch(`/`, {
        method: "GET",
        credentials: "same-origin",
      });
      const getJson = await response.json();
      return getJson;
    } catch (error) {
      console.error(error);
    }
  };

  sendDeleteRequest = async (taskIndex) => {
    const id = taskIndex;
    const response = await fetch("/:" + id, {
      method: "DELETE",
    });
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const tasks = await response;
    return tasks;
  };
}
