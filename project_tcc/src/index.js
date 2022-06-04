const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { db } = require('./model/dbConnection')

const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/api/readKaryawan', (req, res) => {
    const sqlQuery = "SELECT * FROM karyawan"
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
            console.log(result)
        }
    })
})

app.put('/api/readKaryawan/id', (req, res) => {
    let kode = req.body.kode;
    const sqlQuery = "SELECT * FROM karyawan WHERE kode_id LIKE ?"
    db.query(sqlQuery, kode, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
            console.log(result)
        }
    })
})

//create
app.post('/api/createKaryawan', (req, res) => {
    let kode_id = req.body.kode_id;
    let nama = req.body.nama;
    let no_tlp = req.body.no_tlp;
    let email = req.body.email;
    let tgl_lahir = req.body.tgl_lahir;
    let alamat = req.body.alamat;
    let status = req.body.status;
    let gaji = req.body.gaji;

    const sqlQuery = "INSERT INTO karyawan(kode_id, nama, no_tlp, email, tgl_lahir,alamat,status, gaji ) VALUES(?,?,?,?,?,?,?,?)"
    db.query(sqlQuery, [kode_id, nama, no_tlp, email, tgl_lahir, alamat, status, gaji], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
            console.log(result)
        }
    })

})

//delete
app.delete("/api/deleteKaryawan", (req, res) => {
    const kode = req.body.kode;

    const sqlQuery = "DELETE FROM karyawan WHERE kode_id like ?"
    db.query(sqlQuery, kode, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
            console.log(result)
        }
    })
})

//update
app.put("/api/updateKaryawan", (req, res) => {
    let kode_id = req.body.kode_id;
    let nama = req.body.nama;
    let no_tlp = req.body.no_tlp;
    let email = req.body.email;
    let tgl_lahir = req.body.tgl_lahir;
    let alamat = req.body.alamat;
    let status = req.body.status;
    let gaji = req.body.gaji;

    const sqlQuery = "UPDATE karyawan SET nama = ?, no_tlp = ?, email = ?, tgl_lahir = ?, alamat = ?, status = ?, gaji= ? WHERE kode_id = ?"
    db.query(sqlQuery, [nama, no_tlp, email, tgl_lahir, alamat, status, gaji, kode_id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
            console.log(result)
        }
    })
})


const listener = app.listen(3030, () => {
    console.log('server berjalan diport ' + listener.address().port)
})