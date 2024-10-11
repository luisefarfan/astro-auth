
import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";

export const login = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
    password: z.string(),
    remember_me: z.boolean().optional()
  }),
  handler: async ({ email, password, remember_me }, context) => {
    try {
      const user = await signInWithEmailAndPassword(firebase.auth, email, password)

      if (remember_me) {
        context.cookies.set('email', email, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 Year
          path: '/'
        })
      } else {
        context.cookies.delete('email', {
          path: '/'
        })
      }

      return { success: true }
    } catch (error) {
      const firebaseError = error as AuthError

      if (firebaseError.code === 'auth/invalid-credential') {
        throw new Error('Invalid credentials')
      }

      throw new Error('An error occurred')
    }
  }
})
