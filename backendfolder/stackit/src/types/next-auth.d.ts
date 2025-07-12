declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username?: string
      role?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    username?: string
    role?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string
    role?: string
  }
}