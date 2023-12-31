import os from "os";
import cluster from "cluster";
import { app } from "./server/app.js";
import { danger, init, success } from "./server/helper/chalk.js";
import dotenv from "dotenv";
import { database } from "./server/helper/database.js";

const port = process.env.PORT || 5500;

dotenv.config();
const CPU_LENGTH = os.cpus().length;
if (cluster.isPrimary) {
  for (let i = 0; i < CPU_LENGTH; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(danger(` Worker ${worker.process.pid} died`));
    console.log(init("New worker starting....."));
    cluster.fork();
  });
} else {
  database()
    .then(() =>
      app.listen(port, (error) => {
        if (error) {
          console.log(danger("Unable to connect to server"));
        }
        console.log(success(`Server started on ${port}`));
      })
    )
    .catch((error) => {
      {
        throw new Error(error?.message || "Database not found");
      }
    });
}
