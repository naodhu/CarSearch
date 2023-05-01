// config/config.js
import { URL } from "url";

const rawConnectionString = process.env.MONGODB_URI || "mongodb+srv://admin:UrL6JiniLqODmmVD@cluster0.xqebfug.mongodb.net/?retryWrites=true&w=majority";

const validateConnectionString = (connectionString) => {
  try {
    const url = new URL(connectionString);
    if (!url.protocol.startsWith("mongodb")) {
      throw new Error("Invalid scheme, expected connection string to start with 'mongodb://' or 'mongodb+srv://'");
    }
    return connectionString;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export const MONGODB_URI = validateConnectionString(rawConnectionString);

export const BACK4APP_API = {
  URL: "https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?count=1",
  APPLICATION_ID: "k76B4A4HZSG5eRullqYrWWmShvgKJgqefiF2ab5v",
  REST_API_KEY: "ODCXI8gdJquZrjZI1P0mD20Bt62EpD0HW2o1XJqq",
};

export const JWT_SECRET = "nonsecuresecret";
