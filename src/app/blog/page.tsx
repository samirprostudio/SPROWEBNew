
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getBlogPosts } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | SAMIR PRO',
  description: 'Explore our latest articles, tutorials, and insights on AI, technology, and current events.',
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="container py-12 md:py-24">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">From the Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Explore our latest articles, tutorials, and insights on AI and technology.
        </p>
      </header>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.slug} className="flex flex-col overflow-hidden transition-all transform hover:scale-105 hover:border-accent bg-card/80 backdrop-blur-sm active:scale-[0.98]">
              <Link href={`/blog/${post.slug}`} aria-label={post.title}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  data-ai-hint={post.imageHint}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <CardHeader>
                <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <CardTitle className="font-headline text-xl">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm line-clamp-3">{post.description}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/blog/${post.slug}`} className="text-primary hover:underline text-sm font-semibold">
                  Read More
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
