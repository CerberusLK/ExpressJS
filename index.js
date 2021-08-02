const express = require('express');
const path = require('path');
const members = require('./Members');
const logger = require('./middleware/logger');

const app = express();

// // Init middleware
// app.use(logger);

// Get all members
app.get('/api/members', (request, response) => response.json(members));

// Get single member
app.get('/api/members/:id', (request, response) => {
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

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
