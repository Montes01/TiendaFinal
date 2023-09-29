const express = require('express');
const bodyParser = require('body-parser');

let BuyProduct = require('./routes/BuyProduct');
let removeProduct = require('./routes/removeProduct');
let updateProduct = require('./routes/updateProduct');
const register = require('./routes/register'); 
const auth = require('./routes/auth'); 
const products = require('./routes/products'); 
const addProduct = require('./routes/addProduct');
const ShowUserInfo = require('./routes/ShowUserInfo');
const signingKey = require('./config/keys');
const cookieParser = require('cookie-parser');

const app = express()
  .use(bodyParser.json())
  .use(cookieParser(signingKey.SIGNING_KEY_COOKIE))

let port = 10101

app.use('/ShowUserInfo', ShowUserInfo);
app.use('/register', register);
app.use('/auth', auth);
app.use('/products', products);
app.use('/addProduct', addProduct);
app.use('/updateProduct', updateProduct);
app.use('/removeProduct', removeProduct);
app.use('/BuyProduct', BuyProduct);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});