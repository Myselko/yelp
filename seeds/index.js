const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB yelp-camp connected');
});

const sample = array => { array[Math.floor(Math.random() * array.length)] }

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++){
    let random1000 = Math.floor(Math.random() * 1000);
    let randomPlaces = Math.floor(Math.random() * 21);
    let randomDescriptors = Math.floor(Math.random() * 18);
    const camp = new Campground({
      title: `${descriptors[randomDescriptors]} ${places[randomPlaces]}`,
      location: `${sample(descriptors)}, ${sample(places)}`,
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})