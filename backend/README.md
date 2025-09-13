# Backend Setup

This folder will contain your Node.js backend code. You can start by creating an `index.js` or `server.js` file and installing Express or your preferred framework.

## Example

1. Create a file named `server.js`:

```js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from Node backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

2. Install Express:

```bash
npm install express
```

3. Run the server:

```bash
node server.js
```

Feel free to customize your backend as needed.
