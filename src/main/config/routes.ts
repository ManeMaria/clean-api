import { Express, Router } from 'express'
import fg from 'fast-glob' // um file system mais eficiente

// criamos rotas dinânmicas
// com esse algorítmo, buscamos os arquivos com final routes.ts e criamos
// rotas dinâmicas
export default (app: Express): void => {
  const router = Router()
  // prefixa o nome em cada rota
  app.use('/api', router)
  // pastas que o fast-glob tem que percorrer para achar os arquivos de rota
  const paths = ['/', '/route-test/']

  paths.forEach((path: string) => {
    fg.sync(`**/src/main/routes${path}**routes.ts`).forEach(async (pathFile) => {
      // acessamos a string do caminho do arquivo
      // como estamos dentro de src, temos que retroceder até src, para acessar o caminho do arquivo completo
      (await import(`../../../${pathFile}`)).default(router)
      // estamos dentro da função, então o método de import é diferente: usando await, com o import em método
      // o método default() é a mesma coisa que ( export default ),
    })
  })
}
