"use client";

import * as d3 from "d3";
import { motion } from "framer-motion";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef } from "react";

export type Repository = {
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

type PortfolioClientProps = {
  repositories: Repository[];
  githubUrl: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 }
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function buildLanguageStats(repositories: Repository[]) {
  const counts = new Map<string, number>();

  for (const repository of repositories) {
    counts.set(repository.language, (counts.get(repository.language) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([language, count]) => ({ language, count }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 6);
}

function buildTopicStats(repositories: Repository[]) {
  const counts = new Map<string, number>();

  for (const repository of repositories) {
    for (const topic of repository.topics) {
      counts.set(topic, (counts.get(topic) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([topic, count]) => ({ topic, count }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 10);
}

function LanguageChart({ repositories }: { repositories: Repository[] }) {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const languageStats = useMemo(() => buildLanguageStats(repositories), [repositories]);

  useEffect(() => {
    const svgElement = chartRef.current;

    if (!svgElement || languageStats.length === 0) {
      return;
    }

    const svg = d3.select(svgElement);
    svg.selectAll("*").remove();

    const width = 720;
    const margin = { top: 24, right: 28, bottom: 44, left: 130 };
    const height = Math.max(320, languageStats.length * 54 + margin.top + margin.bottom);
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const y = d3
      .scaleBand<string>()
      .domain(languageStats.map((entry) => entry.language))
      .range([0, innerHeight])
      .padding(0.22);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(languageStats, (entry) => entry.count) ?? 1])
      .nice()
      .range([0, innerWidth]);

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("role", "img")
      .attr("aria-label", "Bar chart of repository languages")
      .style("width", "100%");

    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "languageGradient")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "0%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#5ee0ff");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#7cf7c0");

    const root = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    root
      .append("g")
      .attr("class", "axis axis-y")
      .call(d3.axisLeft(y).tickSize(0))
      .call((group) => {
        group.select(".domain").remove();
        group.selectAll("text").attr("fill", "#dce8ff").attr("font-size", "13px");
      });

    root
      .append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(4).tickSizeOuter(0))
      .call((group) => {
        group.select(".domain").attr("stroke", "rgba(255,255,255,0.14)");
        group.selectAll("line").attr("stroke", "rgba(255,255,255,0.08)");
        group.selectAll("text").attr("fill", "#9fb1cb").attr("font-size", "12px");
      });

    root
      .selectAll("rect")
      .data(languageStats)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (entry) => y(entry.language) ?? 0)
      .attr("width", 0)
      .attr("height", y.bandwidth())
      .attr("rx", 12)
      .attr("fill", "url(#languageGradient)")
      .transition()
      .duration(900)
      .ease(d3.easeCubicOut)
      .attr("width", (entry) => x(entry.count));
  }, [languageStats]);

  if (languageStats.length === 0) {
    return null;
  }

  return <svg ref={chartRef} className="language-chart" />;
}

function KineticRibbon({ topics }: { topics: Array<{ topic: string; count: number }> }) {
  const ribbonEntries = [...topics, ...topics, ...topics];

  if (ribbonEntries.length === 0) {
    return null;
  }

  return (
    <div className="portfolio-ribbon glass-card" aria-hidden="true">
      <div className="ribbon-track">
        {ribbonEntries.map((entry, index) => (
          <span key={`${entry.topic}-${index}`} className="ribbon-chip">
            {entry.topic} <strong>{entry.count}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

function StageCard({ repository, index }: { repository: Repository; index: number }) {
  const style = {
    ["--delay" as string]: `${index * 180}ms`
  } as CSSProperties;

  return (
    <motion.article
      className="stage-repo"
      style={style}
      animate={{ y: [0, -10, 0], rotateX: [12, 18, 12] }}
      transition={{ duration: 6.5 + index, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="stage-repo-top">
        <span>{repository.language}</span>
        <strong>{repository.stars}★</strong>
      </div>
      <h3>{repository.name}</h3>
      <p>{repository.description}</p>
    </motion.article>
  );
}

export function PortfolioClient({ repositories, githubUrl }: PortfolioClientProps) {
  const repositoryCount = repositories.length;
  const languageCount = new Set(repositories.map((repository) => repository.language)).size;
  const latestUpdate = repositories[0]?.updatedAt;
  const topicStats = useMemo(() => buildTopicStats(repositories), [repositories]);
  const spotlightRepositories = repositories.slice(0, 3);

  return (
    <main className="portfolio-shell">
      <div className="portfolio-ambient portfolio-ambient-one" />
      <div className="portfolio-ambient portfolio-ambient-two" />

      <KineticRibbon topics={topicStats} />

      <motion.section
        className="portfolio-hero"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className="portfolio-hero-copy glass-card" variants={itemVariants}>
          <p className="portfolio-kicker">GitHub powered · motion tuned · data aware</p>
          <h1>Modern developer portfolio.</h1>
          <p className="portfolio-headline">
            A sharper view of the work behind the name: project cards, GitHub-derived metrics, and a
            small D3 snapshot of the stack I use most.
          </p>
          <p className="portfolio-body">
            This page pulls in repositories from <a href={githubUrl} target="_blank" rel="noreferrer">{githubUrl}</a>
            , then shapes them into a portfolio that feels more like a product surface than a static resume.
          </p>

          <div className="portfolio-actions">
            <a href={githubUrl} target="_blank" rel="noreferrer" className="cta cta-primary">
              View GitHub
            </a>
            <Link href="/" className="cta">
              Back to landing page
            </Link>
          </div>

          <div className="portfolio-metrics">
            <article className="metric-card">
              <strong>{repositoryCount}</strong>
              <span>repositories surfaced</span>
            </article>
            <article className="metric-card">
              <strong>{languageCount}</strong>
              <span>languages represented</span>
            </article>
            <article className="metric-card">
              <strong>{latestUpdate ? formatDate(latestUpdate) : "Now"}</strong>
              <span>latest repo update</span>
            </article>
          </div>
        </motion.div>

        <motion.aside
          className="portfolio-stage glass-card"
          variants={itemVariants}
          animate={{ rotateX: [10, 13, 10], rotateY: [-10, -14, -10] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="stage-grid" aria-hidden="true" />
          <div className="stage-orbit stage-orbit-one" aria-hidden="true" />
          <div className="stage-orbit stage-orbit-two" aria-hidden="true" />
          <div className="stage-orbit stage-orbit-three" aria-hidden="true" />

          <motion.div
            className="stage-core"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="stage-core-kicker">portfolio engine</span>
            <h3>ruler45</h3>
            <p>Motion, data, and layered depth driven by live GitHub projects.</p>
          </motion.div>

          <div className="stage-float stage-float-top">
            <span>3D depth</span>
            <strong>CSS + Motion</strong>
          </div>

          <div className="stage-float stage-float-bottom">
            <span>Data source</span>
            <strong>GitHub API</strong>
          </div>

          <div className="stage-cards">
            {spotlightRepositories.map((repository, index) => (
              <StageCard key={repository.name} repository={repository} index={index} />
            ))}
          </div>
        </motion.aside>
      </motion.section>

      <motion.section
        className="portfolio-section glass-card"
        variants={itemVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <div className="section-heading portfolio-section-heading">
          <p className="portfolio-kicker">D3 insight</p>
          <h2>Repository languages at a glance.</h2>
        </div>
        <LanguageChart repositories={repositories} />
      </motion.section>

      <motion.section
        className="portfolio-section glass-card"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        <div className="section-heading portfolio-section-heading">
          <p className="portfolio-kicker">Projects from GitHub</p>
          <h2>Every repo, presented like a portfolio system.</h2>
        </div>

        <div className="repo-grid">
          {repositories.map((repository) => (
            <motion.article
              key={repository.name}
              className="repo-card"
              variants={itemVariants}
              whileHover={{ rotateX: -10, rotateY: 12, y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
            >
              <div className="repo-top">
                <div>
                  <p className="repo-language">{repository.language}</p>
                  <h3>{repository.name}</h3>
                </div>
                <span className="repo-date">Updated {formatDate(repository.updatedAt)}</span>
              </div>

              <p className="repo-description">{repository.description}</p>

              <div className="topic-row">
                {repository.topics.length > 0 ? (
                  repository.topics.map((topic) => (
                    <span key={topic} className="topic-tag">
                      {topic}
                    </span>
                  ))
                ) : (
                  <span className="topic-tag">No topics published</span>
                )}
              </div>

              <div className="repo-meta">
                <span>{repository.stars} stars</span>
                <span>{repository.forks} forks</span>
              </div>

              <div className="portfolio-actions portfolio-actions-tight">
                <a href={repository.url} target="_blank" rel="noreferrer" className="cta cta-primary">
                  Open repo
                </a>
                {repository.homepage ? (
                  <a href={repository.homepage} target="_blank" rel="noreferrer" className="cta">
                    Live site
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </main>
  );
}