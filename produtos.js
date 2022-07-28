const express = require("express");
const app = express();
const port = process.env.PORT;

const pg = require("pg");
const cors = require("cors");
// para ver o que vem do formulario do postman
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const consStr = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString: consStr, ssl: { rejectUnauthorized: false } });


app.get('/produtos', (req, res) => {
  pool.connect((err, client) => {
    if (err) {
      return res.status(401).send({
        message: 'Erro ao conectar com a database'
      })
    }

    client.query('select * from produtos', (error, result) => {
      if (error) {
        res.send({
          message: 'Erro ao consultar dados',
          erro: error.message
        })
      }
      return res.status(200).send(result.rows)
    })
  })
})


app.listen(port, () => {
  console.log(`executando em http://localhost/${port}`);
});
