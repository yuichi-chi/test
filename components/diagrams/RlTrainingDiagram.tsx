type DiagramProps = {
  className?: string;
};

function DiagramCaption({ children }: { children: string }) {
  return <p className="diagram-caption">{children}</p>;
}

export function RlTrainingDiagram({ className }: DiagramProps) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 520 200"
        className="diagram-svg"
        role="img"
        aria-label="強化学習ループ: 環境、エージェント、報酬"
      >
        <defs>
          <marker id="rl-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" className="diagram-arrow-head" />
          </marker>
        </defs>

        <rect x="24" y="64" width="120" height="72" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="diagram-box" />
        <text x="84" y="96" textAnchor="middle" className="diagram-label">Environment</text>
        <text x="84" y="116" textAnchor="middle" className="diagram-sublabel">状態・行動・遷移</text>

        <rect x="200" y="64" width="120" height="72" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="diagram-box" />
        <text x="260" y="96" textAnchor="middle" className="diagram-label">PPO Agent</text>
        <text x="260" y="116" textAnchor="middle" className="diagram-sublabel">方策の更新</text>

        <rect x="376" y="64" width="120" height="72" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="diagram-box" />
        <text x="436" y="96" textAnchor="middle" className="diagram-label">Reward</text>
        <text x="436" y="116" textAnchor="middle" className="diagram-sublabel">誤差・成功率</text>

        <line x1="144" y1="100" x2="196" y2="100" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#rl-arrow)" className="diagram-line" />
        <text x="170" y="88" textAnchor="middle" className="diagram-arrow-sublabel">state</text>

        <line x1="320" y1="100" x2="372" y2="100" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#rl-arrow)" className="diagram-line" />
        <text x="346" y="88" textAnchor="middle" className="diagram-arrow-sublabel">action</text>

        <path
          d="M436 136 C436 168, 84 168, 84 136"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          markerEnd="url(#rl-arrow)"
          className="diagram-arrow-flow diagram-arrow-slow"
        />
        <text x="260" y="182" textAnchor="middle" className="diagram-arrow-sublabel">reward signal → policy update</text>
      </svg>
      <DiagramCaption>環境・エージェント・報酬の3点ループで最適方策を学習</DiagramCaption>
    </figure>
  );
}
