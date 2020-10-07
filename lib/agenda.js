const Agenda = require('agenda');

const mongourl = process.env.MONGODB_URL || 'localhost:27017/agenda-test';
const agendaCollection = process.env.AGENDA_COLLECTION || 'agendaJobs'
const connectionOpts = {db: {address: mongourl, collection: agendaCollection}};

const agenda = new Agenda(connectionOpts);

module.exports = agenda;