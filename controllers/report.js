const { crime } = require('../db');

module.exports.addReport = async (c, status) => {
  console.log(c);
  const json = {
    address: c.location.address,
    lat: c.location.lat,
    long: c.location.long,
  };

  await crime.create({
    data: {
      codename: c.codeName,
      locationtype: c.locationType,
      location: json,
      reportdate: new Date(c.reportDate),
      reportedby: c.reportedBy,
      status: status,
    },
  });
};

module.exports.getReport = (uid) => {
  return crime.findMany({
    where: {
      reportedby: uid,
    },
  });
};

module.exports.getAllApprovedReports = () => {
  return crime.findMany({
    where: {
      status: 'approved',
    },
    orderBy: [
      {
        reportdate: 'desc',
      },
    ],
  });
};

module.exports.getAllApprovedReportsTop = (take) => {
  return crime.findMany({
    where: {
      status: 'approved',
    },
    orderBy: [
      {
        reportdate: 'desc',
      },
    ],
    take: take,
  });
};

module.exports.getAllPendingReports = () => {
  return crime.findMany({
    where: {
      status: 'pending',
    },
  });
};

module.exports.approvePendingReport = (reports) => {
  console.log(reports);
  return crime.updateMany({
    where: { id: { in: reports } },
    data: {
      status: 'approved',
    },
  });
};
