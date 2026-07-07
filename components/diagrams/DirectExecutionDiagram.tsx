type DiagramProps = {
  className?: string;
};

function DiagramCaption({ children }: { children: string }) {
  return <p className="diagram-caption">{children}</p>;
}

function StepBox({ x, y, label, width = 90 }: { x: number; y: number; label: string; width?: number }) {
  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - 20}
        width={width}
        height="40"
        rx="4"
        fill="var(--bg)"
        stroke="#111"
        strokeWidth="1"
      />
      <text x={x} y={y + 5} textAnchor="middle" className="diagram-label">
        {label}
      </text>
    </g>
  );
}

export function DirectExecutionDiagram({ className }: DiagramProps) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 520 200"
        role="img"
        aria-label="価格歪みの検知からSolidityトランザクションによる一括スワップ実行までのフロー"
        className="diagram-svg"
      >
        <title>歪み検知から直接実行までのフロー</title>

        <StepBox x="70" y="100" label="Monitor" width={88} />

        <path
          d="M 114 100 L 146 100"
          fill="none"
          stroke="#111"
          strokeWidth="1"
          markerEnd="url(#arrowhead-exec)"
          className="diagram-arrow-flow diagram-arrow-fast"
        />

        <g>
          <circle cx="190" cy="100" r="24" fill="var(--bg)" stroke="#111" strokeWidth="1" strokeDasharray="4 4" className="diagram-distortion" />
          <circle cx="190" cy="100" r="5" fill="#111" className="diagram-pulse" />
          <text x="190" y="145" textAnchor="middle" className="diagram-sublabel">
            歪み検知
          </text>
        </g>

        <path
          d="M 214 100 L 256 100"
          fill="none"
          stroke="#111"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead-exec)"
          className="diagram-arrow-flow diagram-arrow-fast"
          style={{ animationDelay: "0.3s" }}
        />

        <StepBox x="310" y="100" label="Solidity TX" width={100} />

        <path
          d="M 360 100 L 392 100"
          fill="none"
          stroke="#111"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead-exec)"
          className="diagram-arrow-flow diagram-arrow-fast"
          style={{ animationDelay: "0.6s" }}
        />

        <g>
          <rect x="402" y="72" width="96" height="56" rx="4" fill="var(--bg)" stroke="#111" strokeWidth="1" />
          <text x="450" y="95" textAnchor="middle" className="diagram-label">
            3 Swaps
          </text>
          <text x="450" y="115" textAnchor="middle" className="diagram-sublabel">
            一括実行
          </text>
        </g>

        <defs>
          <marker id="arrowhead-exec" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#111" />
          </marker>
        </defs>
      </svg>
      <DiagramCaption>歪みが閾値を超えた瞬間、自前コントラクトから3スワップを一気に流し込む</DiagramCaption>
    </figure>
  );
}
