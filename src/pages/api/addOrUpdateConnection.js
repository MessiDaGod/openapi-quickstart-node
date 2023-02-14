import sqlite3 from 'sqlite3';

const dbPath = "./database.sqlite";

export default async function handler(req, res) {
  const { value, userId } = req.query;
  const tableName = 'connections';
  const valueToInsert = value ? value.toString() : value;
  const db = new sqlite3.Database(dbPath);

  await db.run(
    `
    CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY,
        userId INTEGER NOT NULL UNIQUE,
        value TEXT NOT NULL UNIQUE
      );
      CREATE CLUSTERED INDEX IF NOT EXISTS idx_connections ON connections (userId, value);
      `,
    (error) => {
      if (error) {
        res.status(500).json({ message: 'Error creating table' });
      } else {
        db.run(
          `
          INSERT INTO ${tableName} (value, userId)
          VALUES ($value, $userId)
          ON CONFLICT(userId)
          DO UPDATE SET value = excluded.value
        `,
          {
            $value: valueToInsert,
            $userId: userId,
          },
          (error) => {
            if (error) {
              res.status(500).json({ message: 'Error inserting value into table' });
            } else {
              console.info(`Value ${valueToInsert} inserted or updated in ${tableName} table`);
              res.status(200).json({ message: `Value ${valueToInsert} inserted or updated in ${tableName} table` });
            }
          }
        );
      }
    }
  );

  db.close();
}
