require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    
    afterAll(done => {
      return client.end(done);
    });

    test('returns portland', async () => {

      const expectation = 
        {
          "formatted_query": "Portland, Multnomah, Oregon, USA",
          "latitude": "45.5202471",
          "longitude": "-122.6741949"
      }
      

      const data = await fakeRequest(app)
        .get('/location?search=portland')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    
    test('returns snow', async () => {

      const expectation = [
        {
            "forecast": "Heavy snow",
            "time": "Fri Feb 26 2021"
        },
        {
            "forecast": "Light snow",
            "time": "Sat Feb 27 2021"
        },
        {
            "forecast": "Light snow",
            "time": "Sun Feb 28 2021"
        },
        {
            "forecast": "Clear Sky",
            "time": "Mon Mar 01 2021"
        },
        {
            "forecast": "Light snow",
            "time": "Tue Mar 02 2021"
        },
        {
            "forecast": "Snow",
            "time": "Wed Mar 03 2021"
        },
        {
            "forecast": "Heavy snow",
            "time": "Thu Mar 04 2021"
        },
        {
            "forecast": "Light snow",
            "time": "Fri Mar 05 2021"
        },
        {
            "forecast": "Heavy snow",
            "time": "Sat Mar 06 2021"
        },
        {
            "forecast": "Heavy snow",
            "time": "Sun Mar 07 2021"
        }
      ];
    

      const data = await fakeRequest(app)
        .get('/weather?latitude=34&longitude=76')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    test('returns reviews', async () => {

      const expectation = [
        {
            "name": "Voodoo Doughnut - Old Town",
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/qHrzQy5ih2Sjhn7MdsCASw/o.jpg",
            "price": "$",
            "rating": 3.5,
            "url": "https://www.yelp.com/biz/voodoo-doughnut-old-town-portland-2?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Andina Restaurant",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/Ij9yv97Ch6NwKhNdpezRhw/o.jpg",
            "price": "$$$",
            "rating": 4.5,
            "url": "https://www.yelp.com/biz/andina-restaurant-portland?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Lechon",
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/wxLJSjqdB0v3wZSRqyNweg/o.jpg",
            "price": "$$",
            "rating": 4.5,
            "url": "https://www.yelp.com/biz/lechon-portland?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Luc Lac",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg",
            "price": "$$",
            "rating": 4,
            "url": "https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Deschutes Brewery Portland Public House",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/a-Av4dG6Xv3f1_XysFj4ow/o.jpg",
            "price": "$$",
            "rating": 4,
            "url": "https://www.yelp.com/biz/deschutes-brewery-portland-public-house-portland?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Portland City Grill",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/-N8P6cTACCKnSuJaqeCyXg/o.jpg",
            "price": "$$$",
            "rating": 4,
            "url": "https://www.yelp.com/biz/portland-city-grill-portland-7?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Cheryl’s on 12th",
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/w1tcp-5xJyQz19HH05JoVA/o.jpg",
            "price": "$$",
            "rating": 4.5,
            "url": "https://www.yelp.com/biz/cheryl-s-on-12th-portland?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Screen Door",
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/lqmMYlLRV-aoH73koWA6Ew/o.jpg",
            "price": "$$",
            "rating": 4.5,
            "url": "https://www.yelp.com/biz/screen-door-portland?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Q Restaurant & Bar",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/jAH0XyZe5N8YTrOy71SuJg/o.jpg",
            "price": "$$",
            "rating": 4.5,
            "url": "https://www.yelp.com/biz/q-restaurant-and-bar-portland?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Nong's Khao Man Gai",
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/jtp9n8HTjid4lEeXlcKKiA/o.jpg",
            "price": "$$",
            "rating": 4.5,
            "url": "https://www.yelp.com/biz/nongs-khao-man-gai-portland-2?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Grassa",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/zloG1rU5-15Q4MVmf8inbA/o.jpg",
            "price": "$$",
            "rating": 4,
            "url": "https://www.yelp.com/biz/grassa-portland?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Cuon - Vietnamese Street Food",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/Zetji_yDJJDG8eksunYiTg/o.jpg",
            "price": "$$",
            "rating": 4.5,
            "url": "https://www.yelp.com/biz/cuon-vietnamese-street-food-portland-3?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Salt & Straw",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/r6y-0Q2z3cnx1bQKxn-iHw/o.jpg",
            "price": "$$",
            "rating": 4.5,
            "url": "https://www.yelp.com/biz/salt-and-straw-portland-2?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Stumptown Coffee Roasters",
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/ZRKWUoGRDo1FryxlHfooRw/o.jpg",
            "price": "$",
            "rating": 4,
            "url": "https://www.yelp.com/biz/stumptown-coffee-roasters-portland?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Ground Kontrol Classic Arcade",
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/oU5nd95LfA3okpd9J_uPWg/o.jpg",
            "price": "$",
            "rating": 4,
            "url": "https://www.yelp.com/biz/ground-kontrol-classic-arcade-portland-2?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Le Pigeon",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/ARlFgwCNq62izXYf1TUQiA/o.jpg",
            "price": "$$$",
            "rating": 4.5,
            "url": "https://www.yelp.com/biz/le-pigeon-portland-2?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Olympia Provisions",
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/w8w2mkIrowArbwpzIInq9g/o.jpg",
            "price": "$$",
            "rating": 4.5,
            "url": "https://www.yelp.com/biz/olympia-provisions-portland-2?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Lardo",
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/b0E-cDYYiWuvBxFH-YPONA/o.jpg",
            "price": "$$",
            "rating": 4,
            "url": "https://www.yelp.com/biz/lardo-portland-4?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Mediterranean Exploration Company",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/AwxZ3eb04OiVH-92xKf_jg/o.jpg",
            "price": "$$",
            "rating": 4.5,
            "url": "https://www.yelp.com/biz/mediterranean-exploration-company-portland-2?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        },
        {
            "name": "Lan Su Chinese Garden",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/gY4shaDsFS6IfRH2fyMTnw/o.jpg",
            "rating": 4.5,
            "url": "https://www.yelp.com/biz/lan-su-chinese-garden-portland?adjust_creative=ZPEXPICaXNWRxl_91rZMiQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ZPEXPICaXNWRxl_91rZMiQ"
        }
    ];
      

      const data = await fakeRequest(app)
        .get('/reviews?latitude=45.5202471&longitude=-122.6741949')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

  });
});
