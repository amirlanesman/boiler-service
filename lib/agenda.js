const Agenda = require('agenda');

const connectionOpts = {db: {address: 'localhost:27017/agenda-test', collection: 'agendaJobs'}};

const agenda = new Agenda(connectionOpts);

module.exports = agenda;