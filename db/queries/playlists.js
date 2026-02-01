import db from "../client.js";

export const createPlaylist = async (name, description) => {
    const sql = `
    INSERT INTO playlists (name, description)
    VALUES ('${name}', '${description}')
    RETURNING *
    `;
    const {
      rows: [playlist],
    } = await db.query(sql);
    return playlist;
};

export const getPlayLists = async () => {
    const sql = `
    SELECT * FROM playlists
    `;
    const { rows: playlists } = await db.query(sql);
    return playlists;
};

export const getPlayListId = async (id) => {
    const sql = `
    SELECT * FROM playlists
    WHERE id = ${id}
    `;
    const { rows: [playlist] } = await db.query(sql);
    return playlist;
};

export const getPlaylistIdWithTracks = async(id) => {
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
};