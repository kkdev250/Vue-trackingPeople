const peopleModel = require('../models/people');
const websockets = require('../websockets');

const handleAddPerson = async (req, res) => {
  const person = req.body;
  const newPerson = await peopleModel.addPerson(person);
  setInterval(function() { handleMoveOne(newPerson._id) }, 20000);
  res.send('personToAdd');
};

const handleUpdatePeopleList = async (req, res) => {
  console.log('http request GET \'/update\'');
  const people = await peopleModel.getPeopleList();
  res.send(people);
};

const handleGetPeopleList = async (req, res) => {
  //const people = await peopleModel.getPeopleList();
  console.log('http request GET \'/all\'');
  let run=false;
  setTimeout(() => run = true, 5000);
  setInterval(()=>{
    if (run) {
      peopleModel.moveAllPeople();
      websockets.broadcastFetchPeople();  
    }
  }, 1000);
  res.send('gathering data... wait for websocket \'fetch-people\' message');
};

const handleMove = async (req, res) => {
  const people = await peopleModel.moveAllPeople();
};

const handleMoveOne = async (id) => {
  await peopleModel.move(id);
};

const handleDeletePerson = async (req, res) => {
  const id = req.params.id;
  await peopleModel.deletePerson(id);
  websockets.broadcastFetchPeople();
};

module.exports = {
  handleAddPerson,
  handleGetPeopleList,
  handleMove,
  handleDeletePerson,
  handleUpdatePeopleList,
};
