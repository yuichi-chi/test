import type { DiagramId } from "@/lib/content";
import { DirectExecutionDiagram } from "@/components/diagrams/DirectExecutionDiagram";
import { NftMintFlowDiagram } from "@/components/diagrams/NftMintFlowDiagram";
import { RlTrainingDiagram } from "@/components/diagrams/RlTrainingDiagram";
import { TokenTriangleDiagram } from "@/components/diagrams/TokenTriangleDiagram";
import { UiBypassDiagram } from "@/components/diagrams/UiBypassDiagram";

type ProjectDiagramProps = {
  id: DiagramId;
  className?: string;
  compact?: boolean;
};

const diagramMap = {
  "token-triangle": TokenTriangleDiagram,
  "ui-bypass": UiBypassDiagram,
  "direct-execution": DirectExecutionDiagram,
  "nft-mint-flow": NftMintFlowDiagram,
  "rl-training-loop": RlTrainingDiagram,
} as const;

export function ProjectDiagram({ id, className, compact }: ProjectDiagramProps) {
  const Diagram = diagramMap[id];
  const resolvedClass = [className, compact ? "project-diagram-compact" : null].filter(Boolean).join(" ");
  return <Diagram className={resolvedClass} />;
}
