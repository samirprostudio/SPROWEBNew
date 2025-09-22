
import { notFound } from 'next/navigation';
import { getBlogPosts, getBlogPostBySlug } from '@/lib/data';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist.',
    }
  }

  return {
    title: `${post.title} | SAMIR PRO Blog`,
    description: post.description,
  }
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}


export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-4xl py-12 md:py-24 bg-card/80 backdrop-blur-sm rounded-lg my-12">
      <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl mb-4">{post.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.authorImage} alt={post.author} data-ai-hint={post.authorImageHint} />
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{post.author}</span>
          </div>
          <span>&middot;</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </div>
      </header>

      <Image
        src={post.image}
        alt={post.title}
        width={1200}
        height={600}
        data-ai-hint={post.imageHint}
        className="w-full rounded-lg object-cover aspect-video mb-8"
      />
      
      <div 
        className="prose prose-invert max-w-none text-foreground [&_p]:text-muted-foreground [&_h2]:font-headline [&_h3]:font-headline [&_a]:text-primary"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}
