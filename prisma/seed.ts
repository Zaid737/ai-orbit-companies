import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const categories = [
  { name: "AI Research", slug: "ai-research" },
  { name: "AI Infrastructure", slug: "ai-infrastructure" },
  { name: "AI Applications", slug: "ai-applications" },
  { name: "Robotics", slug: "robotics" },
  { name: "AI Hardware", slug: "ai-hardware" },
];

const companies = [
  {
    name: "OpenAI",
    slug: "openai",
    description:
      "AI research and deployment company building artificial intelligence systems and products.",
    website: "https://openai.com",
    location: "San Francisco, California",
    foundedYear: 2015,
    employeeRange: "1,000-5,000",
    category: "AI Research",
    products: [
      {
        name: "ChatGPT",
        slug: "chatgpt",
        description: "AI assistant for conversation, reasoning, writing, and coding.",
        website: "https://chatgpt.com",
      },
      {
        name: "Sora",
        slug: "sora",
        description: "AI system for generating videos from text and other inputs.",
        website: "https://sora.com",
      },
    ],
    models: [
      {
        name: "GPT-5",
        description: "General-purpose frontier AI model.",
      },
      {
        name: "GPT-4.1",
        description: "Advanced model optimized for coding and instruction following.",
      },
    ],
  },

  {
    name: "Anthropic",
    slug: "anthropic",
    description:
      "AI safety and research company building reliable and interpretable AI systems.",
    website: "https://www.anthropic.com",
    location: "San Francisco, California",
    foundedYear: 2021,
    employeeRange: "1,000-5,000",
    category: "AI Research",
    products: [
      {
        name: "Claude",
        slug: "claude",
        description: "AI assistant designed for reasoning, writing, analysis, and coding.",
        website: "https://claude.ai",
      },
    ],
    models: [
      {
        name: "Claude Opus",
        description: "High-capability model for complex reasoning tasks.",
      },
      {
        name: "Claude Sonnet",
        description: "Balanced model for performance and speed.",
      },
    ],
  },

  {
    name: "Google DeepMind",
    slug: "google-deepmind",
    description:
      "AI research laboratory working on artificial intelligence and scientific discovery.",
    website: "https://deepmind.google",
    location: "London, United Kingdom",
    foundedYear: 2010,
    employeeRange: "5,000+",
    category: "AI Research",
    products: [
      {
        name: "Gemini",
        slug: "gemini",
        description: "Google's family of multimodal AI models and products.",
        website: "https://gemini.google.com",
      },
    ],
    models: [
      {
        name: "Gemini",
        description: "Multimodal AI model family.",
      },
      {
        name: "Gemma",
        description: "Open AI models designed for developers and researchers.",
      },
    ],
  },

  {
    name: "xAI",
    slug: "xai",
    description:
      "AI company focused on building advanced artificial intelligence systems.",
    website: "https://x.ai",
    location: "Palo Alto, California",
    foundedYear: 2023,
    employeeRange: "500-1,000",
    category: "AI Research",
    products: [
      {
        name: "Grok",
        slug: "grok",
        description: "AI assistant developed by xAI.",
        website: "https://grok.com",
      },
    ],
    models: [
      {
        name: "Grok",
        description: "Large language model developed by xAI.",
      },
    ],
  },

  {
    name: "Meta AI",
    slug: "meta-ai",
    description:
      "AI organization at Meta developing foundation models and AI-powered products.",
    website: "https://ai.meta.com",
    location: "Menlo Park, California",
    foundedYear: 2013,
    employeeRange: "5,000+",
    category: "AI Research",
    products: [
      {
        name: "Meta AI",
        slug: "meta-ai-assistant",
        description: "AI assistant integrated across Meta products.",
        website: "https://www.meta.ai",
      },
    ],
    models: [
      {
        name: "Llama",
        description: "Open family of large language models.",
      },
    ],
  },

  {
    name: "Mistral AI",
    slug: "mistral-ai",
    description:
      "AI company developing efficient and accessible generative AI models.",
    website: "https://mistral.ai",
    location: "Paris, France",
    foundedYear: 2023,
    employeeRange: "100-500",
    category: "AI Research",
    products: [
      {
        name: "Le Chat",
        slug: "le-chat",
        description: "Mistral's conversational AI assistant.",
        website: "https://chat.mistral.ai",
      },
    ],
    models: [
      {
        name: "Mistral Large",
        description: "Large language model for advanced reasoning and generation.",
      },
      {
        name: "Mixtral",
        description: "Mixture-of-experts language model.",
      },
    ],
  },

  {
    name: "Cohere",
    slug: "cohere",
    description:
      "Enterprise AI company building language models and AI solutions.",
    website: "https://cohere.com",
    location: "Toronto, Canada",
    foundedYear: 2019,
    employeeRange: "500-1,000",
    category: "AI Applications",
    products: [
      {
        name: "Command",
        slug: "command",
        description: "Enterprise-focused family of generative AI models.",
        website: "https://cohere.com",
      },
    ],
    models: [
      {
        name: "Command R+",
        description: "Enterprise language model optimized for retrieval and generation.",
      },
    ],
  },

  {
    name: "Perplexity",
    slug: "perplexity",
    description:
      "AI search company combining web search with conversational answers.",
    website: "https://www.perplexity.ai",
    location: "San Francisco, California",
    foundedYear: 2022,
    employeeRange: "100-500",
    category: "AI Applications",
    products: [
      {
        name: "Perplexity",
        slug: "perplexity-search",
        description: "AI-powered search and answer engine.",
        website: "https://www.perplexity.ai",
      },
    ],
    models: [],
  },

  {
    name: "Hugging Face",
    slug: "hugging-face",
    description:
      "AI platform providing models, datasets, libraries, and collaboration tools.",
    website: "https://huggingface.co",
    location: "New York, New York",
    foundedYear: 2016,
    employeeRange: "500-1,000",
    category: "AI Infrastructure",
    products: [
      {
        name: "Hugging Face Hub",
        slug: "hugging-face-hub",
        description: "Platform for sharing AI models and datasets.",
        website: "https://huggingface.co",
      },
    ],
    models: [],
  },

  {
    name: "NVIDIA",
    slug: "nvidia",
    description:
      "Technology company developing GPUs and computing platforms powering modern AI.",
    website: "https://www.nvidia.com",
    location: "Santa Clara, California",
    foundedYear: 1993,
    employeeRange: "10,000+",
    category: "AI Hardware",
    products: [
      {
        name: "CUDA",
        slug: "cuda",
        description: "Parallel computing platform and programming model.",
        website: "https://developer.nvidia.com/cuda",
      },
    ],
    models: [],
  },

  {
    name: "Scale AI",
    slug: "scale-ai",
    description:
      "AI infrastructure company providing data and evaluation solutions.",
    website: "https://scale.com",
    location: "San Francisco, California",
    foundedYear: 2016,
    employeeRange: "1,000-5,000",
    category: "AI Infrastructure",
    products: [
      {
        name: "Scale Data Engine",
        slug: "scale-data-engine",
        description: "Infrastructure for developing and managing AI training data.",
        website: "https://scale.com",
      },
    ],
    models: [],
  },

  {
    name: "Figure AI",
    slug: "figure-ai",
    description:
      "Robotics company developing general-purpose humanoid robots.",
    website: "https://www.figure.ai",
    location: "Sunnyvale, California",
    foundedYear: 2022,
    employeeRange: "100-500",
    category: "Robotics",
    products: [
      {
        name: "Figure 02",
        slug: "figure-02",
        description: "General-purpose humanoid robot.",
        website: "https://www.figure.ai",
      },
    ],
    models: [],
  },

  {
    name: "Agility Robotics",
    slug: "agility-robotics",
    description:
      "Robotics company developing bipedal robots for real-world applications.",
    website: "https://www.agilityrobotics.com",
    location: "Salem, Oregon",
    foundedYear: 2015,
    employeeRange: "100-500",
    category: "Robotics",
    products: [
      {
        name: "Digit",
        slug: "digit",
        description: "Humanoid robot designed for logistics and industrial work.",
        website: "https://www.agilityrobotics.com/digit",
      },
    ],
    models: [],
  },

  {
    name: "Runway",
    slug: "runway",
    description:
      "Applied AI research company developing creative AI tools for video generation.",
    website: "https://runwayml.com",
    location: "New York, New York",
    foundedYear: 2018,
    employeeRange: "100-500",
    category: "AI Applications",
    products: [
      {
        name: "Runway",
        slug: "runway",
        description: "AI-powered creative platform for generating and editing video.",
        website: "https://runwayml.com",
      },
    ],
    models: [
      {
        name: "Gen-4",
        description: "Generative video model developed by Runway.",
      },
    ],
  },

  {
    name: "Adobe",
    slug: "adobe",
    description:
      "Creative software company integrating generative AI across its creative products.",
    website: "https://www.adobe.com",
    location: "San Jose, California",
    foundedYear: 1982,
    employeeRange: "10,000+",
    category: "AI Applications",
    products: [
      {
        name: "Firefly",
        slug: "firefly",
        description: "Generative AI family for creative workflows.",
        website: "https://firefly.adobe.com",
      },
    ],
    models: [
      {
        name: "Adobe Firefly",
        description: "Generative AI models for creative content.",
      },
    ],
  },

  {
    name: "Databricks",
    slug: "databricks",
    description:
      "Data and AI platform helping organizations build and deploy AI applications.",
    website: "https://www.databricks.com",
    location: "San Francisco, California",
    foundedYear: 2013,
    employeeRange: "5,000+",
    category: "AI Infrastructure",
    products: [
      {
        name: "Mosaic AI",
        slug: "mosaic-ai",
        description: "Tools for building and deploying generative AI applications.",
        website: "https://www.databricks.com/product/artificial-intelligence",
      },
    ],
    models: [
      {
        name: "DBRX",
        description: "Open large language model developed by Databricks.",
      },
    ],
  },

  {
    name: "ElevenLabs",
    slug: "elevenlabs",
    description:
      "AI company developing speech synthesis, voice cloning, and audio AI technology.",
    website: "https://elevenlabs.io",
    location: "New York, New York",
    foundedYear: 2022,
    employeeRange: "100-500",
    category: "AI Applications",
    products: [
      {
        name: "ElevenLabs",
        slug: "elevenlabs-platform",
        description: "AI platform for speech and audio generation.",
        website: "https://elevenlabs.io",
      },
    ],
    models: [
      {
        name: "Eleven Multilingual",
        description: "Multilingual text-to-speech model.",
      },
    ],
  },

  {
    name: "Sakana AI",
    slug: "sakana-ai",
    description:
      "AI research company exploring nature-inspired approaches to foundation models.",
    website: "https://sakana.ai",
    location: "Tokyo, Japan",
    foundedYear: 2023,
    employeeRange: "50-100",
    category: "AI Research",
    products: [],
    models: [],
  },

  {
    name: "Reka AI",
    slug: "reka-ai",
    description:
      "AI research company developing multimodal foundation models.",
    website: "https://www.reka.ai",
    location: "San Francisco, California",
    foundedYear: 2022,
    employeeRange: "50-100",
    category: "AI Research",
    products: [],
    models: [
      {
        name: "Reka Core",
        description: "Multimodal foundation model.",
      },
    ],
  },

  {
    name: "Groq",
    slug: "groq",
    description:
      "AI infrastructure company developing specialized hardware and inference systems.",
    website: "https://groq.com",
    location: "Mountain View, California",
    foundedYear: 2016,
    employeeRange: "100-500",
    category: "AI Infrastructure",
    products: [
      {
        name: "GroqCloud",
        slug: "groqcloud",
        description: "Cloud platform for high-speed AI inference.",
        website: "https://groq.com",
      },
    ],
    models: [],
  },

  {
    name: "Tesla AI",
    slug: "tesla-ai",
    description:
      "Tesla's AI organization focused on autonomous driving and robotics.",
    website: "https://www.tesla.com/AI",
    location: "Austin, Texas",
    foundedYear: 2003,
    employeeRange: "10,000+",
    category: "Robotics",
    products: [
      {
        name: "Optimus",
        slug: "optimus",
        description: "Tesla's general-purpose humanoid robot.",
        website: "https://www.tesla.com/AI",
      },
    ],
    models: [],
  },
];

async function main() {
  console.log("Seeding database...");

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: category,
    });
  }

  for (const company of companies) {
    const category = await prisma.category.findUnique({
      where: { name: company.category },
    });

    if (!category) {
      throw new Error(`Category not found: ${company.category}`);
    }

    await prisma.company.upsert({
      where: { slug: company.slug },
      update: {
        name: company.name,
        description: company.description,
        website: company.website,
        location: company.location,
        foundedYear: company.foundedYear,
        employeeRange: company.employeeRange,
        categoryId: category.id,
      },
      create: {
        name: company.name,
        slug: company.slug,
        description: company.description,
        website: company.website,
        location: company.location,
        foundedYear: company.foundedYear,
        employeeRange: company.employeeRange,
        categoryId: category.id,
        products: {
          create: company.products,
        },
        models: {
          create: company.models,
        },
      },
    });
  }

  console.log(`Created/updated ${companies.length} companies.`);
  console.log(`Created/updated ${categories.length} categories.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });