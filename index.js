// import extensions
import express from "express";
import axios from "axios";
import myCompliment from "cheer-me-up";

const app = express();
const port = 3000;
const API_URL = "https://random-d.uk/api/v2"

app.use(express.static("./public"));


//  hit up the homepage
app.get("/", async (req, res) => {
    try {
        //get a compliment from the npm cheer-me-up package 
        let compliment = myCompliment.getCompliment();
        //use axios to get a random duck image
        const result = await axios.get(API_URL + "/random");
        //render the homepage
        res.render("index.ejs", {
            randomDuck: JSON.stringify(result.data.url),
            compliment: compliment,
        });
    } catch (error) {
        // when there is an error, log the error and send an error message to the user
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server runnng on port ${port}`);
});