import Joi from "joi-browser";

const validate = function(data, schema) {
  const option = { abortEarly: false };
  const { error } = Joi.validate(data, schema, option);
  if (!error) return null;
  const errors = {};
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
};

export default validate;
