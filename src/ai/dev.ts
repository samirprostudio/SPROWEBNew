import { config } from 'dotenv';
config();

// Important: load Genkit plugins before other imports
import '@/ai/genkit';

import '@/ai/flows/generate-brand-story';
import '@/ai/flows/chat';
