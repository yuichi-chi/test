import Link from "next/link";
import { Header } from "@/components/Header";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20 md:pt-40 md:pb-28">
        <PageShell>
          <p className="text-xs font-medium tracking-wide text-[var(--muted)]">404</p>
          <h1 className="display-md mt-4">ページが見つかりません</h1>
          <p className="body-text mt-6 max-w-xl">
            お探しの作品ページは存在しないか、URLが変更されています。
          </p>
          <Link href="/#works" className="hero-cta mt-10 inline-flex">
            Works に戻る
          </Link>
        </PageShell>
      </main>
    </>
  );
}
