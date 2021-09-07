require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: "Car Rent API",
//       description: "Car Rental app API information",
//       contact: {
//         name: "William Jeremy Mandang",
//       },
//       servers: ["http://localhost:3000"],
//     },
//   },
// };

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  "/tmp/my-uploads",
  express.static(path.join(__dirname, "/tmp/my-uploads"))
);

const routes = require("./routes");
app.use(routes);

app.listen(PORT, () => {
  console.log("Listening on port : ", PORT);
});
