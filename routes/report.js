const express = require('express');
const { checkToken, checkAdmin } = require('../middleware/checkAuth');
const {
  addReport,
  getReport,
  getAllApprovedReports,
  getAllPendingReports,
  getAllApprovedReportsTop,
  approvePendingReport,
} = require('../controllers/report');
const fs = require('fs');
const { crime } = require('../db');

const router = express.Router();

router.post('/add', checkToken, (req, res) => {
  if (req.user.role === 'admin') {
    addReport(req.body, 'approved');
  } else if (req.user.role === 'user') {
    addReport(req.body, 'pending');
  }
  res.send({ message: 'Success' });
});

router.get('/get', checkToken, async (req, res) => {
  if (req.user.uid === req.query.uid || req.user.role === 'admin') {
    const data = await getReport(req.query.uid);
    res.send(data);
  } else {
    res.status(401).send({
      message: 'error',
    });
  }
});

router.get('/getall', async (req, res) => {
  let data = {};
  try {
    data = await getAllApprovedReports();
    if (req.query.type == 'geojson') {
      return res.send({
        type: 'FeatureCollection',
        features: data.map((i) => ({
          type: 'Feature',
          id: i.id,
          properties: {
            codename: i.codename,
            address: i.location.address,
            reportdate: i.reportdate,
          },
          geometry: {
            coordinates: [i.location.long, i.location.lat],
            type: 'Point',
          },
        })),
      });
    }
    res.send(data);
  } catch (e) {
    res.status(401).send({
      message: e.message,
    });
  }
});

router.get('/topgetall', async (req, res) => {
  let data = {};
  let top = parseInt(req.query.top);
  try {
    data = await getAllApprovedReportsTop(top);
    if (req.query.type == 'geojson') {
      return res.send({
        type: 'FeatureCollection',
        features: data.map((i) => ({
          type: 'Feature',
          id: i.id,
          properties: {
            codename: i.codename,
            address: i.location.address,
            reportdate: i.reportdate,
          },
          geometry: {
            coordinates: [i.location.long, i.location.lat],
            type: 'Point',
          },
        })),
      });
    }
    res.send(data);
  } catch (e) {
    res.status(401).send({
      message: e.message,
    });
  }
});

router.get('/getallpending', checkAdmin, async (req, res) => {
  let data = {};
  try {
    data = await getAllPendingReports();
    res.send(data);
  } catch (e) {
    res.status(401).send({
      message: e.message,
    });
  }
});

router.post('/approve', checkAdmin, async (req, res) => {
  try {
    await approvePendingReport(req.body.reports);
    res.send({ message: 'success' });
  } catch (e) {
    res.status(401).send({
      message: e.message,
    });
  }
});

router.get('/test', (req, res) => {
  let results = [];
  const data = [];

  fs.readFile('./data.json', 'utf8', function (err, data) {
    data = JSON.parse(data).features;
    data.forEach((d) => {
      results.push({
        codeName: d.attributes.nibrs_code_name,
        id: d.attributes.report_number,
        location: {
          address: d.attributes.location,
          lat: d.attributes.lat,
          long: d.attributes.long,
        },
        locationType: d.attributes.location_type,
        reportDate: new Date(d.attributes.offense_start_date),
        reportedBy: 'admin',
        status: 'approved',
      });
    });
    res.send({ results });
  });
});

router.get('/testadd', checkToken, async (req, res) => {
  fs.readFile('./newData.json', 'utf8', function (err, data) {
    data = JSON.parse(data).results;
    //const d = data[0];
    data.forEach(async (d) => {
      const json = {
        address: d.location.address,
        lat: d.location.lat,
        long: d.location.long,
      };

      await crime.create({
        data: {
          codename: d.codeName,
          locationtype: d.locationType,
          location: json,
          reportdate: new Date(d.reportDate),
          reportedby: 'admin',
          status: 'approved',
        },
      });
      // db.collection('Crimes').doc(d.id).set(d);
    });
    res.send('yes');
  });
});

module.exports = router;
