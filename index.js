import express from "express";
import axios from "axios";
import myCompliment from "cheer-me-up";

const app = express();
const port = 3000;
const API_URL = "https://random-d.uk/api/v2"

app.use(express.static("./public"));

app.get("/", async (req, res) => {
    try {
        let compliment = myCompliment.getCompliment();
        const result = await axios.get(API_URL + "/random");
        res.render("index.ejs", {
            randomDuck: JSON.stringify(result.data.url),
            compliment: compliment,
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server runnng on port ${port}`);
});