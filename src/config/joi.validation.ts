import * as Joi from "joi";

export const JoiValidationSchema = Joi.object({
    // Server configs
    PORT: Joi.required().default(3000),
    JWT_SECRET: Joi.required(),

    // Pagination limit
    PG_LIMIT: Joi.number().default(10),

    // DB configs
    DB_HOST: Joi.required(),
    DB_PORT: Joi.required(),
    DB_DATABASE: Joi.required(),
    DB_USERNAME: Joi.required(),
    DB_PASSWORD: Joi.required()
});