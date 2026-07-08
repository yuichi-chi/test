type DiagramProps = {
  className?: string;
};

function DiagramCaption({ children }: { children: string }) {
  return <p className="diagram-caption">{children}</p>;
}

function NodeBox({
  x,
  y,
  label,
  sublabel,
  width = 108,
  height = 56,
}: {
  x: number;
  y: number;
  label: string;
  sublabel?: string;
  width?: number;
  height?: number;
}) {
  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        rx="4"
        fill="var(--bg)"
        stroke="#111"
        strokeWidth="1"
      />
      {sublabel ? (
        <>
          <text
            x={x}
            y={y - 9}
            textAnchor="middle"
            dominantBaseline="central"
            className="diagram-label"
          >
            {label}
          </text>
          <text
            x={x}
            y={y + 10}
            textAnchor="middle"
            dominantBaseline="central"
            className="diagram-node-sub"
          >
            {sublabel}
          </text>
        </>
      ) : (
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          className="diagram-label"
        >
          {label}
        </text>
      )}
    </g>
  );
}

function ArrowLabel({
  x,
  y,
  children,
  className,
}: {
  x: number;
  y: number;
  children: string;
  className?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      className={className ? `diagram-arrow-label ${className}` : "diagram-arrow-label"}
    >
      {children}
    </text>
  );
}

export function UiBypassDiagram({ className }: DiagramProps) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 520 320"
        role="img"
        aria-label="サイトUI経由の取引と、スマートコントラクトへの直接実行の比較"
        className="diagram-svg"
      >
        <title>UI経路と直接実行の比較</title>

        <text x={20} y={30} className="diagram-sublabel">
          UI経由（遅い）
        </text>

        {/* Slow path: User -> UI -> Contract */}
        <NodeBox x={70} y={90} width={104} label="User" sublabel="ウォレット署名" />
        <ArrowLabel x={145} y={80}>クリック</ArrowLabel>
        <path
          d="M 122 90 L 168 90"
          fill="none"
          stroke="#8a8a8a"
          strokeWidth="1"
          strokeDasharray="4 4"
          markerEnd="url(#arrowhead-ui-muted)"
          className="diagram-arrow-muted"
        />
        <NodeBox x={230} y={90} width={116} label="Site UI" sublabel="JSでtx組立" />
        <ArrowLabel x={312} y={80}>RPC送信</ArrowLabel>
        <path
          d="M 288 90 L 336 90"
          fill="none"
          stroke="#8a8a8a"
          strokeWidth="1"
          strokeDasharray="4 4"
          markerEnd="url(#arrowhead-ui-muted)"
          className="diagram-arrow-muted"
        />
        <NodeBox x={400} y={90} width={128} label="Contract" sublabel="オンチェーン実行" />

        <text x={20} y={180} className="diagram-sublabel">
          直接実行（速い）
        </text>

        {/* Fast path: Your Contract -> Contract */}
        <NodeBox x={170} y={240} width={160} label="Your Contract" sublabel="一括スワップ実行" />
        <ArrowLabel x={293} y={225} className="diagram-bypass-label">
          bypass UI
        </ArrowLabel>
        <path
          d="M 250 240 L 336 240"
          fill="none"
          stroke="#111"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead-ui)"
          className="diagram-arrow-flow diagram-arrow-fast"
        />
        <text
          x={293}
          y={256}
          textAnchor="middle"
          dominantBaseline="central"
          className="diagram-arrow-sublabel"
        >
          直接call
        </text>
        <NodeBox x={400} y={240} width={128} label="Contract" sublabel="オンチェーン実行" />

        <defs>
          <marker id="arrowhead-ui" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#111" />
          </marker>
          <marker id="arrowhead-ui-muted" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#8a8a8a" />
          </marker>
        </defs>
      </svg>
      <DiagramCaption>
        UI経由は「ユーザー操作 → JSでtx組立 → RPC送信」と何段も挟むのに対し、直接実行は自作コントラクトからオンチェーンへ一撃で届く
      </DiagramCaption>
    </figure>
  );
}
