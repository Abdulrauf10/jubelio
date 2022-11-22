const pool = require('../db');
const request = require('request')

module.exports = {
  getAllProducts: async (req, res) => {
    request.get(
        { url: "https://codetesting.jubelio.store/wp-json/wc/v3/products?consumer_key=ck_1cbb2c1902d56b629cd9a555cc032c4b478b26ce&consumer_secret=cs_7be10f0328c5b1d6a1a3077165b226af71d8b9dc" }, 
        function(error, response, body) { 
            if (!error && response.statusCode == 200) { 
                // get data from body ... e.g. title
                const { name, sku, image, price, description } = req.body;

                // store in Postgresql
                pg.connect(connectionString, (err, client, done) => {
                    done();
                    // Handle connection errors
                    if(err) {
                        console.log(err);
                        return res.status(500).json({success: false, data: err});
                    }
                    // SQL Query > Insert Data
                    const getData = pool.query('INSERT INTO products (name, sku, image, price, description) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, sku, image, price, description]);

                    res.json(getData.rows); 
                })
            } 
        }
    );    
  },

  postProduct: async (req, res) => {
    try {
      const {name, sku, image, price, description} = req.body;

      const postData = await pool.query('INSERT INTO products (name, sku, image, price, description) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, sku, image, price, description]);

      res.status(202).json(postData.rows[0])
    } catch (error) {
      res.status(402).json(error.message)
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, sku, image, price, description } = req.body;

      const updateRoles = await pool.query('UPDATE products SET name = $1, sku = $2, image=$3, price=$4, description=$5 WHERE id = $6', [name, sku, image, price, description, id])

      res.status(203).json('product was updated');
    } catch (error) {
      res.status(403).json(error.message)
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteData = await pool.query('DELETE FROM role WHERE id = $1', [id]);

      res.status(205).json('data was deleted')
    } catch (error) {
      res.status(405).json(error.message)
    }
  }
}