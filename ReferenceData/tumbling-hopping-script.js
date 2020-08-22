const fs = require('fs');

const eventsToGenerate = 60;
const timeBetweenEvents = 15;

function generateReferenceData() {

    let baseTime = new Date();
    baseTime.setHours(0, 0, 0, 0);

    let telemetryArray = [];
    for (let i = 0; i < eventsToGenerate; i++) {
        const eventTime = new Date(baseTime.setSeconds(baseTime.getSeconds() + timeBetweenEvents));
        const telemetry = {
            reading: {
                value: Math.round((30 + Math.round(Math.random() * 10) + Math.random()) * 100) / 100,
            },
            EventProcessedUtcTime: new Date(eventTime.getTime() + Math.random() + 250).toISOString(),
            PartitionId: 2,
            EventEnqueuedUtcTime: new Date(eventTime.getTime() + 150 * Math.random()).toISOString(),
            IoTHub: {
                MessageId: null,
                CorrelationId: null,
                ConnectionDeviceId: "Simulated_Device",
                ConnectionDeviceGenerationId: "636973266921021569",
                EnqueuedTime: new Date(eventTime.getTime() + 50 * Math.random()).toISOString(),
                StreamId: null
            }
        }
        telemetryArray.push(telemetry);
    }
    fs.writeFile('reference-data.json', JSON.stringify(telemetryArray), (error) => {
        if (error) return console.error(error);
    })
}

generateReferenceData();