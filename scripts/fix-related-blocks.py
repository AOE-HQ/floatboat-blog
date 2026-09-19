"""One-shot: convert 18 pure-text Related Reading blocks to real links;
normalize angle-bracket links inside 30 Related Reading blocks. See
links-blocks-inventory.json for the audit that produced these mappings."""
import re
from pathlib import Path

DEP = Path("content/blog")

M = {
 "best-ai-scheduling-assistant": [
  ("What Is an AI Scheduling Agent?", "ai-scheduling-agent"),
  ("What Is an Agentic Calendar?", "what-is-agentic-calendar"),
  ("Calendar-Driven AI vs Chat-Based AI", "calendar-driven-ai-vs-chat-ai")],
 "floatcup-world-cup-2026-calendar-subscribe": [
  ("How to Add World Cup 2026 to Google Calendar", "world-cup-2026-google-calendar-ics"),
  ("World Cup 2026 Schedule: Full Fixtures", "world-cup-2026-schedule"),
  ("World Cup 2026 Guide: Dates, Format, Hosts", "world-cup-2026-guide")],
 "where-is-world-cup-2026-host-cities": [
  ("World Cup 2026 Guide", "world-cup-2026-guide"),
  ("World Cup 2026 Schedule: Full Fixtures", "world-cup-2026-schedule"),
  ("USA World Cup 2026 Schedule", "world-cup-2026-schedule-usa")],
 "world-cup-2026-bracket": [
  ("World Cup 2026 Groups & Standings", "world-cup-2026-groups-standings"),
  ("World Cup 2026 Draw: Rules, Results", "world-cup-2026-draw"),
  ("World Cup 2026 Predictions & Bracket Picks", None),
  ("World Cup 2026 Bracketology How-To", "world-cup-2026-bracketology"),
  ("FloatCup: Subscribe to World Cup 2026 Calendar", "floatcup-world-cup-2026-calendar-subscribe")],
 "world-cup-2026-bracketology": [
  ("World Cup Bracket 2026: Template", "world-cup-2026-bracket"),
  ("World Cup 2026 Predictions & Bracket Picks", None),
  ("FloatCup: Subscribe to the World Cup 2026 Calendar", "floatcup-world-cup-2026-calendar-subscribe")],
 "world-cup-2026-groups-standings": [
  ("World Cup 2026 Draw: Rules, Results", "world-cup-2026-draw"),
  ("World Cup 2026 Bracket: Template", "world-cup-2026-bracket"),
  ("USA World Cup 2026 Group: Schedule", "world-cup-2026-schedule-usa"),
  ("World Cup 2026 Group of Death Explained", "world-cup-2026-bracketology"),
  ("USA World Cup 2026 Schedule", None)],
 "world-cup-2026-schedule-usa": [
  ("World Cup 2026 Schedule: Full Fixtures", "world-cup-2026-schedule"),
  ("World Cup 2026 Guide: Dates, Format, Hosts", "world-cup-2026-guide"),
  ("FloatCup: Subscribe to World Cup 2026 Calendar", "floatcup-world-cup-2026-calendar-subscribe")],
 "world-cup-2026-schedule": [
  ("World Cup 2026 Guide: Dates, Format", "world-cup-2026-guide"),
  ("How to Add World Cup 2026 to Google Calendar", "world-cup-2026-google-calendar-ics"),
  ("FloatCup: Subscribe to World Cup 2026 Calendar", "floatcup-world-cup-2026-calendar-subscribe")],
 "zh/ai-meeting-preparation": [
  ("AI 会议后续跟进自动化", "ai-follow-up-automation"),
  ("什么是 Agentic Calendar", "what-is-agentic-calendar"),
  ("日历驱动 AI vs 基于聊天的 AI", "calendar-driven-ai-vs-chat-ai")],
 "zh/best-ai-scheduling-assistant": [
  ("什么是 AI 日程 Agent", "ai-scheduling-agent"),
  ("什么是 Agentic Calendar", "what-is-agentic-calendar"),
  ("日历驱动的 AI vs 聊天式 AI", "calendar-driven-ai-vs-chat-ai")],
 "zh/calendar-driven-ai-vs-chat-ai": [
  ("什么是 Agentic Calendar", "what-is-agentic-calendar"),
  ("什么是 AI 日程 Agent", "ai-scheduling-agent"),
  ("AI 会前准备", "ai-meeting-preparation")],
 "zh/floatcup-world-cup-2026-calendar-subscribe": [
  ("如何把 2026 世界杯加入 Google Calendar", "world-cup-2026-google-calendar-ics"),
  ("2026 世界杯赛程", "world-cup-2026-schedule"),
  ("2026 世界杯指南", "world-cup-2026-guide")],
 "zh/where-is-world-cup-2026-host-cities": [
  ("World Cup 2026 指南", "world-cup-2026-guide"),
  ("2026 世界杯赛程", "world-cup-2026-schedule"),
  ("USA 2026 世界杯赛程", "world-cup-2026-schedule-usa")],
 "zh/world-cup-2026-bracket": [
  ("世界杯 2026 小组与积分榜", "world-cup-2026-groups-standings"),
  ("世界杯 2026 抽签", "world-cup-2026-draw"),
  ("世界杯 2026 预测与对阵选择", None),
  ("世界杯 2026 对阵分析", "world-cup-2026-bracketology"),
  ("FloatCup：一键订阅", "floatcup-world-cup-2026-calendar-subscribe")],
 "zh/world-cup-2026-bracketology": [
  ("World Cup Bracket 2026", "world-cup-2026-bracket"),
  ("World Cup 2026 预测与竞猜签表", None),
  ("FloatCup：一键订阅", "floatcup-world-cup-2026-calendar-subscribe")],
 "zh/world-cup-2026-groups-standings": [
  ("World Cup 2026 Draw: Rules", "world-cup-2026-draw"),
  ("World Cup 2026 Bracket: Template", "world-cup-2026-bracket"),
  ("USA World Cup 2026 Group: Schedule", "world-cup-2026-schedule-usa"),
  ("World Cup 2026 Group of Death Explained", "world-cup-2026-bracketology"),
  ("USA World Cup 2026 Schedule", None)],
 "zh/world-cup-2026-schedule-usa": [
  ("World Cup 2026 赛程", "world-cup-2026-schedule"),
  ("World Cup 2026 指南", "world-cup-2026-guide"),
  ("FloatCup：一键订阅", "floatcup-world-cup-2026-calendar-subscribe")],
 "zh/world-cup-2026-schedule": [
  ("World Cup 2026 指南", "world-cup-2026-guide"),
  ("如何把 World Cup 2026 加入 Google Calendar", "world-cup-2026-google-calendar-ics"),
  ("FloatCup：一键订阅", "floatcup-world-cup-2026-calendar-subscribe")],
}

