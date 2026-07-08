import type { DiagramId } from "@/lib/content";
import { DirectExecutionDiagram } from "@/components/diagrams/DirectExecutionDiagram";
import { NftMintFlowDiagram } from "@/components/diagrams/NftMintFlowDiagram";
import { TokenTriangleDiagram } from "@/components/diagrams/TokenTriangleDiagram";
import { UiBypassDiagram } from "@/components/diagrams/UiBypassDiagram";

type ProjectDiagramProps = {
  id: DiagramId;
  className?: string;
};

const diagramMap = {
  "token-triangle": TokenTriangleDiagram,
  "ui-bypass": UiBypassDiagram,
  "direct-execution": DirectExecutionDiagram,
  "nft-mint-flow": NftMintFlowDiagram,
} as const;

export function ProjectDiagram({ id, className }: ProjectDiagramProps) {
  const Diagram = diagramMap[id];
  return <Diagram className={className} />;
}
