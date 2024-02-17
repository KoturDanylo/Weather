import express, { Request, Response } from "express";
import fetch from "node-fetch";
import swaggerUi from "swagger-ui-express";

import { configs } from "./configs";
import swaggerDocument from "./swagger.json";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/weather", async (req: Request, res: Response) => {
  try {
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
    let url = `${baseUrl}?q=${req.query.city}&appid=${configs.API_KEY}&units=metric`;
    if (req.query.lat && req.query.lon) {
      url = `${baseUrl}?lat=${req.query.lat}&lon=${req.query.lon}&appid=${configs.API_KEY}&units=metric`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        res.send(data);
      });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = configs.PORT;
app.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
