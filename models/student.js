const Joi = require('joi');

const student_schema = Joi.object({
    //id : Joi.number().integer().positive(),
    nom: Joi.string().min(5).required(),
    classe :Joi.string().min(3).max(10).required(),
    modules: Joi.array().items(Joi.object (
        {module : Joi.string().min(3).max(10),
        note :Joi.number().integer().positive()})),
});

const student_update_schema = Joi.object({
    //id : Joi.number().integer().positive(),
    nom: Joi.string().min(5).required(),
    classe :Joi.string().min(3).max(10).required(),
    modules: Joi.array().items(Joi.object (
        {module : Joi.string().min(3).max(10),
        note :Joi.number().integer().positive()})),
});

module.exports.student_schema=student_schema;
module.exports.student_update_schema=student_update_schema;