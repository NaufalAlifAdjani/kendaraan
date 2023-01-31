// inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

// implementation
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sewa_kendaraan"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

// end-point akses data kendaraan (menampilkan seluruh kendaraan)
app.get("/kendaraan", (req, res) => {
    // create sql query
    let sql = "select * from kendaraan"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                kendaraan: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point akses data kendaraan berdasarkan id_kendaraan tertentu
app.get("/kendaraan/:id", (req, res) => {
    let data = {
        id_kendaraan: req.params.id
    }
    // create sql query
    let sql = "select * from kendaraan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                kendaraan: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data kendaraan
app.post("/kendaraan", (req,res) => {

    // prepare data
    let data = {
        nopol: req.body.nopol,
        warna: req.body.warna,
        kondisi_kendaraan: req.body.kondisi_kendaraan
    }

    // create sql query insert
    let sql = "insert into kendaraan set ?" //tanda tanya memasukkan value ke tabel kendaraan

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data kendaraan
app.put("/kendaraan", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            nopol: req.body.nopol,
            warna: req.body.warna,
            kondisi_kendaraan: req.body.kondisi_kendaraan
        },

        // parameter (primary key)
        {
            id_kendaraan: req.body.id_kendaraan
        }
    ]

    // create sql query update
    let sql = "update kendaraan set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data kendaraan berdasarkan id_kendaraan
app.delete("/kendaraan/:id", (req,res) => {
    // prepare data
    let data = {
        id_kendaraan: req.params.id
    }

    // create query sql delete
    let sql = "delete from kendaraan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})
app.listen(8000, () => {
    console.log("Kendaraan coy")
})