import db from "../client.js";

export const createTrack = async(name, duration) => {
    const sql = `
    INSERT INTO tracks (name, duration_ms)
    VALUES ('${name}', ${duration})
    RETURNING *
    `;
    const { rows: [track] } = await db.query(sql);
    return track;
};

export const getTracks = async() => {
    const sql = `
    SELECT * FROM tracks
    `;
    const { rows: tracks } = await db.query(sql);
    return tracks;
};

export const getTrackbyId = async(id) => {
    const sql = `
    SELECT * FROM tracks
    WHERE id = ${id}
    `;
    const { rows: [track] } = await db.query(sql);
    return track;
};