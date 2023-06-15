const app = require('./app');
const connection = require('./models/connection');

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Backend do Store Manager escutando na porta ${PORT}`);
  const [result] = await connection.execute('SELECT 1');
  if (result) {
    console.log('MySQL connection OK');
  }
});
