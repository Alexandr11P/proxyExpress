
import express from 'express';
import proxy from 'express-http-proxy'
import path from 'path'

const PORT = 80;
const domain = 'alexreactapp.ru'
const server = 'http://localhost:3001'
const frontend = 'http://localhost:3000'


const app = express();

app.use('*', (req, res, next) => {
    if (req.hostname !== 'multi.' + domain) { res.sendFile(`${path.resolve()}/index.html`); } else {
        next()
    }
})

app.use('/chat/:id/messages', proxy(server,
    { proxyReqPathResolver: (req) => req.baseUrl })
);

app.use('/chat/:id/message', proxy(server,
    { proxyReqPathResolver: (req) => req.baseUrl })
);

app.use('/chat/:id/auth', proxy(server,
    { proxyReqPathResolver: (req) => req.baseUrl })
);

app.use('/chat/:id/reg', proxy(server,
    { proxyReqPathResolver: (req) => req.baseUrl })
);

app.use('/chat/create', proxy(server,
    { proxyReqPathResolver: (req) => req.baseUrl })
);

app.use('/chat/:id/meslong', proxy(server,
    {
        proxyReqPathResolver: (req) => req.baseUrl
    })
);

app.use('/todos', proxy(server,
    { proxyReqPathResolver: (req) => req.baseUrl })
);

app.use('/img', proxy(server,
    {
        proxyReqPathResolver: (req) => req.originalUrl

    })
);

app.use('/allapt', proxy(server,
    { proxyReqPathResolver: (req) => req.baseUrl })
);

app.use('', proxy(frontend));



async function startApp() {
    try {
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp();
