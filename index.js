const express = require('express');
const appDebugger= require('debug')('app:students:Debug')
const student_router = require('./routers/students')
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express()
const port = 3000;
app.use(express.json())
app.use(bodyParser.json());
app.use('/students',student_router);
app.listen(port, () => appDebugger(`Student app listening on port ${port}!`))