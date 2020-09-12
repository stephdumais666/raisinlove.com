import redirectSSL from 'redirect-ssl'

export default {
    serverMiddleware: [
        redirectSSL.create({
            exclude: ['localhost']
        }),
    ]
}