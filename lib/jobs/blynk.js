const blynk = require('../handlers/blynk');


module.exports = function(agenda) {

  agenda.define('set blynk state', async job => {
    await blynk.setBlynkState(job.attrs.data.state);
  });

  // More email related jobs
};