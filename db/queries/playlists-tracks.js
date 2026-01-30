import db from "../client.js";

export const createPlayListTrack = async(refPlId, refTId) => {
  try {
    const sql = `
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES (${refPlId}, ${refTId})
    RETURNING *
    `;
    const { rows: [playlistTrack]} = await db.query(sql);
    return playlistTrack;
  } catch(err) {
    console.log(`ERROR_CREATING REFERENCE TABLE`, err);
  }
}