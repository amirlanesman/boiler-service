const axios = require('axios').default;

const http = process.env.BLYNK_HTTP || 'http';
const blynkHost = process.env.BLYNK_HOST || '188.166.206.43';
const blynkId = process.env.BLYNK_ID || 'a64d570d48ca435db453e95c727ca6f0';

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