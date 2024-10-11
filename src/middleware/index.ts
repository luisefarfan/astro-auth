import { firebase } from "@/firebase/config"
import { defineMiddleware } from "astro:middleware"

const privateRoutes = ['/protected']
const notAuthenticatedRoutes = ['/login', '/register']

export const onRequest = defineMiddleware(async ({ url, request, locals, redirect }, next) => {
  const isLoggedIn = !!firebase.auth.currentUser
  const user = firebase.auth.currentUser

  locals.isLoggedIn = isLoggedIn

  locals.user = user ? {
    email: user.email || '',
    name: user.displayName || '',
    avatar: user.photoURL || null,
    emailVerified: user.emailVerified || false
  } : null

  if (!isLoggedIn && privateRoutes.includes(url.pathname)) {
    return redirect('/login')
  }

  if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
    return redirect('/')
  }

  return next()
})
