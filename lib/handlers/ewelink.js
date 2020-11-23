const ewelink = require('ewelink-api');

const connection = new ewelink({
  
  phoneNumber: process.env.EWELINK_PHONENUMBER,
  password: process.env.EWELINK_PASSWORD,
  region: 'eu',
});

const deviceId =  process.env.EWELINK_DEVICE_ID;

async function setDevicePowerState(state) {
  console.log('setting ewelink device power state to: ' + (state ? 'on' : 'off'));
  await connection.getCredentials();
  const device = await connection.setDevicePowerState(deviceId, state ? 'on' : 'off');
  // console.log({device});
  return device;
}

async function openWebSocket(callback) {
  await connection.getCredentials();
  
  // call openWebSocket method with a callback as argument
  const socket = await connection.openWebSocket(async data => {
    // data is the message from eWeLink
    // console.log('ewelink socket message:', data);
    callback(data)
  });
  return socket;
}

module.exports = {setDevicePowerState, openWebSocket, deviceId}