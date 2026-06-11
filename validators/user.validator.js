// // validators/user.validator.js

// const validateUser = (userData) => {
//   if (!userData.name) {
//     return "Name is required";
//   }

//   if (!userData.email) {
//     return "Email is required";
//   }

//   if (!userData.email.includes("@")) {
//     return "Email is invalid";
//   }

//   if (!userData.age) {
//     return "Age is required";
//   }

//   if (userData.age < 18) {
//     return "Age must be 18 or above";
//   }

//   if(!userData.city){
//     return "City is required";
//   }
//   if(!userData.city.trim()){
//     return "City must be at least 3 characters long";
//   }

//   return null;
// };

// module.exports = {
//   validateUser,
// };

// using Joi for validation
// validators/user.validator.js

const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(6).max(14).required(),

  email: Joi.string().email().required(),

  age: Joi.number().min(18).required(),

  city: Joi.string().min(3).required(),
  role: Joi.string().valid("user", "manager", "admin").default("user"),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
});

const validateUser = (userData) => {
  const { error } = userSchema.validate(userData);

  if (error) {
    return error.details[0].message;
  }

  return null;
};

module.exports = {
  validateUser,
};
