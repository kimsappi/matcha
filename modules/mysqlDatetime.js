const mysqlDatetime = date => date.toISOString().slice(0, 19).replace('T', ' ');

module.exports = mysqlDatetime;
