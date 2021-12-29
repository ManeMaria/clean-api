import { Request, Response, NextFunction } from 'express'

// cada middleware será criado num arquivo separado para testes de integração
export const cors = (req: Request, res: Response, next: NextFunction): void => {
  // para liberar acesso de consumo da api de outros servidores
  res.set({
    'access-control-allow-origin': '*',
    'access-control-allow-headers': '*',
    'access-control-allow-methods': '*'
  })
  next()
}
