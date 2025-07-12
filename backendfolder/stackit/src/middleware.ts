import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware() {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is trying to access protected routes
        const { pathname } = req.nextUrl
        
        // Define protected routes
        const protectedRoutes = ['/dashboard', '/ask', '/users']
        
        // Allow access to auth pages when not authenticated
        if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
          return true
        }
        
        // Check if the current path is a protected route
        const isProtectedRoute = protectedRoutes.some(route => 
          pathname.startsWith(route)
        )
        
        if (isProtectedRoute) {
          return !!token
        }
        
        // Allow access to public routes
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}