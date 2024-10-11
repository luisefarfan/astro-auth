import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/protected']

export const onRequest = defineMiddleware((context, next) => {
  if (privateRoutes.includes(context.url.pathname)) {
    const authHeaders = context.request.headers.get('Authorization') ?? ''
    return checkLocalAuth(authHeaders, next)
  }

  next()
})

const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {
  if (authHeaders && authHeaders.length > 0) {
    const authValue = authHeaders.split(' ').at(-1) ?? 'user:password'
    const [username, password] = atob(authValue).split(':')

    if (username === 'admin' && password === 'admin') {
      return next()
    }
  }

  return new Response('Not allowed', {
    status: 401, headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  })
}
