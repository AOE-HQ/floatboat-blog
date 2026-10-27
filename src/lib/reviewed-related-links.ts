/** Preserve curated links while removing withdrawn pages and repairing live navigation. */
export function reviewedRelatedLinks(links: Record<string, string[]>, liveIds: string[], registeredIds: string[]) {
  const live = new Set(liveIds);
  const registered = new Set(registeredIds);
  const count = Math.min(4, Math.max(0, liveIds.length - 1));
  const result: Record<string, string[]> = {};

  for (const source of Object.keys(links)) {
    if (!registered.has(source)) throw new Error(`Unknown related source: ${source}`);
  }
  for (const source of liveIds) {
    const original = links[source];
    if (!original) throw new Error(`Missing related links for live page: ${source}`);
    if (original.length !== 4 || new Set(original).size !== original.length || original.some((target) => target === source || !registered.has(target))) {
      throw new Error(`Invalid related links for ${source}`);
    }
    const targets = original.filter((target) => live.has(target)).slice(0, count);
    for (const target of liveIds) {
      if (targets.length === count) break;
      if (target !== source && !targets.includes(target)) targets.push(target);
    }
    result[source] = targets;
  }

  const incoming = new Map(liveIds.map((id) => [id, 0]));
  for (const targets of Object.values(result)) {
    for (const target of targets) incoming.set(target, incoming.get(target)! + 1);
  }
  // With fewer than five pages every other page is already linked automatically.
  if (liveIds.length > 4) {
    for (const target of liveIds) {
      if (incoming.get(target)) continue;
      for (const [source, targets] of Object.entries(result)) {
        if (source === target || targets.includes(target)) continue;
        const index = targets.findLastIndex((id) => incoming.get(id)! > 1);
        if (index < 0) continue;
        const previous = targets[index];
        targets[index] = target;
        incoming.set(previous, incoming.get(previous)! - 1);
        incoming.set(target, 1);
        break;
      }
    }
  }
  return result;
}
