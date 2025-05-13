import app from './index.js'
import { createServer } from 'http'

export default function handler(req, res) {
    const server = createServer(app)
    server.listen(0, () => {
        const address = server.address()
        const port = address.port
        req.url = req.url || '/'
        const proxy = `http://127.0.0.1:${port}`
        fetch(proxy + req.url, {
            method: req.method,
            headers: req.headers,
            body: req.method !== 'GET' && req.method !== 'HEAD' ? req : undefined
        }).then(response => {
            response.body.pipe(res)
        }).catch(error => {
            res.statusCode = 500
            res.end('Internal Server Error')
        })
    })
}
