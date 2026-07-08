"use client";

import Image from "next/image";
import type { TrainingEvidence } from "@/lib/content";
import evalSummary from "@/lib/data/rl-eval-summary.json";
import { pickByMode, useProjectViewMode } from "@/components/ProjectViewModeContext";
import { ScrollReveal } from "@/components/ScrollReveal";

type RlTrainingEvidenceProps = {
  evidence: TrainingEvidence;
  repoUrl?: string;
};

type EvalSummary = {
  successRate: number;
  avgError: number;
  avgTurns: number;
  avgReward: number;
  episodes: number;
  rewardVersion: string;
  modelPath: string;
  repoUrl: string;
  benchmark?: {
    source: string;
    successRate: number;
    avgError: number;
    avgTurns: number;
    avgReward: number;
  };
};

const summary = evalSummary as EvalSummary;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function assetPath(path: string) {
  return `${basePath}${path}`;
}

export function RlTrainingEvidence({ evidence, repoUrl }: RlTrainingEvidenceProps) {
  const { mode } = useProjectViewMode();
  const pick = <T,>(base: T, simple: T | undefined): T => pickByMode(base, simple, mode);

  const title = pick(evidence.title, evidence.titleSimple);
  const sourceUrl = repoUrl ?? summary.repoUrl;

  const metrics = [
    {
      label: pick("Success Rate", "成功率"),
      value: `${summary.successRate}%`,
      note: pick(`${summary.episodes} episodes`, `${summary.episodes}回テスト`),
    },
    {
      label: pick("Avg Error", "平均誤差"),
      value: String(summary.avgError),
      note: pick("total error", "合計誤差"),
    },
    {
      label: pick("Avg Turns", "平均ターン"),
      value: String(summary.avgTurns),
      note: pick("per episode", "1ゲームあたり"),
    },
  ];

  return (
    <ScrollReveal distance={40} threshold={0.1}>
      <section id="section-training-results" className="section-rule scroll-mt-32 py-14 md:py-20">
        <p className="section-label">{title}</p>

        <ul className="training-kpi-grid mt-8 md:mt-10">
          {metrics.map((metric) => (
            <li key={metric.label} className="training-kpi-card">
              <p className="training-kpi-label">{metric.label}</p>
              <p className="training-kpi-value">{metric.value}</p>
              <p className="training-kpi-note">{metric.note}</p>
            </li>
          ))}
        </ul>

        {summary.benchmark && (
          <p className="training-benchmark-note mt-6 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            {pick(
              `Recorded benchmark (${summary.benchmark.source}): success ${summary.benchmark.successRate}%, avg error ${summary.benchmark.avgError}, avg turns ${summary.benchmark.avgTurns}.`,
              `報酬関数改良時の記録ベスト: 成功率 ${summary.benchmark.successRate}%（誤差 ${summary.benchmark.avgError}、${summary.benchmark.avgTurns}ターン）。`,
            )}
          </p>
        )}

        <div className="mt-10 space-y-10 md:mt-12">
          {evidence.charts.map((chart) => (
            <figure key={chart.src} className="training-chart-figure max-w-2xl">
              <div className="training-chart-frame">
                <Image
                  src={assetPath(chart.src)}
                  alt={chart.alt}
                  width={1200}
                  height={540}
                  unoptimized
                  className="training-chart-image"
                />
              </div>
              <figcaption className="diagram-caption mt-4">
                {pick(chart.caption, chart.captionSimple)}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="training-source-note mt-8 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          {pick(
            `Source: ${summary.rewardVersion} · ${summary.modelPath} · `,
            `出典: ${summary.rewardVersion} · ${summary.modelPath} · `,
          )}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer-link"
          >
            GitHub
          </a>
        </p>
      </section>
    </ScrollReveal>
  );
}
