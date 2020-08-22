const fs = require("fs");

const eventsToGenerate = 60;

function generateReferenceData() {
  let baseTime = new Date();
  baseTime.setHours(0, 0, 0, 0);
}

generateReferenceData();
