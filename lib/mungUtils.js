function getLocation(locationData) {
    return {
        formatted_query: locationData[0].display_name,
        latitude: locationData[0].lat,
        longitude: locationData[0].lon,
    }
}

function getWeather(weatherData) { 
    const response = weatherData.data.map(weatherThing => {
        return {
            forecast: weatherThing.weather.description,
            time: new Date(weatherThing.ts * 1000).toDateString(),
        };
    });
        const x = response.slice(0, 10);
        return x;

    }

function getReview(reviewData) { 
    const response = reviewData.businesses.map(reviewItem => {
        return {
            name: reviewItem.name,
            image_url: reviewItem.image_url,
            price: reviewItem.price,
            rating: reviewItem.rating,
            url: reviewItem.url,
        };
    });
    return response;
}

module.exports={
    getLocation,
    getWeather,
    getReview,
};