import { json } from 'express'
// cada middleware será criado num arquivo separado para testes de integração
export const bodyParse = json()
