var ExcelJS = require("exceljs");

const { MongoClient, Timestamp } = require("mongodb");

//given my mongodb atlas account url.
//you can replace the below url with your's, and check the working 
const url =
  "mongodb+srv://Admin:rzr46ZCZCsCJLhty@cluster0.bpo65.mongodb.net/DB1?retryWrites=true&w=majority";

exports.uploadFile = async (req, res) => {
  console.log(req.file.size);
  const fileSize = req.file.size;
  //error out when file size is gt 200kb, we can increase here.
  if (fileSize > 200000)
    res.status(413).json({ message: "Maximum allowed file size is 200kb" });
  else {
  const jsonData = await generateExcel();
  console.log("json data is");
  console.log(jsonData);
 
  try {
  //making the connect to mongodb
  const client = new MongoClient(url);
  await client.connect();
  const database = client.db("DB1");
  const movies = database.collection("Test");
  //here inserting all once, if file is large insert in limits
  movies.insertMany(jsonData, {ordered : false}).then((response) => res.status(200).json({ message: 'Data inserted into Mongodb Successfully!!!', response }))
  .catch(err =>  res.status(400).json({ message: 'Failed to upload the data to DB, try again !', err }) );
 /// res.send("done");
  }
  catch(e) {
    console.log(e)
  }
}
};


//Function to read excel using exceljs and convert to jsvacript
async function generateExcel() {
    let workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("uploads/Rohith.xlsx");
    const worksheet = workbook.getWorksheet(1);
    var json = [];
    var check = [];
    worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
      const rowObject = {};
      if (rowNumber == 1) {
        console.log(rowNumber);
        row.eachCell(function (cell, colNumber) {
          check.push(cell.value);
        });
      } else {
        row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
          rowObject[`${check[colNumber - 1]}`] = cell.value;
        });
        json.push(rowObject);
      }
    });
    return json;
  }
