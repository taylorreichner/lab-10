const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request =  require('superagent');
const { getWeather, getLocation, getReview } = require('./mungUtils.js');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); 


app.get('/location', async (req, res) => {
  try {
    const city = req.query.search;

    const location = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${city}&format=json`);

    const response = getLocation(location.body)
    console.log(response);
    res.json(response);
  
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async (req, res) => {
  try {
      const lat = req.query.latitude;
      const lon = req.query.longitude;

      const weather = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_KEY}`)
      const response = getWeather(weather.body)
      res.json(response);
    } catch(e) {
    
      res.status(500).json({ error: e.message });
    }

});

  app.get('/reviews', async (req, res) => { 
 try { const lat = req.query.latitude;
  const lon = req.query.longitude;

  const review = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`).set('Authorization', `Bearer ${process.env.YELP_KEY}`);

  const response = getReview(review.body) 
  
  res.json(response);
} catch(e) {

  res.status(500).json({ error: e.message });
}

});

app.use(require('./middleware/error'));

module.exports = app;
