// const fs = require('fs');

// fs.readFile('./data.csv', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

// let data = '';

// for (let i = 0; i < 1000000; i++) {
//   data += `Name-${i},Roll-${i},Adhaar-${i},Branch-${i},Phone-${i},email${i}@gmail.com\n`;
// }

// console.log(data);

// fs.writeFile('./test.csv', data, (err) => {
//   if (err) console.log(err);
//   else {
//     console.log('File written successfully\n');
//   }
// });

const fetch = require('node-fetch');
const fs = require('fs');

const { parse } = require('csv-parse');

const formURL =
  'https://docs.google.com/forms/d/e/1FAIpQLSc6r_MQp21Vh12HmbgxBQQcGyGtofzx0LF-BQ4jzAQV4iwFrQ/formResponse';

fs.createReadStream('./test.csv')
  .pipe(parse({ delimiter: ',', from_line: 1 }))
  .on('data', async function (row) {
    // console.log(row);

    let data = {
      'entry.829858489': row[0], //Name
      'entry.944309040': row[1], //Roll
      'entry.367650432': row[2], //Adhaar
      'entry.945382983': row[3], //Branch
      'entry.741637452': row[4], //Phone
      'emailAddress': row[5],
      'entry.706109290': '2', //No. of Passes
    };

    let formBody = []
    for (const property in data) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    //   console.log(formBody);
    let noOfResponses = 0;
    try {
        let response = await fetch(formURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          body: formBody,
        });
        noOfResponses++;
        console.log(`${response.status} -- ${noOfResponses}`)
    } catch(err) {
        console.log(err.message);
    }
    

  })
  .on('end', function () {
    console.log('finished');
  })
  .on('error', function (error) {
    console.log(error.message);
  });
