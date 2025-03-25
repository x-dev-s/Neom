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
    const [rows] = await connection.execute(
      `SELECT DATE(Timestamp) AS Day, SUM(TotalActivePower_G1 * (5 / 60)) AS "Generator 1", SUM(TotalActivePower_G2 * (5 / 60)) AS "Generator 2", SUM(TotalActivePower_G3 * (5 / 60)) AS "Generator 3" FROM All_Data WHERE Timestamp >= DATE_SUB(CURDATE(), INTERVAL ${parseInt(span)-1} DAY) GROUP BY Day`
    );
    const [pv] = await connection.execute(
      `SELECT DATE(Timestamp) AS Day, DailyPowerYield_I AS PV FROM All_Data WHERE HOUR(Timestamp) = 23 AND Timestamp >= DATE_SUB(CURDATE(), INTERVAL ${parseInt(span)-1} DAY) GROUP BY Day`
    );
    const [latestPV] = await connection.execute(
      `SELECT Timestamp AS Day, DailyPowerYield_I AS PV FROM All_Data WHERE 1 ORDER BY Timestamp DESC LIMIT 1`
    );
    pv.push(latestPV[0]);
    const data = rows.map((item) => ({
      Day: new Date(item.Day).toLocaleDateString("en-PK"),
      "Generator 1": item["Generator 1"],
      "Generator 2": item["Generator 2"],
      "Generator 3": item["Generator 3"],
      PV: pv.find((pvItem) => new Date(pvItem.Day).getDate() == new Date(item.Day).getDate())?.PV || 0,
      }));
    return Response.json(data);
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
      `SELECT DATE(Timestamp) AS Day, SUM(TotalCurrentCapacity * (5 / 60)) AS "Max. Power Yield", SUM(TotalCurtailedPower * (5 / 60)) AS "Curtailed Power Yield", (SELECT DailyPowerYield_I FROM All_Data WHERE HOUR(Timestamp) = 23 AND DATE(Timestamp) = DATE(AD.Timestamp) LIMIT 1) AS "Actual Power Yield" FROM All_Data AD WHERE Timestamp >= DATE_SUB(CURDATE(), INTERVAL ${parseInt(span)-1} DAY) GROUP BY Day`
    );
    const [latestPV] = await connection.execute(
      `SELECT Timestamp AS Day, DailyPowerYield_I AS "Actual Power Yield" FROM All_Data WHERE 1 ORDER BY Timestamp DESC LIMIT 1`
    );
    // Map the data and format it
    const data = rows.map((item) => ({
      Day: new Date(item.Day).toLocaleDateString("en-PK"),
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

export async function fetchInverterPowerTrendData(inverterId=1, start, end) {
  try {
    if (!start || !end) {
      return Response.json({ message: "Invalid request" }, { status: 400 });
    }
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT DATE_FORMAT(Timestamp, '%e/%c/%Y %l:%i %p') AS 'Timestamp', TotalActivePower_I${inverterId} AS "Active Power", TotalReactivePower_I${inverterId} AS "Reactive Power" FROM All_Data WHERE Timestamp BETWEEN ? AND ?`,
      [start, end]
    );
    return Response.json(rows);
  } catch (error) {
    return null;
  }
}

export async function fetchInverterDailyYieldData(inverterId = 1, span=7) {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT DATE(Timestamp) AS Day, DailyYield_I${inverterId} AS "Daily Power Yield" FROM All_Data WHERE HOUR(Timestamp) = 23 AND Timestamp >= DATE_SUB(CURDATE(), INTERVAL ${parseInt(span)-1} DAY) GROUP BY Day`
    );
    const [latestPV] = await connection.execute(
      `SELECT Timestamp AS Day, DailyYield_I${inverterId} AS "Daily Power Yield" FROM All_Data WHERE 1 ORDER BY Timestamp DESC LIMIT 1`
    );
    rows.push(latestPV[0]);
    return Response.json(rows);
  }
  catch (error) {
    console.error("Error fetching data:", error);
    return Response.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}

export async function fetchInverterCurtailmentData(inverterId = 1, span = 7) {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT DATE(Timestamp) AS Day, SUM(CurrentCapacity_I${inverterId} * (5 / 60)) AS "Max. Power Yield", SUM(CurtailedPower_I${inverterId} * (5 / 60)) AS "Curtailed Power Yield", (SELECT DailyYield_I${inverterId} FROM All_Data WHERE HOUR(Timestamp) = 23 AND DATE(Timestamp) = DATE(AD.Timestamp) LIMIT 1) AS "Actual Power Yield" FROM All_Data AD WHERE Timestamp >= DATE_SUB(CURDATE(), INTERVAL ${parseInt(span)-1} DAY) GROUP BY Day`
    );
    const [latestPV] = await connection.execute(
      `SELECT Timestamp AS Day, DailyYield_I${inverterId} AS "Actual Power Yield" FROM All_Data WHERE 1 ORDER BY Timestamp DESC LIMIT 1`
    );
    const data = rows.map((item) => ({
      Day: new Date(item.Day).toLocaleDateString("en-PK"),
      "Max. Power Yield": item["Max. Power Yield"],
      "Curtailed Power Yield": item["Curtailed Power Yield"],
      "Actual Power Yield": item["Actual Power Yield"] || 0,
    }));
    data[data.length - 1]["Actual Power Yield"] =
      latestPV[0]["Actual Power Yield"];
    return Response.json(data);
  }
  catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchInvertersActivePowerData(){
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT TotalActivePower_I1 AS "Inverter 1", TotalActivePower_I2 AS "Inverter 2", TotalActivePower_I3 AS "Inverter 3", TotalActivePower_I4 AS "Inverter 4", TotalActivePower_I5 AS "Inverter 5", TotalActivePower_I6 AS "Inverter 6" FROM All_Data ORDER BY Timestamp DESC LIMIT 1`
    );
    return Response.json(rows);
  } catch (error) {
    return null;
  }
}

export const fetchInverterTableData = async (inverterId = 1) => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT DATE_FORMAT(Timestamp, '%e/%c/%Y %l:%i %p') AS 'Timestamp', TotalDCpower_I${inverterId} AS "DC Power", TotalPowerFactor_I${inverterId} AS "Power Factor", PhaseAVoltage_I${inverterId} AS "Phase A Voltage", PhaseBVoltage_I${inverterId} AS "Phase B Voltage", PhaseCVoltage_I${inverterId} AS "Phase C Voltage", PhaseACurrent_I${inverterId} AS "Phase A Current", PhaseBCurrent_I${inverterId} AS "Phase B Current", PhaseCCurrent_I${inverterId} AS "Phase C Current", InteriorTemp_I${inverterId} AS "Interior Temperature" FROM All_Data WHERE Timestamp >= DATE_SUB(NOW(), INTERVAL 29 DAY)`
    );
    return Response.json(rows);
  } catch (error) {
    return null;
  }
}

export async function fetchGeneratorPowerTrendData(generatorId = 1, start, end) {
  try {
    if (!start || !end) {
      return Response.json({ message: "Invalid request" }, { status: 400 });
    }
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT DATE_FORMAT(Timestamp, '%e/%c/%Y %l:%i %p') AS 'Timestamp', TotalApparentPower_G${generatorId} AS "Apparent Power", TotalActivePower_G${generatorId} AS "Active Power", TotalReactivePower_G${generatorId} AS "Reactive Power" FROM All_Data WHERE Timestamp BETWEEN ? AND ?`,
      [start, end]
    );
    return Response.json(rows);
  } catch (error) {
    return null;
  }
}

