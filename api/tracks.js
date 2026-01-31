import express from "express";
import { getTracks, getTrackbyId } from "../db/queries/tracks.js";
const router = express.Router();
export default router;

router.get("/", async(req, res, next) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.param("id", async(req, res, next, id) => {
  const track = await getTrackbyId(id);
  if (!/^\d+$/.test(id)) return res.status(400).send(`INPROPER INPUT: id must be a NUMBER.`);
  if (!track) return res.status(404).send(`Track is not found.`);
  req.track = track;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.track);
});