const mongoose = require("mongoose");

// define db connection string
const dbURI = "mongodb://localhost:27017/test";

// open mongoose connection at app start
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// monitor connection events
mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// graceful shutdown of db connection when app ends
process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});
process.on("SIGINT", () => {
  gracefulShutdown("app termination", () => {
    process.exit(0);
  });
});
process.on("SIGTERM", () => {
  gracefulShutdown("Heroku app shutdown", () => {
    process.exit(0);
  });
});

// employee schema
require("./employee");

// When you have a file like this one, you can easily copy it from application to application, because the events you’re listening for are always the same. All you have to do each time is change the database connection string. Remember that you also required this file into app.js, right near the top, so that the connection opens up early in the application’s life.
