const fs = require("fs");
const fetch = require("node-fetch");
const { parse } = require("csv-parse");

const formURL =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfnNsC7cKomSMsgKB_34Gz57xSi60vLVz-g5FyYdY7neyKGFA/formResponse";

fs.createReadStream("./data.csv")
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", async function (row) {
    // console.log(row);

    let data = {
      "entry.1501457962": row[0],
      "entry.1078599149": row[1],
      "entry.788486213": row[2],
      "entry.533019433": row[3],
      "entry.632984414": row[4],
      "entry.1508935705": row[5],
      "entry.1219226401": row[6],
      token: "nZdwv4UBAAA.W5L0D1YohSk8dtrMWaUwEQ.fvJq-PLz9uJBActXGxlrhg",
    };

    let formBody = [];
    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    try {
      let response = await fetch(formURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      });
      console.log(response.status);
    } catch (err) {
      console.log(err.message);
    }
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });
