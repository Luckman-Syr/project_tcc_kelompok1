const mysql = require('mysql')

const db = mysql.createPool({
    host: '192.168.234.128',
    user: 'root',
    password: 'alvaro123',
    database: 'karyawan_kantor',
    port: '/var/run/mysqld/mysqld.sock'
})

exports.db = db;