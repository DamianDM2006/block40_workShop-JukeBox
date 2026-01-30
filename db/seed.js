import db from "#db/client";
import { createPlaylist } from "./queries/playlist.js";
import { createTrack } from "./queries/tracks.js";
import { createPlayListTrack } from "./queries/playlists-tracks.js";

const seed = async() => {
  // TODO
  try {
    console.log(`Seeding in progress`);
    for (let p = 1; p <= 10; p++) await createPlaylist(`Playlist-${p}`, `describing > ${p}.`);
    for (let t = 1; t <= 20; t++) await createTrack(`Track-${t}`, 10000);
    for (let pt = 1; pt <= 15; pt++) {
      const refPlId = Math.floor(Math.random() * 10) + 1;
      const refTId = Math.floor(Math.random() * 20) + 1;
      await createPlayListTrack(refPlId, refTId);
    }
  } catch(err) {
    console.log(`ERROR: SEEDING`, err);
  }
};

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

