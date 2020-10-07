require('dotenv').config();
const moment = require('moment');
const agenda = require('./lib/agenda.js');
require('./lib/jobs/ewelink')(agenda)
require('./lib/jobs/blynk')(agenda)
const ewelink = require('./lib/handlers/ewelink')
const blynk = require('./lib/handlers/blynk')


const SWITCH_OFF_DELAY_MINUTES = parseInt(process.env.SWITCH_OFF_DELAY_MINUTES || '10')
const switchOffDelay = moment.duration(SWITCH_OFF_DELAY_MINUTES, 'minutes');

ewelink.openWebSocket(d => {
  if (!d || d.deviceid !== ewelink.deviceId) {
    return
  }
  if (d.params && d.params.switch) {
    console.log('ewelink changed state to: ' + d.params.switch);
    if (d.params.switch === 'on') {
      blynk.setBlynkState(true);
      console.log('starting boiler delay');
      agenda.schedule(moment().add(switchOffDelay), 'set ewelink state', {state: false});
    } else if (d.params.switch === 'off') {
      blynk.setBlynkState(false);
    } else {
      console.log('ewelink switch param unknown.');
    }
  }
})

agenda.start();