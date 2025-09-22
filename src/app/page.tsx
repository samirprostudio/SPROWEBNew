
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getBlogPosts, getLatestVideos } from '@/lib/data';
import { ArrowRight, Bot, Code, Video, Youtube, Sparkles } from 'lucide-react';
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
              <div className="flex flex-col justify-center space-y-4 text-center items-center">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
                      SAMIR PRO STUDIO
                    </h1>
                    <p className="font-headline text-xl text-muted-foreground sm:text-2xl md:text-3xl">
                      A Creative Content Creator &amp; Production Agency
                    </p>
                  </div>
                  <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
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
                </div>
              </div>
              <div className="flex items-center justify-center pt-8 lg:pt-0">
                <TiltCard>
                  <Image src="/logo.png" alt="SAMIR PRO STUDIO Logo" width={320} height={320} className="h-64 w-64 md:h-80 md:w-80" />
                </TiltCard>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-card/80 backdrop-blur-sm">
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
            <div className="mx-auto grid max-w-6xl items-stretch gap-8 mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <TiltCard className="transition-transform active:scale-[0.98] hover:scale-105">
                        <Card className="h-full flex flex-col bg-card/50">
                            <CardHeader>
                                <Video className="h-10 w-10 text-primary mb-2" />
                                <CardTitle className="font-headline">AI Video Generation</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">Our advanced AI can create stunning, high-quality videos from simple text prompts, complete with realistic motion and voiceovers.</p>
                            </CardContent>
                        </Card>
                    </TiltCard>
                    <TiltCard className="transition-transform active:scale-[0.98] hover:scale-105">
                        <Card className="h-full flex flex-col bg-card/50">
                            <CardHeader>
                                <Bot className="h-10 w-10 text-primary mb-2" />
                                <CardTitle className="font-headline">Custom AI Agents</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">We build and train custom AI agents tailored to your business needs, automating tasks and providing intelligent insights.</p>
                            </CardContent>
                        </Card>
                    </TiltCard>
                     <TiltCard className="transition-transform active:scale-[0.98] hover:scale-105">
                        <Card className="h-full flex flex-col bg-card/50">
                            <CardHeader>
                                <Code className="h-10 w-10 text-primary mb-2" />
                                <CardTitle className="font-headline">Web Development</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">We design and build modern, responsive, and high-performance websites and web applications tailored to your brand.</p>
                            </CardContent>
                        </Card>
                    </TiltCard>
                     <TiltCard className="transition-transform active:scale-[0.98] hover:scale-105">
                        <Card className="h-full flex flex-col bg-card/50">
                            <CardHeader>
                                <Youtube className="h-10 w-10 text-primary mb-2" />
                                <CardTitle className="font-headline">YouTube Automation</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">Scale your content creation with our AI-powered YouTube automation services, from scripting to video production.</p>
                            </CardContent>
                        </Card>
                    </TiltCard>
                </div>
                <div className="flex justify-center mt-8">
                    <div className="w-full sm:w-1/2 lg:w-1/4">
                        <TiltCard className="transition-transform active:scale-[0.98] hover:scale-105">
                            <Card className="h-full flex flex-col text-center bg-card/50">
                                <CardHeader>
                                    <Sparkles className="h-10 w-10 text-primary mb-2 mx-auto" />
                                    <CardTitle className="font-headline">Create Custom AI Videos</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground">Get custom AI-generated videos for your YouTube channel or social media. Tell us your idea, and we'll bring it to life.</p>
                                </CardContent>
                                <CardFooter className="flex-col">
                                    <Button asChild className="w-full">
                                        <Link href="/order">Order Now</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TiltCard>
                    </div>
                </div>
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
                <TiltCard key={video.id} className="transition-transform active:scale-[0.98] hover:scale-105">
                  <Card className="h-full flex flex-col bg-card/50">
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

        <section id="blog" className="w-full py-12 md:py-24 lg:py-32 bg-card/80 backdrop-blur-sm">
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
                <TiltCard key={post.slug} className="transition-transform active:scale-[0.98] hover:scale-105">
                  <Card className="overflow-hidden h-full bg-card/50">
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

    
    
