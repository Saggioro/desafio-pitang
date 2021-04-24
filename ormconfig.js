module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
  migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],

  // host: 'localhost',
  // port: 5432,
  // username: 'postgres',
  // password: 'docker',
  // database: 'postgres',

  // entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  // migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],

  cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations',
  },
  ssl: true,
  extra: {
      ssl: {
          rejectUnauthorized: false,
      },
  },
}
