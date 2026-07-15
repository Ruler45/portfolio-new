import type { Metadata } from "next";
import { PortfolioExperience } from "./portfolio/portfolio-experience";
import { incrementVisitCount } from "@/lib/visit-counter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sahin Alam | Developer Portfolio",
  description:
    "A complete developer portfolio with motion-driven sections, a progressive project stack, and a custom interaction layer."
};

const GITHUB_USERNAME = "ruler45";

type GitHubProject = {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  topics: string[];
  homepage: string | null;
};

const fallbackRepositories: GitHubProject[] = [
  {
    name: "Linkedfy",
    description:
      "LinkedIn automation tooling that reduces repetitive outreach and keeps networking personalized.",
    url: "https://github.com/ruler45",
    stars: 0,
    forks: 0,
    language: "Node.js",
    updatedAt: "2026-07-15T00:00:00.000Z",
    topics: ["automation", "productivity", "browser"],
    homepage: null
  },
  {
    name: "TalentFlow",
    description:
      "A lightweight hiring flow for posting jobs, registering candidates, and running assessments.",
    url: "https://github.com/ruler45",
    stars: 0,
    forks: 0,
    language: "Next.js",
    updatedAt: "2026-07-15T00:00:00.000Z",
    topics: ["hiring", "fullstack", "mongodb"],
    homepage: null
  },
  {
    name: "ED Process Parameter Optimization Model",
    description:
      "Predictive modeling and tuning work for coating analysis using a compact dataset.",
    url: "https://github.com/ruler45",
    stars: 0,
    forks: 0,
    language: "Python",
    updatedAt: "2026-07-15T00:00:00.000Z",
    topics: ["machine-learning", "analytics", "scikit-learn"],
    homepage: null
  }
];

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
  homepage: string | null;
  fork: boolean;
  archived: boolean;
};

async function loadRepositories(): Promise<GitHubProject[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "PortfolioSite"
        },
        next: {
          revalidate: 3600
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub request failed with ${response.status}`);
    }

    const repositories = (await response.json()) as GitHubRepo[];

    return repositories
      .filter((repository) => !repository.fork && !repository.archived)
      .map((repository) => ({
        name: repository.name,
        description:
          repository.description ?? "A project from the GitHub profile that still deserves a live spot.",
        url: repository.html_url,
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        language: repository.language ?? "Unknown",
        updatedAt: repository.updated_at,
        topics: repository.topics ?? [],
        homepage: repository.homepage
      }));
  } catch {
    return fallbackRepositories;
  }
}

export default async function PortfolioPage() {
  const [repositories, visitCount] = await Promise.all([loadRepositories(), incrementVisitCount()]);

  return (
    <PortfolioExperience
      githubProjects={repositories}
      githubUrl={`https://github.com/${GITHUB_USERNAME}`}
      portfolioUrl="https://sahin.codes"
      email="sahin0945.work@gmail.com"
      phone="+91 6295265705"
      location="Bengaluru, Karnataka, India"
      visitCount={visitCount}
    />
  );
}