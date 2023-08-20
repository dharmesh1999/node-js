const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Your API endpoint
app.post('/get-products', async (req, res) => {
  const apiKey = '4NKQ3-815C2-8T5Q2-16318-55301';
  const sessionId = req.body.session_id;
  const authToken = req.body.auth_token;

  try {
    // Make a POST request to the external API
    const response = await axios.post(
      'https://dev-test.cimet.io/plan-list',
      {
        session_id: sessionId
      },
      {
        headers: {
          'Api-key': apiKey,
          'Auth-token': authToken
        }
      }
    );

    const responseData = response.data;
    res.json(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
