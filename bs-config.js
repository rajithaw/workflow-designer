module.exports = {
    port: process.env.PORT || 3000,
    server: {
        baseDir: "demo",
        routes: {
            "/lib": "lib",
            "/css": "css",
            "/data": "data",
            "/js": "js",
            "/": ""
        }
    }
}