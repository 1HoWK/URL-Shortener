const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

// create instance of express
const app = express();
const port = 8000;

app.use(cors());
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// POST endpoint to validate long url and generate unique key
app.post("/url", (req, res) => {
  // regex expression
  const urlPattern = new RegExp(
    /^(https?:\/\/)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
  );

  // get the long url from request body
  const longUrl = req.body.url;
  console.log("1. Long URL is " + longUrl);

  // validate the long url with the regex expresssion above
  if (urlPattern.test(longUrl)) {
    // valid long url
    console.log("2. Valid URL");

    // search if it been generated before
    const recordExists = getRecordByUrl(longUrl, urlRecords);

    if (recordExists) {
      // long url exists
      console.log("3. Long URL exists");

      // create a record
      const existingRecord = {
        key: recordExists.key,
        long_url: recordExists.long_url,
      };

      // response back the record
      res.status(201).json(existingRecord);
    } else {
      // long url doesn't exist

      // create a new uuid
      const uuidkey = uuidv4();

      // create a record
      const newRecord = {
        key: uuidkey,
        long_url: longUrl,
        count: 0,
      };

      // add into existing records
      urlRecords.push(newRecord);

      // response back the record
      res.status(201).json({ key: uuidkey, long_url: longUrl });
      console.log("3. Generated key is " + uuidkey);
    }
  } else {
    // invalid long url
    res.status(200).json({ errorDescription: "Error: Invalid URL" });
    console.log("2. Error: Invalid URL");
  }
});

// GET endpoint to redirect user to long url
app.get("/url/:key", (req, res) => {
  // get the key from localhost param
  let key = req.params.key;

  // search if the key exists
  const recordExists = getRecordByKey(key, urlRecords);
 
  if (recordExists) {
    // Record exists

    // redirect to the long url
    res.redirect(recordExists.long_url);

    // increase the number of visit
    recordExists.count++;
  } else {
    // Record doesn't exists

    // return HTTP 404 Not Found
    res.status(404).send("HTTP 404 Not Found. Record doesn't exist");
  }
});

// GET endpoint to fetch all the existing records
app.get("/shorten_url_records", (req, res) => {
  res.send(urlRecords);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// existing records
const urlRecords = [
  {
    key: "5b1ce05a-1e26-4576-ae2f-f23cced4f5f9",
    long_url: "http://www.facebook.com/",
    count: 0,
  },
  {
    key: "7108fad9-2ff8-42a5-8aab-fadf2b065759",
    long_url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
    count: 0,
  },
];

// search existing records by long url
const getRecordByUrl = (url, records) => {
  return records.find((record) => record.long_url === url);
};

// search existing record by key
const getRecordByKey = (key, records) => {
  return records.find((record) => record.key === key);
};
