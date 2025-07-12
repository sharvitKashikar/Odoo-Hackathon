import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainLayout } from "@/components/layout/main-layout"
import { MessageSquare, Users, ThumbsUp } from "lucide-react"

export default async function Home() {
  const session = await getServerSession(authOptions)

  // Redirect authenticated users to dashboard
  if (session) {
    redirect("/dashboard")
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                StackIt
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A minimal Q&A forum platform where you can ask questions, share knowledge, and help others in your community. Join thousands of developers sharing their expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">Get Started Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose StackIt?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built for developers, by developers. Experience the best way to ask questions and share knowledge.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <MessageSquare className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Ask Questions</CardTitle>
                  <CardDescription>
                    Get help from the community by asking detailed questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Use our rich text editor to format your questions with code snippets, images, and more. Get answers from experienced developers.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <ThumbsUp className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Share Knowledge</CardTitle>
                  <CardDescription>
                    Answer questions and help others learn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Build your reputation by providing helpful answers and get recognized by the community. Earn badges and climb the leaderboard.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Build Community</CardTitle>
                  <CardDescription>
                    Connect with developers and enthusiasts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Vote on content, comment on posts, and mention other users to engage in discussions. Network with like-minded professionals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
              <p className="text-muted-foreground">
                Be part of a thriving community of developers and tech enthusiasts
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">0+</div>
                <div className="text-muted-foreground">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">0+</div>
                <div className="text-muted-foreground">Answers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">0+</div>
                <div className="text-muted-foreground">Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">0+</div>
                <div className="text-muted-foreground">Tags</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join StackIt today and become part of our amazing community!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">Create Account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">
              Built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and NextAuth.js
            </p>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
}
