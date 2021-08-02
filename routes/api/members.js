// Get all members
const express = require('express');

const router = express.Router();
const members = require('../../Members');

router.get('/', (request, response) => response.json(members));

// Get single member
router.get('/:id', (request, response) => {
  const found = members.some((member) => member.id === parseInt(request.params.id, 10));

  if (found) {
    response.json(members.filter((member) => member.id === parseInt(request.params.id, 10)));
  } else {
    response.status(400).json({
      msg: `No member with id: ${request.params.id} found`,
      Note: 'Try a valid ID',
    });
  }
});

module.exports = router;