export async function fetchGeneratorDailyYieldData(generatorId = 1, span=7) {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT DATE(Timestamp) AS Day, SUM(TotalActivePower_G${generatorId} * (5 / 60)) AS "Daily Power Yield" FROM All_Data WHERE Timestamp >= DATE_SUB(CURDATE(), INTERVAL ${parseInt(span)-1} DAY) GROUP BY Day`
    );
    return Response.json(rows);
  }
  catch (error) {
    console.error("Error fetching data:", error);
    return Response.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}

export const fetchGeneratorTableData = async (generatorId = 1) => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT DATE_FORMAT(Timestamp, '%e/%c/%Y %l:%i %p') AS 'Timestamp', EngineSpeed_G${generatorId} AS "Engine Speed", GeneratorFrequency_G${generatorId} AS "Generator Frequency", GeneratorOutput_G${generatorId} AS "Generator Output", AvgPowerFactor_G${generatorId} AS "Power Factor", Line1Voltage_G${generatorId} AS "Line 1 Voltage", Line2Voltage_G${generatorId} AS "Line 2 Voltage", Line3Voltage_G${generatorId} AS "Line 3 Voltage", Line1Current_G${generatorId} AS "Line 1 Current", Line2Current_G${generatorId} AS "Line 2 Current", Line3Current_G${generatorId} AS "Line 3 Current", Line1ActivePower_G${generatorId} AS "Line 1 Active Power", Line2ActivePower_G${generatorId} AS "Line 2 Active Power", Line3ActivePower_G${generatorId} AS "Line 3 Active Power", CoolantTemp_G${generatorId} AS "Coolant Temperature" , OilPressure_G${generatorId} AS "Oil Pressure" , EngineBatteryVoltage_G${generatorId} AS "Engine Battery Voltage" , ChargerVoltage_G${generatorId} AS "Charger Voltage" FROM All_Data WHERE Timestamp >= DATE_SUB(NOW(), INTERVAL 29 DAY)`
    );
    return Response.json(rows);
  } catch (error) {
    return null;
  }
}


