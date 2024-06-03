import app from "./index.js";
import connectDb from "./config/mongooseconfig.js";

app.listen(process.env.PORT, () => {
  console.log(`server is listening on ${process.env.PORT} `);
  connectDb()
});
