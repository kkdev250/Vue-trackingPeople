const Router = require('express').Router;
const peopleController = require('../controllers/people');

const router = Router();

router.get('/all', peopleController.handleGetPeopleList);
router.get('/update', peopleController.handleUpdatePeopleList);
router.put('/move', peopleController.handleMove);
router.post('/new', peopleController.handleAddPerson);
router.delete('/:id', peopleController.handleDeletePerson);

module.exports = router;
