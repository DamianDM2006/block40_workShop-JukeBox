import db from "../client.js";

export const createTrack = async(name, duration) => {
  try {
    const sql = `
    INSERT INTO tracks (name, duration_ms)
    VALUES ('${name}', ${duration})
    RETURNING *
    `;
    const { rows: [track] } = await db.query(sql);
    return track;
  } catch(err) {
    console.log(`ERROR_CREATING TRACK`, err);
  }
};

export const getTracks = async() => {
  try {
    const sql = `
    SELECT * FROM tracks
    `;
    const { rows: tracks } = await db.query(sql);
    return tracks;
  } catch(err) {
    console.log(`ERROR_GETTING TRACKS`, err);
  }
};

export const getTrackbyId = async(id) => {
  try {
    const sql = `
    SELECT * FROM tracks
    WHERE id = ${id}
    `;
    const { rows: [track] } = db.query(sql);
    return track;
  } catch(err) {
    console.log(`ERROR_GETTING TRACK BY ID`, err);
  }
};