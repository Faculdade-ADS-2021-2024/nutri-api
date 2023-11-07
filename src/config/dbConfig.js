import pg from 'pg';

export const pool =  new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nutri',
    password: '12345678',
    port: 5432
});