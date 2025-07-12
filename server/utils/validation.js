const Joi = require('joi');

// User validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Post validation schemas
const postSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  content: Joi.string().min(10).max(10000).required(),
  excerpt: Joi.string().max(300),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  published: Joi.boolean()
});

// Category validation schemas
const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().max(500),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i)
});

// Comment validation schema
const commentSchema = Joi.object({
  content: Joi.string().min(1).max(1000).required()
});

module.exports = {
  registerSchema,
  loginSchema,
  postSchema,
  categorySchema,
  commentSchema
};