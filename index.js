let google = require('googleapis');
let authentication = require("./authentication");
var http = require('http');
var port = process.env.port || 3000;

function getData(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1Fi7zzcBevPMojpDo3tqaKU_kDOiuaTm9kJUXHAxEAtk',
    range: 'Sheet1!A2:C', //Change Sheet1 if your worksheet's name is something else
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    } 
    var rows = response.values;
    if (rows.length === 0) {
      console.log('No data found.');
    } else {
      for (var i in rows) {
        var row = rows[i];
        console.log(row.join(", "));
      }
    }
  });
}



authentication.authenticate().then((auth)=>{
  getData(auth);
  http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello Web Designer');
    response.end;
  }).listen(port);
});
