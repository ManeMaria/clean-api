import { Router } from 'express'
// criamos rotas dinânmicas
// com esse algorítmo, buscamos os arquivos com final routes.ts e criamos
// rotas dinâmicas
export default (route: Router): void => {
  route.post('/signup', (req, res) => {
    res.status(201).json({ ok: 'ok' })
  })

  route.get('/getsignup', (req, res) => {
    res.status(200).json({ ok: 'ok' })
  })
}
