import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT,
});

export const addReport = async (crime, uid) => {
  const data = await api.post('/report/add', {
    location: crime.location,
    codeName: crime.codeName,
    locationType: crime.locationType,
    reportDate: crime.reportDate,
    reportedBy: uid,
  });

  return data.data;
};

export const getReportsForUser = async (uid) => {
  const data = await api.get('/report/get', { params: { uid } });

  return data.data;
};

export const getAllReports = async () => {
  const data = await api.get('/report/getall');

  return data.data;
};

export const approveReport = async (reports) => {
  const data = await api.post('/report/approve', { reports });

  return data.data;
};

export const getTopAllReports = async (top) => {
  const data = await api.get(`/report/topgetall?top=${top}`);

  return data.data;
};

export const getAllReportsGeoJSON = async () => {
  const data = await api.get('/report/getall?type=geojson');

  return data.data;
};

export const getAllPendingReports = async () => {
  const data = await api.get('/report/getallpending');

  return data.data;
};

export const addUser = async (user) => {
  api.post('/user/add', { user }).then((res) => res);
};

export const getUser = async (uid) => {
  const data = await api.get('/user/get', { params: { uid } });

  return data.data;
};
