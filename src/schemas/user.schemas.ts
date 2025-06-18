import { z } from 'zod';

export const userSignUpSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export const userSignInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha é obrigatória'),
});

export const userUpdateSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório').optional(),
  email: z.string().email('Email inválido').optional(),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres').optional(),
}).refine(
  (data) => data.name !== undefined || data.email !== undefined || data.password !== undefined,
  {
    message: 'Pelo menos um dos campos (name, email ou password) deve ser informado',
    path: ['body'], // aponta erro para o corpo da requisição
  }
);