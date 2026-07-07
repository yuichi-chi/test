export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** 0 = 画面下端に入り始め、1 = 十分表示された */
export function getRevealProgress(rect: DOMRect, viewportHeight: number) {
  const start = viewportHeight * 0.95;
  const end = viewportHeight * 0.5;
  return clamp((start - rect.top) / (start - end), 0, 1);
}

/** ヒーローのスクロールアウト用 0〜1 */
export function getHeroFadeProgress(scrollY: number, distance = 420) {
  return clamp(scrollY / distance, 0, 1);
}
