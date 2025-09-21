import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getBlogPosts, getLatestVideos } from '@/lib/data';
import { ArrowRight, Bot, Code, Video, Youtube, Wand2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TiltCard from '@/components/tilt-card';
import ContactForm from '@/components/contact-form';

export default function Home() {
  const latestPosts = getBlogPosts().slice(0, 3);
  const latestVideos = getLatestVideos();

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section id="hero" className="w-full py-20 md:py-32 lg:py-40 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    SAMIR PRO: A Creative Content Creator Agency
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    We bring your ideas to life with stunning visuals and engaging narratives. Explore our services and see how we can build the future of content together.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="group transition-transform transform hover:scale-105">
                    <Link href="#contact">
                      Get in Touch
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="transition-transform transform hover:scale-105">
                    <Link href="/brand-story-generator">
                      Use Brand Story AI
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <TiltCard>
                  <Image src="/logo.png" alt="SAMIR PRO STUDIO Logo" width={250} height={250} className="h-48 w-48" />
                </TiltCard>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Our Services</div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">What We Offer</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From AI-driven video generation to bespoke software solutions, we provide the expertise to bring your vision to life.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 mt-12">
              <TiltCard>
                <Card className="h-full">
                  <CardHeader>
                    <Video className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="font-headline">AI Video Generation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Our advanced AI model can create stunning, high-quality videos from simple text prompts, complete with realistic motion and voiceovers.</p>
                  </CardContent>
                </Card>
              </TiltCard>
              <TiltCard>
                <Card className="h-full">
                  <CardHeader>
                    <Bot className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="font-headline">Custom AI Agents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">We build and train custom AI agents tailored to your business needs, automating tasks and providing intelligent insights.</p>
                  </CardContent>
                </Card>
              </TiltCard>
              <TiltCard>
                <Card className="h-full">
                  <CardHeader>
                    <Code className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="font-headline">Web & App Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Our team of expert developers creates responsive, high-performance websites and applications that deliver seamless user experiences.</p>
                  </CardContent>
                </Card>
              </TiltCard>
              <TiltCard>
                <Card className="h-full">
                  <CardHeader>
                    <Wand2 className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="font-headline">Use Trending AI for Free</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Experiment with the latest Gemini AI model. Chat, generate ideas, and enhance your prompts for free.</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/ai-chat">Access Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TiltCard>
            </div>
          </div>
        </section>

        <section id="videos" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Our Latest Videos</div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Check Out Our Content</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our latest video content covering tutorials, insights, and entertaining shorts.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
              {latestVideos.map((video) => (
                <TiltCard key={video.id}>
                  <Card className="h-full flex flex-col">
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    <CardHeader>
                      <CardTitle className="font-headline text-xl">{video.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    </CardContent>
                    <CardFooter>
                       <Button asChild variant="link" className="p-0 h-auto">
                        <Link href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className="group text-primary">
                          Watch on YouTube <Youtube className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TiltCard>
              ))}
            </div>
            <div className="text-center mt-12">
                <Button asChild className="group transition-transform transform hover:scale-105">
                  <Link href="https://www.youtube.com/@SamirProStudio/videos" target="_blank" rel="noopener noreferrer">
                    Watch More on YouTube
                    <Youtube className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  </Link>
                </Button>
              </div>
          </div>
        </section>

        <section id="blog" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Our Blog</div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">News and Insights</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stay updated with our latest tutorials, case studies, and company news.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {latestPosts.map((post) => (
                <TiltCard key={post.slug}>
                  <Card className="overflow-hidden h-full">
                    <Link href={`/blog/${post.slug}`}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        data-ai-hint={post.imageHint}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </Link>
                    <CardHeader>
                      <CardTitle className="font-headline text-xl">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm line-clamp-3">{post.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/blog/${post.slug}`} className="text-primary hover:underline text-sm font-semibold">
                        Read More
                      </Link>
                    </CardFooter>
                  </Card>
                </TiltCard>
              ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild className="transition-transform transform hover:scale-105">
                  <Link href="/blog">View All Posts</Link>
                </Button>
              </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Let's Build Something Amazing Together
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project in mind or just want to learn more? We'd love to hear from you.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
