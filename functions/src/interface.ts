import axios from 'axios'
import { event } from 'firebase-functions/lib/providers/analytics';

const urlTest = "https://teamup.com/ksba33b1dec7c75214/events?startDate=2018-06-17&endDate=2018-06-23&tz=Asia%2FJakarta";
const eventUrl = "https://teamup.com/ksba33b1dec7c75214/events?";

const objToQueryString = (obj) => {
  var str = Object.keys(obj).map(function(key) {
    return key + '=' + obj[key];
  }).join('&');

  return str;
}


const testGet = async () => {
  axios.get(urlTest)
  .then(function (res) {
    return res.data
  })
  .catch(function (error) {
    console.log(error);
  })
};

const checkDate = (startDate, endDate) => {
  // const today = new Date();
  // const dd = today.getDate();
  // const mm = today.getMonth()+1;
  // const yyyy = today.getFullYear();
}

const getCurrentDate = () => {
  let date = new Date();
  let dd = date.getDate();
  let mm = date.getMonth()+1;
  const yyyy = date.getFullYear();

  let dateString = '';
  let monthString = '';

  if(dd<10) dateString = '0'+dd
  if(mm<10) monthString = '0'+mm

  const today = `${yyyy}-${monthString ? monthString: mm}-${dateString  ? dateString: dd}`
  return today;
}

const getByDate = async (startDate, endDate) => {
  const query = objToQueryString({
    startDate: startDate,
    endDate: endDate,
  });
  let res = {
    error: null,
    data: null
  };
  try {
    res.data = (await axios.get(eventUrl+query)).data
  } catch (e) {
    res.error = e;
  }

  return res;
}

const getTodayEvent = async () => {
  const query = objToQueryString({
    startDate: getCurrentDate(),
    endDate: getCurrentDate(),
  });
  let res = {
    error: null,
    data: null
  };
  try {
    res.data = (await axios.get(eventUrl+query)).data
  } catch (e) {
    res.error = e;
  }
  return res;
}

export default {
  testGet,
  getTodayEvent,
  getByDate,
};