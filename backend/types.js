const z = require("zod");

const signUpValidation = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
  userName: z.string().min(3).max(20),
  password: z.string().min(5),
});

const signInValidation = z.object({
  userName: z.string().min(3).max(20),
  password: z.string().min(5),
});

const updateBody = z.object({
  firstName: z.string().min(1).max(20).optional(),
  lastName: z.string().min(1).max(20).optional(),
  password: z.string().min(5).optional(),
});

const transferSchema = z.object({
  userId: z.string(),
  amount: z.number().nonnegative(),
});

module.exports = {
  signUpValidation,
  signInValidation,
  updateBody,
  transferSchema,
};
