import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-[clamp(4rem,15vw,12rem)] font-bold leading-none tracking-tighter text-foreground">404</h1>
          <div className="h-1 w-24 bg-accent mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Page not found</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto text-pretty leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Search className="h-4 w-4" />
            Try searching or check the URL for typos
          </p>
        </div>
      </div>
    </div>
  )
}
