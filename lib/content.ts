export type DiagramId = "token-triangle" | "ui-bypass" | "direct-execution";

export type ProjectDetail = {
  lead: string;
  meta: { label: string; value: string }[];
  highlights: string[];
  sections: { title: string; body: string[]; diagram?: DiagramId }[];
  process: { title: string; description: string }[];
  stack: string[];
  reflection: string;
};

export type Project = {
  id: string;
  slug?: string;
  title: string;
  category: string;
  story: string[];
  detail?: ProjectDetail;
};

export const siteConfig = {
  hero: {
    lines: ["好きなことに、", "誰よりも夢中になる。"],
    byline: "yuichi kumano / Portfolio",
    statement:
      "私は、自分が「面白い」「知りたい」と思ったことに対して、限界を決めずにトコトン没頭できる人間です。誰かに指示されたからではなく、自分自身の「なぜ？」「もっとこうしたい！」という好奇心に突き動かされて動きます。器用に立ち回るよりも、これだと決めた対象に寝食を忘れて誰よりも深い熱量を注ぎ込み、形にすることに価値を感じています。",
  },
  projects: [
    {
      id: "01",
      slug: "arbitrage-bot",
      title: "アービトラージボット開発",
      category: "Solidity / Ethereum / Sui / リバースエンジニアリング",
      story: [
        "3つのトークンが相互に価値を与え合う仕組みに出会った。サイトのUIでは建値建ての取引ができるとされていたが、ブロックチェーンの本質はトランザクションの直接実行にある。UIのボタンを押さなくても、オンチェーンに直接送れば取引は成立する——その事実に気づいたとき、仕組みの全体像が見え始めました。",
        "3つのトークン間の価格歪みが大きくなった瞬間を狙い、自分でSolidityを書いてトランザクションを直接実行する。UIを介さない分、反応は速い。歪みが生まれるたびに、自分のコントラクトから一気に取引を流し込めるようになりました。",
        "通信速度（インフラ）は専門外と割り切り対策はしていませんが、その分、ガス代上限設定やスリッページ対策といった「損失を防ぐための防御ロジック」をコントラクト側にガチガチに組み込むことに熱量を注ぎました。",
      ],
      detail: {
        lead: "3つのトークンが相互に価値を与え合う仕組み。UIを迂回し、Solidityで直接トランザクションを叩いて歪みを取る。",
        meta: [
          { label: "領域", value: "DeFi / トークンアービトラージ" },
          { label: "仕組み", value: "3トークン相互価値モデル" },
          { label: "役割", value: "Solidity実装・直接トランザクション実行" },
        ],
        highlights: [
          "3つのトークンが相互に価値を与え合うプロトコルの仕組みを理解し、価格歪みの発生条件を把握",
          "サイトUIの建値建て取引を分析し、ボタン操作なしでオンチェーンから直接実行できる経路を確立",
          "歪みが拡大したタイミングで、自前のSolidityコントラクトからトランザクションを直接送信し高速に取引",
          "ガス上限・スリッページ対策など、損失を防ぐ防御ロジックをコントラクト側に徹底実装",
        ],
        sections: [
          {
            title: "Mechanism",
            diagram: "token-triangle",
            body: [
              "対象のプロトコルには、3つのトークンが相互に価値を与え合う仕組みがありました。それぞれのトークンが循環的に関係し、バランスが崩れた瞬間に価格の歪み——アービトラージの機会——が生まれます。",
              "サイトのUIでは、この3トークンを建値建てで取引できると案内されていました。多くのユーザーはそのUIのボタンを押して取引します。しかし、ブロックチェーンの取引は本質的にトランザクションの送信であり、UIはあくまでその入り口のひとつに過ぎません。",
            ],
          },
          {
            title: "UIを迂回する",
            diagram: "ui-bypass",
            body: [
              "UIのボタンを押すと、裏側ではスマートコントラクトへのトランザクションが発行されています。つまり、同じコントラクトに直接トランザクションを送れば、UIを経由せずに同じ——いや、それ以上に速い——取引が可能です。",
              "フロントエンドの操作を待つ必要がなく、自分でコールデータを組み立ててオンチェーンに投げられる。UI利用者が画面を操作している間に、すでに取引を完了させられる——これがブロックチェーン直接実行の強みでした。",
            ],
          },
          {
            title: "Solidityで直接実行",
            diagram: "direct-execution",
            body: [
              "3つのトークン間の歪みが大きくなったタイミングを捉えるため、自分でSolidityを書き、トランザクションを直接実行する仕組みを構築しました。",
              "歪みが発生したら、自前のコントラクトから一連のスワップを一気に流し込む。UIを介さない分、反応速度で他の参加者に先を越せます。速度競争の世界でインフラには投資しませんでしたが、「UIの外側から直接叩く」という設計で十分に勝負できました。",
            ],
          },
          {
            title: "Defense Logic",
            body: [
              "高速で取引できるからこそ、失敗のコストも大きい。ガス代の上限設定、スリッページ許容値の厳格な管理、想定外の状態遷移へのガード処理——損失を防ぐ防御ロジックをコントラクト側に入れ込みました。",
              "「儲かるか」より先に「損しないか」。歪みを取りに行く攻めの設計と、失敗を許さない守りの設計を、同じコントラクトの中で両立させました。",
            ],
          },
        ],
        process: [
          {
            title: "3トークン相互価値の理解",
            description: "3つのトークンがどう価値を与え合い、歪みがどの条件で生まれるかをプロトコルレベルで把握する。",
          },
          {
            title: "UI取引の裏側を分析",
            description: "サイトUIの建値建て取引が、どのコントラクト・関数を呼んでいるかを突き止め、直接実行の経路を特定する。",
          },
          {
            title: "Solidityで実行ロジックを実装",
            description: "歪み発生時に一連のスワップを直接流し込むコントラクトを自前で書き、防御ロジックも同時に組み込む。",
          },
          {
            title: "歪み検知と実運用",
            description: "3トークン間の価格歪みを監視し、閾値を超えた瞬間にトランザクションを直接送信して取引を完了させる。",
          },
        ],
        stack: [
          "Solidity",
          "Ethereum",
          "Sui",
          "Web3.js / ethers.js",
          "スマートコントラクト直接実行",
          "トークンアービトラージ",
        ],
        reflection:
          "UIは取引の入り口に見えて、本質はトランザクションの送信だった。3つのトークンが織りなす歪みを、自分の手で書いたSolidityから直接叩けるようになったとき、ブロックチェーンの構造そのものを使いこなせている実感がありました。",
      },
    },
    {
      id: "02",
      title: "既存コードの内部ロジック解析",
      category: "Java / コードリーディング / 仕様解析",
      story: [
        "巨大なブラックボックスに挑んだ。大規模なゲームフレームワーク（Minecraft）などの既存コードベースを読み解き、ドキュメントのない環境の中で「内部の計算がどう行われているのか」をデバッグとソース解読によって徹底的に分析。",
        "システムの裏側を自分の手で解き明かす楽しさに魅了され、内部仕様をハックするパッチやMODの開発を行いました。",
      ],
    },
  ],
  about: {
    paragraphs: [
      "「オタクとしての知識自慢」をしたいわけではありません。",
      "自分が「これだ」と決めた領域に対して、圧倒的な最大風速の熱量を持って取り組み、限界を超えていくその【没頭するプロセス】こそが、私の最大の強みであり、エンジンです。",
    ],
  },
  contact: {
    github: {
      label: "GitHub",
      url: "https://github.com/your-username",
    },
    email: {
      label: "Mail",
      address: "your.email@example.com",
    },
    sns: {
      label: "TW",
      url: "https://x.com/your-handle",
    },
  },
  metadata: {
    title: "好きなことに、誰よりも夢中になる。",
    description:
      "好奇心と没頭力をエンジンに、好きなことに限界なく熱量を注ぐエンジニアのポートフォリオ。",
  },
};

export function getProjectBySlug(slug: string): Project | undefined {
  return siteConfig.projects.find((project) => project.slug === slug);
}

export function getProjectHref(project: Project) {
  return project.slug ? `/works/${project.slug}` : `#work-${project.id}`;
}
