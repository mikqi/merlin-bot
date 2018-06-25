import axios from 'axios'

const urlTest = "https://teamup.com/ksba33b1dec7c75214/events?startDate=2018-06-17&endDate=2018-06-23&tz=Asia%2FJakarta";
const eventUrl = "https://teamup.com/ksba33b1dec7c75214/events?";

export interface IEvents {
  id: string,
  series_id: string,
  remote_id: string,
  subcalendar_id: number,
  all_day: boolean,
  rrule: string,
  title: string,
  who: string,
  location: string,
  notes: string,
  version: string,
  readonly: boolean,
  tz: string,
  start_dt: string,
  end_dt: string,
  creation_dt: string,
}

const objToQueryString = (obj) => {
  const str = Object.keys(obj).map(function (key) {
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

export const getCurrentDate = (): string => {
  const date = new Date();
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  let dateString = '';
  let monthString = '';

  if (dd < 10) dateString = '0' + dd
  if (mm < 10) monthString = '0' + mm

  const today = `${yyyy}-${monthString ? monthString : mm}-${dateString ? dateString : dd}`
  return today;
}

export const getByDate = async (startDate, endDate) => {
  const query = objToQueryString({
    startDate,
    endDate,
  });
  const res = {
    error: null,
    data: null
  };
  try {
    res.data = (await axios.get(eventUrl + query)).data
  } catch (e) {
    res.error = e;
  }

  return res;
}

export const getTodayEvent = async () => {
  const query = objToQueryString({
    startDate: getCurrentDate(),
    endDate: getCurrentDate(),
  });
  const res = {
    error: null,
    data: null
  };
  try {
    res.data = (await axios.get(eventUrl + query)).data
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