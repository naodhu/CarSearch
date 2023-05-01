import { connectDB } from "../config/db.js";
import { MONGODB_URI } from "../config/config.js";
import fetch from "node-fetch";
import { BACK4APP_API } from "../config/config.js";
import Car from "../models/Car.js";

connectDB()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(`Error connecting to database: ${err.message}`);
  });

export const fetchCars = async () => {
  try {
    const response = await fetch(BACK4APP_API.URL, {
      headers: {
        "X-Parse-Application-Id": BACK4APP_API.APPLICATION_ID,
        "X-Parse-REST-API-Key": BACK4APP_API.REST_API_KEY,
      },
    });

    const data = await response.json();
    console.log("Data fetched from API:");
    console.log(JSON.stringify(data, null, 2));

    let successCount = 0;
    let errorCount = 0;

    // Save the fetched data to the Car collection
    await Promise.all(
      data.results.map(async (carData) => {
        try {
          await Car.updateOne(
            { objectId: carData.objectId },
            { $set: carData },
            { upsert: true }
          );
          successCount++;
        } catch (err) {
          console.error(
            `Error saving car: ${carData.objectId}, ${err.message}`
          );
          errorCount++;
        }
      })
    );

    console.log(`Successfully saved cars: ${successCount}`);
    console.log(`Unsuccessfully saved cars: ${errorCount}`);
  } catch (err) {
    console.error(err.message);
  }
};
