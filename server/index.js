const express = require ('express');
const app = express();
const cors = require ('cors');
const router = require('./route/route')

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(5000, () => {
  console.log('app is running on port 5000')
})