PAT = re.compile(
 r'^##\s+((Related\s+(Reading|Posts|Articles?)|Further\s+Reading|See\s+(Also|More)|Read\s+(Next|More)|Recommended\s+(Reading|Posts)?|More\s+(from|reading|posts)|You\s+may\s+(also\s+)?(like|enjoy)|Keep\s+reading|Explore\s+(more|related)|Additional\s+(Resources?|Reading)|延伸阅读|相关阅读|相关文章|相关推荐|阅读更多|延伸內容)[^\n]*)$',
 re.I|re.M)

converted = dropped = 0
for rel, mapping in M.items():
    p = DEP / f"{rel}.md"
    t = p.read_text(encoding='utf-8')
    m = PAT.search(t)
    assert m, f"block not found in {rel}"
    block_start = m.end()
    nxt = re.search(r'^##\s+', t[block_start:], re.M)
    block_end = block_start + (nxt.start() if nxt else len(t[block_start:]))
    block = t[block_start:block_end]
    is_zh = rel.startswith("zh/")
    new_lines = []
    for line in block.strip().split('\n'):
        stripped = line.strip().lstrip('*-• ').strip()
        if not stripped:
            continue
        hit = None
        for prefix, slug in mapping:
            if stripped.startswith(prefix) or prefix in stripped[:60]:
                hit = slug
                break
        if hit is None and not any(p2 for p2, _ in mapping if p2 in stripped):
            new_lines.append(line)
            continue
        if hit is None:
            dropped += 1
            continue
        new_lines.append(f"- [{stripped}](/{'zh/' if is_zh else ''}blog/{hit})")
        converted += 1
    new_block = "\n".join(new_lines)
    t = t[:block_start] + new_block + t[block_end:]
    p.write_text(t, encoding='utf-8')
print(f"R-A: converted {converted} lines, dropped {dropped} phantom/dup lines")

ANG_FILES = ["ai-scheduling-agent","world-cup-2026-google-calendar-ics",
"zh/ai-assistant-for-personal-use-at-work","zh/ai-automation-agency-do-you-need-one","zh/ai-browser-agent-vs-ai-browser-vs-ai-workspace",
"zh/ai-scheduling-agent","zh/ai-tools-for-business-automation-2026","zh/best-calendar-app-solo-operators",
"zh/building-agentic-ai-systems-build-or-buy","zh/claude-code-non-developers-solo-operators","zh/claude-managed-agents-one-person-company",
"zh/dynamic-workflows-build-or-use-workspace","zh/first-100-customers-solo-founder","zh/genspark-vs-manus","zh/google-calendar-vs-outlook",
"zh/gpt-image-2-manga-comic-workflow","zh/gpt-image-2-storyboard-solo","zh/how-to-build-an-ai-agent","zh/lindy-vs-gumloop",
"zh/llm-knowledge-base-solo-operators","zh/manus-ai-alternatives-2026","zh/openai-4-day-work-week-one-person-company",
"zh/openai-gpt-6-one-person-company","zh/what-is-vibe-coding","zh/why-ai-forgets-between-sessions","zh/workspace-agents-vs-chat-assistants",
"zh/world-cup-2026-google-calendar-ics"]
normalized = 0
for rel in ANG_FILES:
    p = DEP / f"{rel}.md"
    t = p.read_text(encoding='utf-8')
    m = PAT.search(t)
    assert m, f"block not found in {rel}"
    block_start = m.end()
    nxt = re.search(r'^##\s+', t[block_start:], re.M)
    block_end = block_start + (nxt.start() if nxt else len(t[block_start:]))
    block = t[block_start:block_end]
    nb = re.sub(r'\]\(<(/(?:zh/)?blog/[a-z0-9-]+)>\)', r'](\1)', block)
    normalized += len(re.findall(r'\]\(<', block))
    if nb != block:
        t = t[:block_start] + nb + t[block_end:]
        p.write_text(t, encoding='utf-8')
print(f"R-B: normalized {normalized} angle-bracket links in {len(ANG_FILES)} blocks")
