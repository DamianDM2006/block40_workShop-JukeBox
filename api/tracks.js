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

  req.track = track;
  next();
})