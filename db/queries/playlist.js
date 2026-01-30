import db from "../client.js";

export const createPlaylist = async(name, description) => {
  try {
    const sql = `
    INSERT INTO playlists (name, description)
    VALUES ('${name}', '${description}')
    RETURNING *
    `;
    const { rows: [playlist] } = await db.query(sql);
    return playlist;
  } catch(err) {
    console.log(`ERROR_CREATING PLAYLIST`, err);
  }
}