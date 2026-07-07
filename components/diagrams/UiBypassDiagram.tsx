type DiagramProps = {
  className?: string;
};

function DiagramCaption({ children }: { children: string }) {
  return <p className="diagram-caption">{children}</p>;
}

function NodeBox({ x, y, label, width = 100 }: { x: number; y: number; label: string; width?: number }) {
  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - 18}
        width={width}
        height="36"
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

export function UiBypassDiagram({ className }: DiagramProps) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 480 260"
        role="img"
        aria-label="サイトUI経由の取引と、スマートコントラクトへの直接実行の比較"
        className="diagram-svg"
      >
        <title>UI経路と直接実行の比較</title>

        <text x="20" y="30" className="diagram-sublabel">
          UI経由（遅い）
        </text>

        {/* Slow path: User -> UI -> Contract */}
        <NodeBox x="70" y="70" label="User" width={72} />
        <path
          d="M 106 70 L 154 70"
          fill="none"
          stroke="#8a8a8a"
          strokeWidth="1"
          strokeDasharray="4 4"
          markerEnd="url(#arrowhead-ui-muted)"
          className="diagram-arrow-muted"
        />
        <NodeBox x="200" y="70" label="Site UI" width={88} />
        <path
          d="M 244 70 L 292 70"
          fill="none"
          stroke="#8a8a8a"
          strokeWidth="1"
          strokeDasharray="4 4"
          markerEnd="url(#arrowhead-ui-muted)"
          className="diagram-arrow-muted"
        />
        <NodeBox x="350" y="70" label="Contract" width={100} />

        <text x="20" y="155" className="diagram-sublabel">
          直接実行（速い）
        </text>

        {/* Fast path: Your Contract -> Contract */}
        <NodeBox x="150" y="195" label="Your Contract" width={120} />
        <path
          d="M 210 195 L 300 195"
          fill="none"
          stroke="#111"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead-ui)"
          className="diagram-arrow-flow diagram-arrow-fast"
        />
        <NodeBox x="350" y="195" label="Contract" width={100} />

        <text x="255" y="178" textAnchor="middle" className="diagram-sublabel diagram-bypass-label">
          bypass UI
        </text>

        <defs>
          <marker id="arrowhead-ui" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#111" />
          </marker>
          <marker id="arrowhead-ui-muted" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#8a8a8a" />
          </marker>
        </defs>
      </svg>
      <DiagramCaption>UIを介さない直接実行の方が、ボタン操作を待たずに速く取引できる</DiagramCaption>
    </figure>
  );
}
