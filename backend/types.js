const z = require("zod");

const signUpValidation = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
  userName: z.string().min(3).max(9),
  password: z.string().min(5),
});


module.exports = signUpValidation
