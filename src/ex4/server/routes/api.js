// Define your endpoints here (this is your "controller file")
import express from "express";
import { auth } from "../../middleware/auth.js";
import { ItemManager } from "../services/item_manager.js";

const itemManager = new ItemManager();

const taskRouter = express.Router();

taskRouter.post("/", auth, async (req, res) => {
  if (req.body.item == "") {
    await itemManager.createTask(req.body.item);
  } else if (!isNaN(req.body.item.trim().split(",")[0])) {
    await itemManager.createPokemons(req.body.item);
  } else {
    await itemManager.createTask(req.body.item);
  }
  res.status(200).json(req.body);
});

taskRouter.get("/", async (req, res) => {
  let data = await itemManager.getAll();
  if (!data) data = [];
  res.status(200).json(data);
});

taskRouter.delete("/:id", async (req, res) => {
  let taskId = Number.parseInt(req.params.id.split(":")[1]);
  if (isNaN(taskId))
    return res.status(400).json({
      status: 400,
      error: "wrong parameters",
    });

  const data = await itemManager.deleteTask(taskId);
  res.status(200).json(data);
});

export default taskRouter;
