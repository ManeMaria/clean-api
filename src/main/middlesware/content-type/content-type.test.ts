// cria-se o arquivo separado de cada middleware para testes de integração
import request from 'supertest'
import { app } from '../../config/app'

describe('contente type middleware', () => {
  test('Deve retornar json por default', async () => {
    // como temos acesso ao app, podemos simular rotas
    app.get('/text_content_type', (req, res) => {
      res.send('')
    })

    // com o request do supertest, podemos simular uma requisição
    await request(app)
      .get('/text_content_type')
      .expect('content-type', /json/)
      // usa-se um regex para identificar
      // os diversos conteúdos com nome json
  })

  test('Deve retornar xml, quando forçamos enviar xml', async () => {
    // como temos acesso ao app, podemos simular rotas
    app.get('/text_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })

    // com o request do supertest, podemos simular uma requisição
    await request(app)
      .get('/text_content_type_xml')
      .expect('content-type', /xml/)
      // usa-se um regex para identificar
      // os diversos conteúdos com nome xml
  })
})
