const { db } = require('../firebase');
const { v4: uuidv4 } = require('uuid');


module.exports.addReport  = (crime, status) =>{
    db.collection('Crimes').doc(uuidv4()).set({
        location: crime.location,
        codeName: crime.codeName,
        locationType:crime.locationType,
        reportDate: crime.reportDate,
        status: status
    })
}
