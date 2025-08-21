import express from 'express';
import cors from 'cors';
import http from 'http';

const PORT = 4000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.set('server', server);

server.listen(PORT, () => {
  console.log(`Ordering server running at http://localhost:${PORT}`);
});
