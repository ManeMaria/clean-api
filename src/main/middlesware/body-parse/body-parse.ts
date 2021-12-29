import { json } from 'express'

// NÃO É NECESSÁRIO CRIAR TESTES DE INTEGRAÇÃO PARA TODOS OS MIDDLEWARES,
// PORÉM ESSE É CONSIDERADO ESPECIAL

// cada middleware será criado num arquivo separado para testes de integração
export const bodyParse = json()
