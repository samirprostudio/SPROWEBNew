
import type { TeamMember, BlogPost, LatestVideo } from './types';
import placeholderImages from './placeholder-images.json';

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Samir A.',
    role: 'Founder & AI Architect',
    bio: 'The visionary behind SAMIR PRO, with a passion for building intelligent systems that solve real-world problems.',
    imageUrl: placeholderImages.placeholderImages.find(p => p.id === 'team-1')?.imageUrl || '',
    imageHint: 'man portrait',
  },
  {
    id: 2,
    name: 'Jane Doe',
    role: 'Lead Developer',
    bio: 'Expert in full-stack development, turning complex AI concepts into seamless user experiences.',
    imageUrl: placeholderImages.placeholderImages.find(p => p.id === 'team-2')?.imageUrl || '',
    imageHint: 'woman portrait',
  },
  {
    id: 3,
    name: 'Alex Ray',
    role: 'UX/UI Designer',
    bio: 'Crafting intuitive and beautiful interfaces that make powerful technology accessible to everyone.',
    imageUrl: placeholderImages.placeholderImages.find(p => p.id === 'team-3')?.imageUrl || '',
    imageHint: 'person portrait',
  },
];

const latestVideos: LatestVideo[] = [
  {
    id: 1,
    title: '1 Million Years Ago - The Secret Jungle Life of a Beautiful Girl and a Mighty Gorilla',
    description: 'A cinematic journey into a lost world! Witness the untold story of a stunning jungle girl and her powerful gorilla companion. A tale of survival, friendship, and breathtaking adventure.',
    youtubeId: 'Jq1Ot63KOHI',
  },
  {
    id: 2,
    title: 'She Hulk Cheating on HULK? SPIDER MAN Vs HULK Epic Action Showdown',
    description: 'Worlds collide in this epic confrontation! Did She-Hulk betray Hulk? Watch as Spider-Man faces off against an enraged Hulk in a battle that will shake the city to its core.',
    youtubeId: 'b-9gljl-VB8',
  },
  {
    id: 3,
    title: 'She Hulk Cheats on HULK! Joker Vs Hulk Epic Action Showdown',
    description: 'The madness of the Joker meets the fury of the Hulk! When She-Hulk\'s loyalty is questioned, the ultimate showdown between chaos and rage is unleashed. Who will survive?',
    youtubeId: 'TYm9nKWBsNM',
  },
  {
    id: 4,
    title: 'She Hulk Gets Pregnant! Who\'s Son Arriving? Hulk vs Spider Man Epic Actions Movie',
    description: 'A shocking revelation rocks the superhero world! She-Hulk is pregnant, but who is the father? See Hulk and Spider-Man clash in an emotional and action-packed spectacle.',
    youtubeId: '4jj_0wXSpyE',
  },
];

