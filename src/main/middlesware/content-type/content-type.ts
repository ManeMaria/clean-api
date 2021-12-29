import { Request, Response, NextFunction } from 'express'

// NÃO É NECESSÁRIO CRIAR TESTES DE INTEGRAÇÃO PARA TODOS OS MIDDLEWARES,
// PORÉM ESSE É CONSIDERADO ESPECIAL

// cada middleware será criado num arquivo separado para testes de integração
export const contentType = (req: Request, res: Response, next: NextFunction): void => {
  // definimos por padrão que todas as respostas serão em json,
  // mas se o dev setar um metodo diferente, mudará do padrão

  // o express tem atalhos, um deles é o type, onde têm uma lista
  // de tipos de conteúdos que enviará.
  // passando a string 'json', ele identificará que deve retornar json
  res.type('json')
  next()
}