export async function fetchSldData() {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT 
    TotalReactivePower_I, 
    (TotalActivePower_I / TotalCurrentCapacity) * 100,

    TotalActivePower_G1, 
    TotalReactivePower_G1, 
    GeneratorOutput_G1,

    TotalActivePower_G2, 
    TotalReactivePower_G2, 
    GeneratorOutput_G2,

    TotalActivePower_G3, 
    TotalReactivePower_G3, 
    GeneratorOutput_G3,

    TotalLoad, 
    TotalKVAR, 
    (TotalLoad / 3000) * 100

FROM All_Data 
ORDER BY Timestamp DESC 
LIMIT 1`
    );
    return Response.json(rows);
  } catch (error) {
    return null;
  }
}

export async function fetchMeteoTrendsData(start, end){
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT DATE_FORMAT(Timestamp, '%e/%c/%Y %l:%i %p') AS 'Timestamp', AmbientTemp AS "Ambient Temperature", AmbientHumidity AS "Ambient Humidity", TempPVmodule AS "PV Module Temperature", AtmosphericPressure AS "Air Pressure", WindSpeed AS "Wind Speed", WindAngle AS "Wind Angle", SlopeTransientIrradiation AS "Slope Transient Irradiation", TransientHorizontalIrradiation AS "Transient Horizontal Irradiation" FROM All_Data WHERE Timestamp BETWEEN ? AND ?`,
      [start, end]
    );
    return Response.json(rows);
  } catch (error) {
    return null;
  }
}

export async function fetchPvPowerTrendData(start, end){
  try {
    if (!start || !end) {
      return Response.json({ message: "Invalid request" }, { status: 400 });
    }
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT DATE_FORMAT(Timestamp, '%e/%c/%Y %l:%i %p') AS 'Timestamp', TotalActivePower_I AS "Total Active Power", TotalReactivePower_I AS "Total Reactive Power" FROM All_Data WHERE Timestamp BETWEEN ? AND ?`,
      [start, end]
    );
    return Response.json(rows);
  } catch (error) {
    return null;
  }
}

export async function fetchPvPowerYieldData(span){
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT DATE(Timestamp) AS Day, DailyPowerYield_I AS "Daily Power Yield" FROM All_Data WHERE HOUR(Timestamp) = 23 AND Timestamp >= DATE_SUB(CURDATE(), INTERVAL ${parseInt(span)-1} DAY) GROUP BY Day`
    );
    const [latestPV] = await connection.execute(
      `SELECT Timestamp AS Day, DailyPowerYield_I AS "Daily Power Yield" FROM All_Data WHERE 1 ORDER BY Timestamp DESC LIMIT 1`
    );
    rows.push(latestPV[0]);
    return Response.json(rows);
  }
  catch (error) {
    console.error("Error fetching data:", error);
    return Response.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}

export async function fetchGeneratorsActivePowerData(){
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT TotalActivePower_G1 AS "Generator 1", TotalActivePower_G2 AS "Generator 2", TotalActivePower_G3 AS "Generator 3" FROM All_Data ORDER BY Timestamp DESC LIMIT 1`
    );
    return Response.json(rows);
  } catch (error) {
    return null;
  }
}

export async function fetchGensetPowerYieldData(span){
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT DATE(Timestamp) AS Day, SUM(TotalActivePower_G * (5 / 60)) AS "Daily Power Yield" FROM All_Data WHERE Timestamp >= DATE_SUB(CURDATE(), INTERVAL ${parseInt(span)-1} DAY) GROUP BY Day`
    );
    return Response.json(rows);
  }
  catch (error) {
    console.error("Error fetching data:", error);
    return Response.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}

export async function fetchGensetPowerTrendData(start, end){
  try {
    if (!start || !end) {
      return Response.json({ message: "Invalid request" }, { status: 400 });
    }
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(
      `SELECT DATE_FORMAT(Timestamp, '%e/%c/%Y %l:%i %p') AS 'Timestamp', TotalActivePower_G AS "Total Active Power", TotalReactivePower_G AS "Total Reactive Power" FROM All_Data WHERE Timestamp BETWEEN ? AND ?`,
      [start, end]
    );
    return Response.json(rows);
  }
  catch (error) {
    return null;
  }
}