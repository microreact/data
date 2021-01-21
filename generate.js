const axios = require("axios");
const Papaparse = require("papaparse");

function fetchCsv(csv) {
  return new Promise((resolve, reject) => {
    Papaparse.parse(
      csv,
      {
        complete: resolve,
        error: reject,
      },
    );
  });
}

async function main() {
  const res = await axios("https://docs.google.com/spreadsheets/d/e/2PACX-1vQt0l5CF2hyN3ajkVS_Lx5zPwi0eZ1bD675FPKyt2tKoYPkNynfSLYw6WOi_j0MQTgSsazlfrxOrGtP/pub?gid=0&single=true&output=csv");
  const csv = Papaparse.parse(res.data);
  // remove header row
  csv.data.shift();
  const lines = [];
  for (const row of csv.data) {
    // remove type column
    row.pop();
    if (row[1] && row[2]) {
      row[1] = parseFloat(row[1]);
      row[2] = parseFloat(row[2]);
      // lines.push(
      //   [
      //     row[0],
      //     [ row[1], row[2], row[3] ],
      //   ]
      // );

      lines.push(
        [
          row[0],
          row[2],
          row[1],
          row[3],
        ]
      );
    }
  }

  return JSON.stringify(
    lines,
    null,
    2,
  );
}

main()
  .then(console.log)
  .catch(console.error);