const blogPosts: BlogPost[] = [
  {
    slug: 'neural-rendering-synthesis-2025',
    title: 'Neural Rendering Synthesis: The 2025 Leap in AI Graphics',
    description: 'By 2025, Neural Radiance Fields (NeRFs) and GAN-based synthesis will merge, allowing for real-time creation of photorealistic 3D environments from simple text or 2D images. We explore the research.',
    date: '2024-10-28',
    author: 'Samir A.',
    authorImage: placeholderImages.placeholderImages.find(p => p.id === 'team-1')?.imageUrl || '',
    authorImageHint: 'man portrait',
    image: placeholderImages.placeholderImages.find(p => p.id === 'blog-1')?.imageUrl || '',
    imageHint: 'abstract art',
    content: `
      <p>The field of computer graphics is on the brink of a monumental shift. As we look toward 2025, the convergence of Neural Radiance Fields (NeRFs), which excel at creating 3D scenes from 2D images, and Generative Adversarial Networks (GANs), known for their powerful image synthesis capabilities, is set to redefine digital content creation. This fusion, which we term Neural Rendering Synthesis (NRS), will enable the real-time generation of fully explorable, photorealistic 3D worlds from minimal inputs like a single photograph or a descriptive text prompt.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">The Core Innovation: Bridging Implicit and Explicit Models</h3>
      <p>Current research focuses on overcoming the limitations of each technology. NeRFs are computationally intensive, while GANs struggle with 3D consistency. The 2025 NRS models will leverage a hybrid architecture. A lightweight, implicit neural representation will define the scene's geometry and volumetric properties, while a hyper-efficient GAN-based renderer will translate this representation into photorealistic images from any viewpoint in real-time. This eliminates the need for slow, ray-marching techniques.</p>
      <pre><code class="font-code">
// Hypothetical NRS-2025 Prompt
{
  "scene": "A serene bioluminescent forest on an alien planet, twin moons in the sky, mist covering the glowing flora.",
  "style": "Photorealistic, cinematic lighting, volumetric fog, inspired by Avatar.",
  "output": "Real-time 3D environment"
}
</code></pre>
      <p>The implications for industries like film, gaming, and virtual reality are staggering. Digital artists will be able to create breathtakingly complex environments with unprecedented speed and creative freedom. The era of manual 3D modeling for every asset is drawing to a close, replaced by a collaborative process between human creativity and AI-driven synthesis.</p>
    `,
  },
  {
    slug: 'sentient-ai-agents-2025',
    title: 'Behavioral Cloning & Liquid Neural Networks: The Rise of Sentient AI Agents in 2025',
    description: 'In 2025, custom AI agents will move beyond simple automation. By combining advanced behavioral cloning with Liquid Neural Networks (LNNs), agents will learn, adapt, and reason in real-time, creating truly personalized digital assistants.',
    date: '2024-10-26',
    author: 'Jane Doe',
    authorImage: placeholderImages.placeholderImages.find(p => p.id === 'team-2')?.imageUrl || '',
    authorImageHint: 'woman portrait',
    image: placeholderImages.placeholderImages.find(p => p.id === 'blog-2')?.imageUrl || '',
    imageHint: 'robot technology',
    content: `
      <p>The concept of the "AI agent" is evolving from a simple task automator into a dynamic, adaptive digital partner. By 2025, the breakthrough will come from the fusion of two cutting-edge fields: advanced behavioral cloning and Liquid Neural Networks (LNNs). This combination will allow AI agents to learn not just the "what" but the "why" behind user actions, enabling them to anticipate needs and operate with a semblance of common-sense reasoning.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">Learning from Observation: Advanced Behavioral Cloning</h3>
      <p>Instead of relying on rigid, pre-programmed rules, the next generation of agents will learn by observing user behavior across all their applications. By analyzing cursor movements, application usage patterns, and problem-solving workflows, the agent builds a personalized model of the user's intent. This allows it to proactively assemble workflows, manage information, and even suggest actions the user may not have considered.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">Adapting in Real-Time: Liquid Neural Networks</h3>
      <p>The true game-changer is the integration of LNNs. Unlike traditional static neural networks, LNNs are designed to adapt their internal structure and parameters continuously based on new data. This is crucial for handling the dynamic and unpredictable nature of real-world tasks. An LNN-powered agent doesn't need to be retrained from scratch; it learns and evolves with every user interaction, becoming a more effective partner over time. This continuous learning capability is what will make the 2025 AI agent feel truly "alive" and intelligent.</p>
    `,
  },
  {
    slug: 'dynamic-ui-generation-2025',
    title: 'Adaptive Interfaces: How AI Will Generate UIs in Real-Time by 2025',
    description: 'Forget static design. By 2025, AI will generate and adapt user interfaces in real-time based on user expertise, current context, and biometric feedback, creating a truly personalized and efficient user experience.',
    date: '2024-10-24',
    author: 'Alex Ray',
    authorImage: placeholderImages.placeholderImages.find(p => p.id === 'team-3')?.imageUrl || '',
    authorImageHint: 'person portrait',
    image: placeholderImages.placeholderImages.find(p => p.id === 'blog-3')?.imageUrl || '',
    imageHint: 'design wireframe',
    content: `
      <p>The principles of user interface design are about to be rewritten by AI. The static, one-size-fits-all app designs of today will be replaced by dynamic, adaptive interfaces that reconfigure themselves in real-time to perfectly suit the user's needs. By 2025, this won't be a niche feature but a standard expectation for premium digital products.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">1. Contextual and Expertise-Based Layouts</h3>
      <p>An AI-driven UI will analyze a user's behavior to determine their level of expertise. For a novice user, the interface might present a simplified, guided experience with fewer options. For a power user, it could surface advanced tools and complex information dashboards. The UI will adapt not just to the user, but to the task at hand, dynamically showing the most relevant controls and information for the current workflow.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">2. Biometric-Responsive Design</h3>
      <p>The next frontier is integrating biometric feedback. By using data from a device's camera or wearable sensors (with user consent), an application could detect signs of user frustration, confusion, or focus. If the AI detects a user is struggling, it could simplify the layout, offer a help tooltip, or highlight a key feature. If the user is in a state of "flow," it could hide distracting elements to create a more immersive experience.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">3. Generative UI: Building from Scratch</h3>
      <p>The ultimate goal is a fully generative UI. An AI could construct a unique interface from scratch based on a simple user request. A project manager could say, "Show me the project timeline, key risks, and current budget allocation," and the AI would instantly generate a custom dashboard containing just that information, arranged in the most logical way. This paradigm shifts the user's role from navigating complex menus to simply stating their intent.</p>
    `,
  },
  {
    slug: 'us-election-2024-ai-impact',
    title: "AI's Growing Role in the 2024 US Presidential Election",
    description: 'From deepfake concerns to AI-powered campaign targeting, we explore how artificial intelligence is shaping one of the most significant political events in the USA.',
    date: '2024-07-25',
    author: 'Jane Doe',
    authorImage: placeholderImages.placeholderImages.find(p => p.id === 'team-2')?.imageUrl || '',
    authorImageHint: 'woman portrait',
    image: placeholderImages.placeholderImages.find(p => p.id === 'blog-4')?.imageUrl || '',
    imageHint: 'USA flag technology',
    content: `
      <h2 class="font-headline text-3xl font-semibold mt-8 mb-4">The Unseen Campaigner: AI in the 2024 Election</h2>
      <p>The 2024 U.S. presidential election is poised to be the most technologically advanced in history, with artificial intelligence playing a pivotal, and often controversial, role. Campaigns are leveraging AI for everything from hyper-targeted voter analytics and personalized outreach to automating social media content creation. This allows for unprecedented efficiency in identifying and mobilizing potential supporters with messages tailored to their specific interests and concerns.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">The Double-Edged Sword of Generative AI</h3>
      <p>However, the rise of sophisticated generative AI also brings significant challenges. The proliferation of convincing deepfake videos and audio threatens to spread misinformation at an alarming rate, making it difficult for voters to distinguish fact from fiction. These AI-generated fakes can create false narratives, attribute fabricated quotes to candidates, or show them in situations that never occurred. Regulators and tech companies are scrambling to create safeguards, but the technology is evolving faster than the policies to govern it.</p>
      <blockquote class="border-l-4 border-primary pl-4 my-4">
        "The challenge isn't just about identifying fake content, but about maintaining trust in the information ecosystem itself."
      </blockquote>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">Looking Ahead: The Need for Digital Literacy</h3>
      <p>As AI technology becomes more accessible, its impact on democratic processes will only grow. The 2024 election serves as a crucial case study for how societies can harness the benefits of AI in campaigning while mitigating its risks. A key defense is a well-informed electorate. Promoting digital literacy and critical thinking skills is more important than ever, empowering voters to question what they see online and verify sources before sharing.</p>
    `,
  },
  {
    slug: 'nepal-monsoon-update-2024',
    title: "Nepal's 2024 Monsoon: Challenges and Technological Resilience",
    description: 'An overview of the recent monsoon season in Nepal, highlighting the impact of landslides and flooding, and how technology is aiding in disaster response and climate adaptation.',
    date: '2024-07-27',
    author: 'Samir A.',
    authorImage: placeholderImages.placeholderImages.find(p => p.id === 'team-1')?.imageUrl || '',
    authorImageHint: 'man portrait',
    image: placeholderImages.placeholderImages.find(p => p.id === 'blog-5')?.imageUrl || '',
    imageHint: 'Nepal landscape mountains',
    content: `
      <h2 class="font-headline text-3xl font-semibold mt-8 mb-4">Navigating the Monsoon Fury with Technology</h2>
      <p>The 2024 monsoon season has once again tested Nepal's resilience. With heavy rainfall triggering widespread landslides and flooding, particularly in the hilly and Terai regions, communities face significant challenges. However, this year is different. Technology, from AI-powered weather prediction to drone-based damage assessment, is playing a crucial role in the nation's response.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">AI-Powered Early Warning Systems</h3>
      <p>This year, authorities have deployed advanced AI models that analyze satellite imagery and meteorological data to predict potential landslide zones with greater accuracy. These early warning systems send automated alerts to vulnerable communities via SMS, allowing for timely evacuations and saving lives. This proactive approach marks a significant shift from traditional, reactive disaster management.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">A Focus on Long-Term Adaptation</h3>
      <p>While the immediate focus is on relief, the long-term goal is to build a more climate-resilient Nepal. Experts are calling for more investment in climate adaptation strategies informed by AI. This includes developing smarter infrastructure, promoting climate-resilient agriculture, and establishing community-based disaster management programs equipped with modern technology. By embracing innovation, Nepal is not just surviving the monsoon; it's learning to adapt and thrive.</p>
    `,
  },
  {
    slug: 'future-of-large-language-models',
    title: 'Beyond GPT-4: What Does 2025 Hold for Large Language Models?',
    description: 'LLMs are evolving at a breakneck pace. We dive into the 2025 trends shaping the future of AI, including multimodality, on-device processing, and the quest for AGI.',
    date: '2024-07-22',
    author: 'Alex Ray',
    authorImage: placeholderImages.placeholderImages.find(p => p.id === 'team-3')?.imageUrl || '',
    authorImageHint: 'person portrait',
    image: placeholderImages.placeholderImages.find(p => p.id === 'blog-6')?.imageUrl || '',
    imageHint: 'futuristic AI brain',
    content: `
      <h2 class="font-headline text-3xl font-semibold mt-8 mb-4">The Next Frontier: LLMs in 2025</h2>
      <p>The AI world has been captivated by the capabilities of models like GPT-4, but innovation is far from over. As we look towards 2025, the next wave of Large Language Models (LLMs) is pushing boundaries in several key areas that will redefine our interaction with technology.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">Multimodality as the Standard</h3>
      <p>The future is multimodal. By 2025, we expect leading models to not just process text, but to seamlessly understand and generate content across images, audio, and video. Imagine an AI that can watch a movie clip and write a detailed script for the next scene, or listen to a melody and compose a full orchestration. This will unlock revolutionary applications in creative fields, data analysis, and human-computer interaction.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">Efficiency and On-Device Processing</h3>
      <p>Another major trend is the move towards smaller, more efficient models that can run directly on personal devices like smartphones and laptops. This "on-device AI" reduces reliance on the cloud, significantly improves user privacy, and lowers latency. The challenge lies in shrinking these models without sacrificing their powerful capabilities, a field of research known as model quantization and pruning.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">The Path to AGI: Autonomous Agents</h3>
      <p>While true Artificial General Intelligence (AGI) remains a distant goal, 2025 will see the rise of more sophisticated autonomous AI agents. These agents can take on complex, multi-step tasks, reason about their goals, and learn from their environment. We are exploring new architectures that give models more robust reasoning, common sense, and the ability to learn continuously, bringing us one step closer to truly intelligent systems.</p>
    `,
  },
  {
    slug: 'ai-in-healthcare-2025',
    title: 'AI in Healthcare: Predictions for 2025',
    description: 'From diagnostic imaging to personalized medicine, AI is set to revolutionize healthcare. Here are our top predictions for the impact of AI in the medical field by 2025.',
    date: '2024-07-21',
    author: 'Jane Doe',
    authorImage: placeholderImages.placeholderImages.find(p => p.id === 'team-2')?.imageUrl || '',
    authorImageHint: 'woman portrait',
    image: placeholderImages.placeholderImages.find(p => p.id === 'blog-7')?.imageUrl || '',
    imageHint: 'healthcare technology',
    content: `
      <h2 class="font-headline text-3xl font-semibold mt-8 mb-4">The AI Doctor Will See You Now</h2>
      <p>By 2025, artificial intelligence will be an indispensable tool in the healthcare industry. Its ability to analyze vast amounts of data will lead to earlier diagnoses, more effective treatments, and more personalized patient care.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">AI-Powered Diagnostic Imaging</h3>
      <p>We predict that AI algorithms will be routinely used to analyze medical images such as X-rays, CT scans, and MRIs. These systems can detect subtle patterns that may be invisible to the human eye, leading to earlier and more accurate diagnoses of diseases like cancer and Alzheimer's. This will act as a powerful co-pilot for radiologists, improving accuracy and speed.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">Personalized Treatment Plans</h3>
      <p>AI will enable a new era of personalized medicine. By analyzing a patient's genetic information, lifestyle, and medical history, AI models can predict which treatments are most likely to be effective for that individual. This will move us away from a one-size-fits-all approach to medicine and towards highly customized care plans that maximize positive outcomes.</p>
      <p>The integration of AI into healthcare is not without its challenges, including data privacy and regulatory hurdles. However, the potential benefits are immense, and we expect 2025 to be a landmark year for AI in medicine.</p>
    `,
  },
  {
    slug: 'quantum-computing-and-ai',
    title: 'The Intersection of Quantum Computing and AI',
    description: 'Quantum computing promises to solve problems that are currently intractable for even the most powerful supercomputers. We explore how this new paradigm will supercharge AI development.',
    date: '2024-07-19',
    author: 'Samir A.',
    authorImage: placeholderImages.placeholderImages.find(p => p.id === 'team-1')?.imageUrl || '',
    authorImageHint: 'man portrait',
    image: placeholderImages.placeholderImages.find(p => p.id === 'blog-8')?.imageUrl || '',
    imageHint: 'quantum computer',
    content: `
      <h2 class="font-headline text-3xl font-semibold mt-8 mb-4">A New Computing Paradigm for AI</h2>
      <p>The synergy between quantum computing and artificial intelligence is poised to unlock unprecedented computational power. While classical computers store information in bits (0s and 1s), quantum computers use qubits, which can exist in multiple states at once. This fundamental difference allows them to perform complex calculations at speeds unimaginable for classical machines.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">Quantum Machine Learning</h3>
      <p>One of the most exciting applications is in machine learning. Quantum algorithms can process high-dimensional data more efficiently, potentially leading to breakthroughs in training more powerful and complex AI models. This could dramatically accelerate drug discovery, financial modeling, and the development of new materials.</p>
      <h3 class="font-headline text-2xl font-semibold mt-6 mb-4">Challenges and the Road Ahead</h3>
      <p>Despite the promise, quantum computing is still in its early stages. Building stable, large-scale quantum computers is a monumental engineering challenge. However, as the technology matures, the fusion of quantum computing and AI will undoubtedly usher in a new era of scientific discovery and technological innovation.</p>
    `,
  },
];

export function getTeamMembers(): TeamMember[] {
  return teamMembers;
}

export function getLatestVideos(): LatestVideo[] {
  return latestVideos;
}

export function getBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
