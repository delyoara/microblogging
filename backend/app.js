import express from 'express';
import cors from 'cors';
import postsRoutes from './routes/posts.js';
import usersRoutes from './routes/users.js';

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('La vie est belle!')
})

app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur : http://localhost:${port}`)

})