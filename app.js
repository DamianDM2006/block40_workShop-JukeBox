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
  switch (err.code) {
    case "23503": return res.status(400).send(err.detail);
    case "42703": return res.status(400).send(err.message);
    case "23505": return res.status(400).send(err.detail);
    default: next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});