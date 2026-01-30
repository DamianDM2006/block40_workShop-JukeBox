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