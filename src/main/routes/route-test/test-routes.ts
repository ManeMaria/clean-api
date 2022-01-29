import { Router } from 'express'

export default (route: Router): void => {
  route.get('/', (req, res) => {
    res.type('html')
    res.send(`
                <html lang="en">
                    <head>
                    </head>
                    <body>
                        <div id="root"><h1>ok</h1></div>
                    </body>
                </html>
            `)
  })
}
