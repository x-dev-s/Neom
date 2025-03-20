"use server";
import { connectToDatabase } from "../lib/db";

export async function fetchAllUsers() {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute("SELECT * FROM User"); // Replace with your table name
    return Response.json(rows);
  } catch (error) {
    return null;
  }
}

export async function fetchAllData() {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute("SELECT * FROM All_Data"); // Replace with your table name
    return Response.json(rows);
  } catch (error) {
    return null;
  }
}
export async function fetchDailyYieldData(span) {
  try {
    const connection = await connectToDatabase();
    const [generator1] = await connection.execute(
      `SELECT DATE(Timestamp) AS day, SUM(TotalActivePower_G1 * (5 / 60)) AS "Daily Power Yield" FROM All_Data WHERE Timestamp >= DATE_SUB(CURDATE(), INTERVAL ${parseInt(span)-1} DAY) GROUP BY day`
    );
    const [generator2] = await connection.execute(
      `SELECT DATE(Timestamp) AS day, SUM(TotalActivePower_G2 * (5 / 60)) AS "Daily Power Yield" FROM All_Data WHERE Timestamp >= DATE_SUB(CURDATE(), INTERVAL ${parseInt(span)-1} DAY) GROUP BY day`
    );
    const [generator3] = await connection.execute(
      `SELECT DATE(Timestamp) AS day, SUM(TotalActivePower_G3 * (5 / 60)) AS "Daily Power Yield" FROM All_Data WHERE Timestamp >= DATE_SUB(CURDATE(), INTERVAL ${parseInt(span)-1} DAY) GROUP BY day`
    );
    const [pv] = await connection.execute(
      `SELECT DATE(Timestamp) AS day, DailyPowerYield_I AS "Daily Power Yield" FROM All_Data WHERE HOUR(Timestamp) = 23 AND Timestamp >= DATE_SUB(CURDATE(), INTERVAL ${parseInt(span)-1} DAY) GROUP BY day`
    );
    const [latestPV] = await connection.execute(
      `SELECT Timestamp AS day, DailyPowerYield_I AS "Daily Power Yield" FROM All_Data WHERE 1 ORDER BY Timestamp DESC LIMIT 1`
    );
    pv.push(latestPV[0]);
    return Response.json({
      generator1,
      generator2,
      generator3,
      pv,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}

export async function fetchPowerTrendData(start, end) {
  try {
    if (!start || !end) {
      return Response.json({ message: "Invalid request" }, { status: 400 });
    }
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT DATE_FORMAT(Timestamp, '%e/%c/%Y %l:%i %p') AS 'Timestamp', TotalLoad AS "Total Load", TotalActivePower_I AS "PV Power", TotalActivePower_G AS "Genset Power" FROM All_Data WHERE Timestamp BETWEEN ? AND ?`,
      [start, end]
    ); // Replace with your table name
    return Response.json(rows);
  } catch (error) {
    return null;
  }
}

export async function fetchCurtailmentData(span = 7) {
  try {
    const connection = await connectToDatabase();

    // Combine all three queries into one
    const [rows] = await connection.execute(
      `SELECT DATE(Timestamp) AS day, SUM(TotalCurrentCapacity * (5 / 60)) AS "Max. Power Yield", SUM(TotalCurtailedPower * (5 / 60)) AS "Curtailed Power Yield", (SELECT DailyPowerYield_I FROM All_Data WHERE HOUR(Timestamp) = 23 AND DATE(Timestamp) = DATE(AD.Timestamp) LIMIT 1) AS "Actual Power Yield" FROM All_Data AD WHERE Timestamp >= DATE_SUB(CURDATE(), INTERVAL ${parseInt(span)-1} DAY) GROUP BY day`
    );
    const [latestPV] = await connection.execute(
      `SELECT Timestamp AS day, DailyPowerYield_I AS "Actual Power Yield" FROM All_Data WHERE 1 ORDER BY Timestamp DESC LIMIT 1`
    );
    // Map the data and format it
    const data = rows.map((item) => ({
      day: new Date(item.day).toLocaleDateString("en-PK"),
      "Max. Power Yield": item["Max. Power Yield"],
      "Curtailed Power Yield": item["Curtailed Power Yield"],
      "Actual Power Yield": item["Actual Power Yield"] || 0,
    }));
    data[data.length - 1]["Actual Power Yield"] =
      latestPV[0]["Actual Power Yield"];
    return Response.json(data); // Return the computed data as JSON
  } catch (error) {
    console.error(error); // Log the error for debugging
    return null;
  }
}

export async function fetchTotalPowerData() {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT TotalActivePower_I AS "PV", TotalActivePower_G1 AS "Generator 1", TotalActivePower_G2 AS "Generator 2", TotalActivePower_G3 AS "Generator 3", TotalLoad AS "Total Load" FROM All_Data ORDER BY Timestamp DESC LIMIT 1`
    );
    return Response.json(rows);
  } catch (error) {
    return null;
  }
}

export async function fetchMeteoKpiData() {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT DATE_FORMAT(Timestamp, '%e/%c/%Y %l:%i %p') AS 'Timestamp', AmbientTemp AS "Ambient Temperature", AmbientHumidity AS "Ambient Humidity", SlopeTransientIrradiation AS "Slope Transient Irradiation" FROM All_Data WHERE Timestamp >= DATE_SUB(CURDATE(), INTERVAL 1 DAY)`
    );
    return Response.json(rows);
  } catch (error) {
    return null;
  }
}
