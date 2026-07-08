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
  width,
  children,
}: {
  x: number;
  y: number;
  width: number;
  children: string;
}) {
  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - 9}
        width={width}
        height={18}
        rx="3"
        fill="var(--bg)"
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className="diagram-arrow-label"
      >
        {children}
      </text>
    </g>
  );
}

export function NftMintFlowDiagram({ className }: DiagramProps) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 540 340"
        role="img"
        aria-label="ユーザーがMetaMaskとフロントを経由してERC-721コントラクトからNFTをミントし、IPFSメタデータを参照する流れ"
        className="diagram-svg"
      >
        <title>NFTミントフロー</title>

        {/* Top row nodes */}
        <NodeBox x={70} y={80} width={90} label="User" sublabel="Wallet接続" />
        <NodeBox x={230} y={80} width={120} label="MetaMask" sublabel="tx署名" />
        <NodeBox x={420} y={80} width={140} label="Next.js" sublabel="wagmi / ethers" />

        {/* Bottom row nodes */}
        <NodeBox x={250} y={240} width={170} label="ERC-721" sublabel="on Sepolia" />
        <NodeBox x={440} y={240} width={140} label="Pinata / IPFS" sublabel="metadata JSON" />

        {/* User -> MetaMask */}
        <path
          d="M 115 80 L 170 80"
          fill="none"
          stroke="#111"
          strokeWidth="1"
          markerEnd="url(#arrowhead-nft)"
          className="diagram-arrow-flow diagram-arrow-slow"
        />
        <ArrowLabel x={143} y={70} width={54}>Connect</ArrowLabel>

        {/* MetaMask -> Next.js */}
        <path
          d="M 290 80 L 350 80"
          fill="none"
          stroke="#111"
          strokeWidth="1"
          markerEnd="url(#arrowhead-nft)"
          className="diagram-arrow-flow diagram-arrow-slow"
          style={{ animationDelay: "0.6s" }}
        />
        <ArrowLabel x={320} y={70} width={50}>sign tx</ArrowLabel>

        {/* Next.js -> ERC-721 (diagonal) */}
        <path
          d="M 420 108 L 335 212"
          fill="none"
          stroke="#111"
          strokeWidth="1"
          markerEnd="url(#arrowhead-nft)"
          className="diagram-arrow-flow diagram-arrow-slow"
          style={{ animationDelay: "1.2s" }}
        />
        <ArrowLabel x={410} y={155} width={54}>mint()</ArrowLabel>

        {/* ERC-721 -> IPFS */}
        <path
          d="M 335 240 L 370 240"
          fill="none"
          stroke="#111"
          strokeWidth="1"
          markerEnd="url(#arrowhead-nft)"
          className="diagram-arrow-flow diagram-arrow-slow"
          style={{ animationDelay: "1.8s" }}
        />
        <ArrowLabel x={352} y={228} width={54}>tokenURI</ArrowLabel>

        {/* ERC-721 -> User (Transfer event return, dashed curve on the left) */}
        <path
          d="M 165 212 Q 20 160 45 108"
          fill="none"
          stroke="#8a8a8a"
          strokeWidth="1"
          strokeDasharray="4 4"
          markerEnd="url(#arrowhead-nft-muted)"
          className="diagram-arrow-muted"
        />
        <ArrowLabel x={60} y={160} width={94}>Transfer event</ArrowLabel>

        <defs>
          <marker id="arrowhead-nft" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#111" />
          </marker>
          <marker id="arrowhead-nft-muted" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#8a8a8a" />
          </marker>
        </defs>
      </svg>
      <DiagramCaption>
        ユーザーは MetaMask を接続し Next.js から mint() を叩くだけで、Sepolia 上のコントラクトが NFT を発行し、tokenURI で IPFS のメタデータを参照する
      </DiagramCaption>
    </figure>
  );
}
