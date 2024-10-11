/// <reference path="../.astro/types.d.ts" />

interface User {
  email: string;
  name: string;
  avatar: string | null;
  emailVerified: boolean;
}

declare namespace App {
  interface Locals {
    isLoggedIn: boolean;
    user: User | null;
  }
}

interface ImportMetaEnv {
  readonly WEBSITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
