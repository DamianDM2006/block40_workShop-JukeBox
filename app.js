import express from "express";
const app = express();
export default app;

import tracksRouter from "./api/tracks.js";
import playlistRouter from "./api/playlists.js";

app.use(express.json());

app.get("/", (req, res) => res.send("Welcome: Jukebox"));

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});
