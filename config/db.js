// password = UrL6JiniLqODmmVD
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Replace <password> with your actual password and remove the MONGODB_URI import from the top
    const connectionString = "mongodb+srv://admin:UrL6JiniLqODmmVD@cluster0.xqebfug.mongodb.net/?retryWrites=true&w=majority";

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export { connectDB };

