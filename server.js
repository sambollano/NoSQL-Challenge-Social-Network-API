const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
mongoose.connect('mongodb://localhost/NoSQL-Challenge-Social-Network-Api',{useNewUrlParser: true}, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.set('debug', true)

app.use(require('./routes'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
