export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || "dev",
    // Server configs
    serverPort: +process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,

    // Pagination limit
    pgLimit: +process.env.PG_LIMIT,

    // DB Configs
    dbHost: process.env.DB_HOST,
    dbPort: +process.env.DB_PORT,
    dbDatabase: process.env.DB_DATABASE,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
});