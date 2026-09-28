import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  Copy,
  RefreshCw,
  Send,
  Users,
  Store,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import logoUrl from "@/assets/sailpilot-logo.svg";
import { USERS, INDUSTRIES, TEMPLATES, type MakerUser, type Industry } from "@/lib/messageData";

export const Route = createFileRoute("/")({
  component: Index,
});

/** Splits a template into plain text and {variable} tokens for live highlighting. */
function renderTemplate(template: string, user: MakerUser, industry: Industry) {
  const values: Record<string, string> = {
    user: user.name,
    shop: user.shop,
    industry: industry.label,
  };
  return template.split(/(\{\w+\})/g).map((part, i) => {
    const match = part.match(/^\{(\w+)\}$/);
    if (match) {
      return (
        <mark
          key={i}
          className="rounded-sm bg-highlight px-1 font-semibold text-highlight-foreground"
        >
          {values[match[1]!] ?? part}
        </mark>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function Index() {
  const [userId, setUserId] = useState(USERS[0]!.id);
  const [industryId, setIndustryId] = useState(INDUSTRIES[0]!.id);
  const [templateIndex, setTemplateIndex] = useState(0);
  const [template, setTemplate] = useState(TEMPLATES[0]!);
  const [copied, setCopied] = useState(false);

  const user = USERS.find((u) => u.id === userId) ?? USERS[0]!;
  const industry = INDUSTRIES.find((i) => i.id === industryId) ?? INDUSTRIES[0]!;

  // The preview re-renders on every keystroke and dropdown change — real time.
  const rendered = useMemo(() => renderTemplate(template, user, industry), [template, user, industry]);
  const outputLength = useMemo(() => {
    const text = template
      .replace(/\{user\}/g, user.name)
      .replace(/\{shop\}/g, user.shop)
      .replace(/\{industry\}/g, industry.label);
    return text.length;
  }, [template, user, industry]);

  const handleGenerate = () => {
    const next = (templateIndex + 1) % TEMPLATES.length;
    setTemplateIndex(next);
    setTemplate(TEMPLATES[next]!);
  };

  const handleCopy = async () => {
    const text = template
      .replace(/\{user\}/g, user.name)
      .replace(/\{shop\}/g, user.shop)
      .replace(/\{industry\}/g, industry.label);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — silently ignore.
    }
  };

  return (
    <div className="page-glow min-h-screen">
      {/* Header */}
      <header className="border-b border-border/70 bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="SailPilot" className="h-9 w-auto" />
            <div className="leading-tight">
              <p className="text-lg font-bold tracking-tight text-foreground">
                Sail<span className="text-primary">Pilot</span>
              </p>
              <p className="text-xs text-muted-foreground">মাত্র এক মিনিটেই ইকমার্স</p>
            </div>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground sm:inline-flex">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            রিয়েল টাইম মেসেজ মেকার
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8 lg:max-h-none">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:h-[calc(100dvh-9.5rem)] xl:gap-8">
          {/* Left: controls + editor */}
          <section className="card-lift flex flex-col gap-5 rounded-3xl border border-border/60 bg-card p-5 sm:p-7">
            <div>
              <h1 className="text-xl font-bold text-foreground">মেসেজ তৈরি করুন</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                ব্যবহারকারী ও ইন্ডাস্ট্রি বেছে নিন — ডান পাশে মেসেজ সাথে সাথে বদলে যাবে।
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Users className="h-4 w-4 text-primary" />
                  ব্যবহারকারী
                </span>
                <div className="relative">
                  <select
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-input bg-background px-3.5 py-2.5 pr-9 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25"
                  >
                    {USERS.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} — {u.shop}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Store className="h-4 w-4 text-primary" />
                  ইন্ডাস্ট্রি
                </span>
                <div className="relative">
                  <select
                    value={industryId}
                    onChange={(e) => setIndustryId(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-input bg-background px-3.5 py-2.5 pr-9 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25"
                  >
                    {INDUSTRIES.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </label>
            </div>

            <button
              onClick={handleGenerate}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/35 active:scale-[0.98]"
            >
              <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
              নতুন মেসেজ তৈরি করুন
            </button>

            <div className="flex flex-1 flex-col">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <MessageSquareText className="h-4 w-4 text-primary" />
                  মেসেজ এডিটর
                </span>
                <span className="text-xs text-muted-foreground">
                  <code className="rounded bg-secondary px-1.5 py-0.5 text-[11px] text-secondary-foreground">
                    {"{user} {shop} {industry}"}
                  </code>
                </span>
              </div>
              <textarea
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                spellCheck={false}
                className="min-h-56 flex-1 resize-y rounded-xl border border-input bg-background px-4 py-3 text-[15px] leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                আউটপুট: {outputLength} অক্ষর
              </p>
            </div>
          </section>

          {/* Right: live message preview */}
          <section className="card-lift flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card">
            <div className="flex items-center justify-between border-b border-border/60 bg-secondary/50 px-5 py-3.5 sm:px-7">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                <h2 className="text-sm font-semibold text-foreground">লাইভ প্রিভিউ</h2>
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary active:scale-[0.97]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-primary" />
                    কপি হয়েছে
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    কপি
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-4 bg-background/60 p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-base font-bold text-primary">
                  {user.name.charAt(0)}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.shop}</p>
                </div>
                <span className="ml-auto rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
                  {industry.label}
                </span>
              </div>

              <div className="relative max-w-md self-start rounded-2xl rounded-tl-md border border-border/60 bg-card p-4 text-[15px] leading-relaxed text-foreground shadow-sm">
                {rendered}
                <div className="mt-2 flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
                  <span>এখন</span>
                  <Send className="h-3 w-3 text-primary" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
