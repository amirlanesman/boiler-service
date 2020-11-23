const axios = require('axios').default;

const http = process.env.BLYNK_HTTP;
const blynkHost = process.env.BLYNK_HOST;
const blynkId = process.env.BLYNK_ID;

async function setBlynkState(state) {
  console.log('setting blynk state to: ' + (state ? '1' : '0'));
  try {
    const res = await axios.get(`${http}://${blynkHost}/${blynkId}/update/v2?value=${state ? '1' : '0'}`);
    // console.log({res});
    return (res.status >= 200 && res.status <= 299)
  } catch (error) {
    return false;
  }
}

module.exports = {setBlynkState}