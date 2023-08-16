const fetch = require("node-fetch");
const fs = require("fs");

const { parse } = require("csv-parse");

const formURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc6r_MQp21Vh12HmbgxBQQcGyGtofzx0LF-BQ4jzAQV4iwFrQ/formResponse";

fs.createReadStream("./data.csv")
  .pipe(parse({ delimiter: "\t", from_line: 2 }))
  .on("data", async function (row) {
    // console.log(row);

    let data = {
      "entry.829858489": row[0], //Name
      "entry.944309040": row[1], //Roll
      "entry.367650432": row[2], //Adhaar
      "entry.945382983": row[3], //Branch
      "entry.741637452": row[4], //Phone
      emailAddress: row[5],
      "entry.706109290": row[6], //No. of Passes
    };

    let formBody = [];
    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    //   console.log(formBody);
    let response = await fetch(formURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    console.log(response.status);
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });
