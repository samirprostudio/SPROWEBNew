import BrandStoryForm from './brand-story-form';

export default function BrandStoryGeneratorPage() {
  return (
    <div className="container max-w-3xl py-12 md:py-24">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          AI Brand Story Generator
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Craft a compelling brand story for your company. Just provide a few details, and our AI will weave a narrative that resonates with your audience.
        </p>
      </header>
      <main>
        <BrandStoryForm />
      </main>
    </div>
  );
}
