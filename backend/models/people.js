const Datastore = require('nedb');
const calculations = require('../services/calculations');

/*db = new Datastore({
  filename: 'path/to/datafile',
  autoload: true,
  onload: err => {
    if (err) {
      console.error('Error while loading db', err)
    } else {
      console.log('database success!')
    }
  }
});*/
db = {};

db.people = new Datastore({
  filename: 'path/to/people',
  autoload: true,
  onload: err => {
    if (err) {
      console.error('Error while loading db', err)
    } else {
      console.log('database people success!')
    }
  }
});

const addPerson = person => {
  return new Promise(function (resolve, reject) {
    db.people.insert(person, function (err, doc) {
      if (err) {
        reject(err)
      } else {
        console.log(doc);
        resolve(doc)
      }
    })
  });
};

const deleteList = async (id) => {
  db.lists.remove({
    _id: id
  }, {}, function (err, numRemoved) {
    if (err) {
      console.log(err)
    }
  });
  return id;
};

const getPeopleList = () => {
  return new Promise(function (resolve, reject) {
    db.people.find({}, function (err, doc) {
      if (err) {
        reject(err)
        console.log(err)
      } else {
        resolve(doc)
      }
    })
  })
};

const deletePerson = async (id) => {
  db.people.remove({
    _id: id
  }, {}, function (err, numRemoved) {
    if (err) {
      console.log(err)
    }
  });
  return id;
};

const moveAllPeople = () => {
  return getPeopleList() 
    .then(people => movePeople(people));
};

const movePeople = people => {
  people.forEach(person => move(person._id)); 
};

const getPerson = id => {
  return new Promise(function (resolve, reject) {
    db.people.find({_id: id}, function (err, doc) {
      if (err) {
        reject(err)
        console.log(err)
      } else {
        //console.log(doc);
        resolve(doc[0])
      }
    })
  })
};

const makeCalculations = async (person) => {
  const movingAngle = calculations.getMovingAngle(person.movingAngle);
  const distance = calculations.getDistance();
  const lat = calculations.getPersonLat(person.lat, distance, movingAngle);
  const lng = calculations.getPersonLng(person.lng, distance, movingAngle);
  distInMeters = distanceBetween(person.lat, person.lng, lat, lng);
  await updatePosition( person._id, movingAngle, person.distance + distInMeters, lat, lng);
};

const move = async id => {
  getPerson(id)
   .then(person => makeCalculations(person));
};

const updatePosition = (id, movingAngle, distance, lat, lng) => new Promise(function (resolve, reject) {
  db.people.update({_id: id}, {$set: { lng: lng, lat: lat, movingAngle: movingAngle, distance: distance }}, function (err, doc) {
    if (err) {
      reject(err)
      console.log(err)
    } else {
      //console.log(doc)
      resolve(doc)
    }
  })
});

const distanceBetween = (p1lat, p1lng, p2lat, p2lng) => {
  const R = 6371e3;
  const φ1 = p2lat * Math.PI / 180,  λ1 = p2lng * Math.PI / 180;
  const φ2 = p1lat * Math.PI / 180, λ2 = p1lng * Math.PI / 180;
  const Δφ = φ2 - φ1;
  const Δλ = λ2 - λ1;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2)
        + Math.cos(φ1) * Math.cos(φ2)
        * Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const dist = R * c;
  return dist;
}

module.exports = {
  move,
  addPerson,
  getPeopleList,
  moveAllPeople,
  deletePerson,
};
