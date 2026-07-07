type DiagramProps = {
  className?: string;
};

function DiagramCaption({ children }: { children: string }) {
  return <p className="diagram-caption">{children}</p>;
}

export function TokenTriangleDiagram({ className }: DiagramProps) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 400 320"
        role="img"
        aria-label="3つのトークンが相互に価値を与え合い、中央で価格歪みが生まれる循環モデル"
        className="diagram-svg"
      >
        <title>3トークン相互価値モデル</title>

        {/* Token A - top */}
        <circle cx="200" cy="60" r="36" fill="var(--bg)" stroke="#111" strokeWidth="1" />
        <text x="200" y="55" textAnchor="middle" className="diagram-label">
          Token A
        </text>
        <text x="200" y="72" textAnchor="middle" className="diagram-sublabel">
          建値
        </text>

        {/* Token B - bottom left */}
        <circle cx="80" cy="240" r="36" fill="var(--bg)" stroke="#111" strokeWidth="1" />
        <text x="80" y="235" textAnchor="middle" className="diagram-label">
          Token B
        </text>
        <text x="80" y="252" textAnchor="middle" className="diagram-sublabel">
          建値
        </text>

        {/* Token C - bottom right */}
        <circle cx="320" cy="240" r="36" fill="var(--bg)" stroke="#111" strokeWidth="1" />
        <text x="320" y="235" textAnchor="middle" className="diagram-label">
          Token C
        </text>
        <text x="320" y="252" textAnchor="middle" className="diagram-sublabel">
          建値
        </text>

        {/* Arrows A -> B */}
        <path
          d="M 178 88 Q 100 140 95 205"
          fill="none"
          stroke="#111"
          strokeWidth="1"
          markerEnd="url(#arrowhead-triangle)"
          className="diagram-arrow-flow diagram-arrow-slow"
        />
        {/* B -> C */}
        <path
          d="M 116 240 L 284 240"
          fill="none"
          stroke="#111"
          strokeWidth="1"
          markerEnd="url(#arrowhead-triangle)"
          className="diagram-arrow-flow diagram-arrow-slow"
          style={{ animationDelay: "0.8s" }}
        />
        {/* C -> A */}
        <path
          d="M 305 205 Q 300 140 222 88"
          fill="none"
          stroke="#111"
          strokeWidth="1"
          markerEnd="url(#arrowhead-triangle)"
          className="diagram-arrow-flow diagram-arrow-slow"
          style={{ animationDelay: "1.6s" }}
        />

        {/* Center distortion */}
        <circle cx="200" cy="175" r="28" fill="none" stroke="#111" strokeWidth="1" strokeDasharray="4 4" className="diagram-distortion" />
        <circle cx="200" cy="175" r="6" fill="#111" className="diagram-pulse" />
        <text x="200" y="220" textAnchor="middle" className="diagram-sublabel">
          価格歪み
        </text>

        <defs>
          <marker id="arrowhead-triangle" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#111" />
          </marker>
        </defs>
      </svg>
      <DiagramCaption>3トークンが循環的に価値を与え合い、バランスが崩れた瞬間に歪みが生まれる</DiagramCaption>
    </figure>
  );
}
