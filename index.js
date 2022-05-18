const express = require("express")
const app = express()
const port = 3000
const ServerTime = require("./models/servertime")
const PhoneBills = require("./models/phonebills")

app.use(express.json());

// Endpoint to get the server time
app.get("/servertime", (req, res) => {
  // Create a new instance of ServerTime
  let sti = new ServerTime(req.query.when)
  res.status(sti.getServerTime.code).send(sti.getServerTime.return)
})

// Endpoint to get the phone bills
app.post("/phonebills", (req, res) => {
  // Create a new instance of PhoneBills
  let pbi = new PhoneBills(req.body.content)
  res.status(200).send({bills: pbi.bills})
})

app.listen(port, () => {
  console.log(`API running on port ${port}`)
})
