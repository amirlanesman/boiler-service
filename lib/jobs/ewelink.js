const ewelink = require('../handlers/ewelink')

module.exports = function(agenda) {

  agenda.define('set ewelink state', async job => {
    await ewelink.setDevicePowerState(job.attrs.data.state);
  });

  // More email related jobs
};