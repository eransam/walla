import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import urlExist from "url-exist";
import URL from "./models/urlModel.js";
import cors from "cors";
import { log } from "console";


const __dirname = path.resolve();

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/theurl", (err) => {
  if (err) {
    throw err;
  }
  console.log("Database connected successfully");
});

// Middleware to validate url
const validateURL = async (req, res, next) => {
  const { url } = req.body;
  const isExist = await urlExist(url);
  if (!isExist) {
    return res.json({ message: "Invalid URL", type: "failure" });
  }
  next();
};

async function getAllUrl(){
    return URL.find()
}

//localhost:8000 מביא את הדף הראשי ב
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


app.post("/link", validateURL,async (req, res) => {
console.log("test");
    console.log("req.body: " ,req.body);
  const { url } = req.body;
  const allUrls = await getAllUrl();
    if (url.startsWith("http://localhost:8000/")) {
        const isUrlShort = url.slice(22);
        console.log("isUrlShort: " ,isUrlShort);
        for (const iterator of allUrls) {
            if (iterator.id === isUrlShort) {
                const realUrl = iterator.url
                res.json({ message: realUrl, type: "success" });                
            }

            
        }


    }else{
    // Generate a unique id to identify the url in the database
  let id = nanoid(7);

  let newURL = new URL({ url, id });
  try {

    newURL.save();
  } catch (err) {
    res.send("An error was encountered! Please try again.");
  }
  // Send the server address with the unique id
  res.json({ message: `http://localhost:8000/${newURL.id}`, type: "success" });

    }




});


// איפיאי שמביא אותה ללינק המקורי בעת כניסה ללינק המקוצר
app.get("/:id", async (req, res) => {
  const id = req.params.id;

  const originalLink = await URL.findOne({ id });

  if (!originalLink) {
    return res.sendFile(__dirname + "/public/404.html");
  }
  res.redirect(originalLink.url);
});

app.listen(8000, () => {
  console.log("App listening on port 8000");
});
