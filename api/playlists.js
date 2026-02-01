import express from "express";
import {
  getPlayLists,
  getPlayListId,
  getPlaylistIdWithTracks,
  createPlaylist
  } from "../db/queries/playlists.js";
import { createPlayListTrack } from "../db/queries/playlists-tracks.js";

const router = express.Router();
export default router;

router.get("/", async (req, res, next) => {
  console.log(`getting playlists`);
  const playlists = await getPlayLists();
  res.send(playlists);
});


router.param("id", async(req, res, next, id) => {
  const playlist = await getPlayListId(id);
  if (!/^\d+$/.test(id)) return res.status(400).send(`INPROPER INPUT: id must be a NUMBER`);
  if (!playlist) return res.status(404).send(`Playlist is not found.`);
  req.playlist = playlist;
  next();
});

router.get ("/:id", (req, res, next) => {
  res.send(req.playlist);
});

router.get("/:id/tracks", async(req, res) => {
  const tracksOf = await getPlaylistIdWithTracks(req.playlist.id);
  if (!tracksOf || tracksOf.length === 0) return res.status(404).send(`There are no tracks found in this playlist.`);
  res.send(tracksOf);
});

router.post("/", async(req, res, next) => {
  if (!req.body) return res.status(400).send(`ERROR: Request Body is required.`);

  const { name, description } = req.body;
  if (!name || !description) return res.status(400).send(`ERROR: Request Body is missing required fields.`);
  const newPlaylist = await createPlaylist(name, description);
  res.status(201).send(newPlaylist);
});

router.post("/:id/tracks", async(req, res, next) => {
  if (!req.body) return res.status(400).send(`ERROR: Request Body is required.`);

  const { trackId } = req.body;
  if (!trackId) return res.status(400).send(`ERROR: Request Body requires a track ID.`);
  
  const playlistTrack = await createPlayListTrack(req.playlist.id, trackId);
  res.status(201).send(playlistTrack);
});