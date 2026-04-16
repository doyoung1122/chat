const pool = require('../utils/db');

const createUsersTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(50) NOT NULL,
      email      VARCHAR(100) UNIQUE NOT NULL,
      password   VARCHAR(255) NOT NULL,
      role       VARCHAR(20) DEFAULT 'employee',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
};

createUsersTable().catch(console.error);

const User = {
  async findByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0] || null;
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [id]);
    return rows[0] || null;
  },

  async create({ name, email, password }) {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role, created_at',
      [name, email, password]
    );
    return rows[0];
  },
};

module.exports = User;
