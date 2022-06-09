import fs from "fs";

const args = process.argv;
const currentDirectory = process.cwd() + "\\";

if (fs.existsSync(currentDirectory + "todo.txt") === false) {
  let createStream = fs.createWriteStream("todo.txt");
  createStream.end();
}

export const listFunction = () => {
  let data = [];
  const fileData = fs.readFileSync(currentDirectory + "todo.txt").toString();

  data = fileData.split("\n");

  let filterData = data.filter(function (value) {
    return value !== "";
  });

  if (filterData.length === 0) {
    console.log("There are no pending tasks");
  }

  for (let i = filterData.length - 1; i >= 0; i--) {
    console.log(filterData.length - i + ". " + filterData[i]);
  }
};

export const addFunction = (task) => {
  let newTask = args[3];
  if (task) {
    newTask = task;
  }

  if (newTask) {
    const fileData = fs.readFileSync(currentDirectory + "todo.txt").toString();
    try {
      fs.writeFileSync(
        currentDirectory + "todo.txt",
        newTask + "\n" + fileData
      );
    } catch (err) {
      console.log(err);
    }
    console.log('Yes, a task has been added: "' + newTask + '"');
  } else {
    console.log("No, sorry. Missing task input. Nothing added!");
  }
};

export const deleteFunction = () => {
  const deleteIndex = args[3];
  if (deleteIndex) {
    let data = [];
    const fileData = fs.readFileSync(currentDirectory + "todo.txt").toString();
    data = fileData.split("\n");
    let filterData = data.filter(function (value) {
      return value !== "";
    });

    if (deleteIndex > filterData.length || deleteIndex <= 0) {
      console.log(
        "No, sorry: task #" + deleteIndex + " does not exist. Nothing deleted."
      );
    } else {
      filterData.splice(filterData.length - deleteIndex, 1);
      const newData = filterData.join("\n");
      fs.writeFile(currentDirectory + "todo.txt", newData, function (err) {
        if (err) throw err;
        console.log(
          "Yes! deleted task #" +
            deleteIndex +
            ": " +
            data[filterData.length + 1 - deleteIndex]
        );
      });
    }
  } else {
    console.log("No, error: Missing a task number in order to delete a task.");
  }
};
