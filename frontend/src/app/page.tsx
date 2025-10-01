import { ArticleCard } from "@/components/article-card"

const posts = [
  {
    id: "1",
    href: "/article/1",
    title: "The Future of Artificial Intelligence: Trends for 2025",
    date: "May 12, 2025",
    categories: ["Technology"],
    author: {
      name: "John Davis",
      avatar: "/diverse-avatars.png",
      fallback: "JD",
    },
  },
  {
    id: "2",
    href: "/article/2",
    title: "Responsive Design: Best Practices for 2025",
    date: "May 10, 2025",
    categories: ["Design"],
    author: {
      name: "Anna Smith",
      avatar: "/professional-woman-diverse.png",
      fallback: "AS",
    },
  },
  {
    id: "3",
    href: "/article/3",
    title: "How to Build Scalable APIs with Node.js",
    date: "May 8, 2025",
    categories: ["Development"],
    author: {
      name: "Charles Sanders",
      avatar: "/young-man-developer.png",
      fallback: "CS",
    },
  },
  {
    id: "4",
    href: "/article/4",
    title: "The Evolution of JavaScript: From ES6 to ES2025",
    date: "May 5, 2025",
    categories: ["Development"],
    author: {
      name: "Mary Oliver",
      avatar: "/confident-business-woman.png",
      fallback: "MO",
    },
  },
  {
    id: "5",
    href: "/article/5",
    title: "Cybersecurity: Protecting Your Data in 2025",
    date: "May 3, 2025",
    categories: ["Security"],
    author: {
      name: "Prof. Robert Lee",
      avatar: "/older-man-professor.jpg",
      fallback: "RL",
    },
  },
  {
    id: "6",
    href: "/article/6",
    title: "Machine Learning in Practice: First Steps",
    date: "May 1, 2025",
    categories: ["Technology"],
    author: {
      name: "Julia Carter",
      avatar: "/young-woman-student.png",
      fallback: "JC",
    },
  },
  {
    id: "7",
    href: "/article/7",
    title: "UX Design: Creating Memorable Experiences",
    date: "April 28, 2025",
    categories: ["Design"],
    author: {
      name: "Anna Smith",
      avatar: "/professional-woman-diverse.png",
      fallback: "AS",
    },
  },
  {
    id: "8",
    href: "/article/8",
    title: "DevOps: Automating the Development Cycle",
    date: "April 25, 2025",
    categories: ["Development"],
    author: {
      name: "Charles Sanders",
      avatar: "/young-man-developer.png",
      fallback: "CS",
    },
  },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-6">
        {posts.map((post) => (
          <ArticleCard {...post} key={post.id} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Prev
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
            1
          </button>
          <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            2
          </button>
          <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            3
          </button>
          <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}