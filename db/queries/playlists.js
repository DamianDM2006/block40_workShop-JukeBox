import db from "../client.js";

export const createPlaylist = async (name, description) => {
  try {
    const sql = `
    INSERT INTO playlists (name, description)
    VALUES ('${name}', '${description}')
    RETURNING *
    `;
    const {
      rows: [playlist],
    } = await db.query(sql);
    return playlist;
  } catch (err) {
    console.log(`ERROR_CREATING PLAYLIST`, err);
  }
};

export const getPlayLists = async () => {
  console.log(`getting play list`);
  try {
    const sql = `
    SELECT * FROM playlists
    `;
    const { rows: playlists } = await db.query(sql);
    return playlists;
  } catch (err) {
    console.log(`ERROR_GETTING PLAYLISTS`, err);
  }
};

export const getPlayListId = async (id) => {
  try {
    const sql = `
    SELECT * FROM playlists
    WHERE id = ${id}
    `;
    const { rows: [playlist] } = await db.query(sql);
    console.log(`playlist`, playlist);
  } catch(err) {
    console.log(`ERROR_GETTING PLAYLIST`, err);
  }
};

export const getPlaylistIdWithTracks = async(id) => {
  try {
    const sql = `
    SELECT
      playlists.*,
      tracks.name AS track_name,
      tracks.duration_ms
    FROM
      playlists_tracks
    JOIN playlists ON playlists_tracks.playlist_id = playlists.id
    JOIN tracks ON playlists_tracks.track_id = tracks.id
    WHERE playlists.id = ${id}
    `;
    const { rows: playlists } = await db.query(sql);
    return playlists;
  } catch(err) {
    console.log(`ERROR_GETTING PLAYLIST WITH TRACKS`, err);
  }
};