import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Check, Copy, RefreshCw, Send, Users, Store, MessageSquareText, Sparkles, Package as PackageIcon, Languages, Moon, Sun,
} from "lucide-react";
import logoUrl from "@/assets/sailpilot-logo.svg";
import {
  USERS, INDUSTRIES, PACKAGES, TEMPLATES, KEYWORDS, type Lang,
} from "@/lib/messageData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SailPilot — রিয়েল টাইম মেসেজ মেকার" },
      { name: "description", content: "Create Bangla and English SailPilot messages in real time." },
      { property: "og:title", content: "SailPilot Message Maker" },
      { property: "og:description", content: "Bangla & English real-time message maker for SailPilot." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const LANGS: { id: Lang; label: string }[] = [
  { id: "bn", label: "বাংলা" },
  { id: "en", label: "English" },
];

function substitute(t: string, values: Record<string, string>) {
  return t.replace(/\{(\w+)\}/g, (m, k: string) => values[k] ?? m);
}

function renderTemplate(template: string, values: Record<string, string>) {
  return template.split(/(\{\w+\})/g).map((part, i) => {
    const match = part.match(/^\{(\w+)\}$/);
    if (match && values[match[1]!] !== undefined) {
      return (
        <mark key={i} className="rounded-sm bg-highlight px-1 font-semibold text-highlight-foreground">
          {values[match[1]!]}
        </mark>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function Tabs({ value, onChange }: { value: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="inline-flex rounded-lg bg-secondary p-1">
      {LANGS.map((l) => (
        <button
          key={l.id}
          onClick={() => onChange(l.id)}
          className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
            value === l.id ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

const selectCls =
  "w-full appearance-none rounded-xl border border-input bg-background px-3.5 py-2.5 pr-9 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25";

function Chevron() {
  return (
    <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Index() {
  const [userId, setUserId] = useState(USERS[0]!.id);
  const [industryId, setIndustryId] = useState(INDUSTRIES[0]!.id);
  const [packageId, setPackageId] = useState(PACKAGES[0]!.id);
  const [templateIndex, setTemplateIndex] = useState(0);
  const [templates, setTemplates] = useState(TEMPLATES[0]!);
  const [editorLang, setEditorLang] = useState<Lang>("bn");
  const [previewLang, setPreviewLang] = useState<Lang>("bn");
  const [copied, setCopied] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(localStorage.getItem("theme") === "dark");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const user = USERS.find((u) => u.id === userId) ?? USERS[0]!;
  const industry = INDUSTRIES.find((i) => i.id === industryId) ?? INDUSTRIES[0]!;
  const pkg = PACKAGES.find((p) => p.id === packageId) ?? PACKAGES[0]!;

  const values = useMemo(
    () => ({
      user: user.name[previewLang],
      shop: user.shop[previewLang],
      industry: industry.label[previewLang],
      package: pkg.name[previewLang],
      price: pkg.price[previewLang],
      phone: user.phone,
      email: user.email,
    }),
    [user, industry, pkg, previewLang],
  );

  const previewTemplate = templates[previewLang];
  const rendered = useMemo(() => renderTemplate(previewTemplate, values), [previewTemplate, values]);
  const outputText = substitute(previewTemplate, values);

  const switchBoth = () => {
    const next: Lang = editorLang === "bn" && previewLang === "bn" ? "en" : editorLang === "en" && previewLang === "en" ? "bn" : "bn";
    setEditorLang(next);
    setPreviewLang(next);
  };

  const handleGenerate = () => {
    const next = (templateIndex + 1) % TEMPLATES.length;
    setTemplateIndex(next);
    setTemplates(TEMPLATES[next]!);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  const bothLang = editorLang === previewLang ? editorLang : null;

  return (
    <div className="page-glow min-h-screen">
      <header className="border-b border-border/70 bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="SailPilot" className="h-9 w-auto" />
            <div className="leading-tight">
              <p className="text-lg font-bold tracking-tight text-foreground">
                Sail<span className="text-primary">Pilot</span>
              </p>
              <p className="text-xs text-muted-foreground">মাত্র এক মিনিটেই ইকমার্স</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground md:inline-flex">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              রিয়েল টাইম মেসেজ মেকার
            </span>
            <button
              onClick={switchBoth}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              title="Switch both tabs"
            >
              <Languages className="h-4 w-4 text-primary" />
              {bothLang === "bn" ? "বাংলা → English" : bothLang === "en" ? "English → বাংলা" : "Sync: বাংলা"}
            </button>
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-2 xl:gap-8">
          <section className="card-lift flex flex-col gap-5 rounded-3xl border border-border/60 bg-card p-5 sm:p-7">
            <div>
              <h1 className="text-xl font-bold text-foreground">মেসেজ তৈরি করুন</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                ব্যবহারকারী, ইন্ডাস্ট্রি ও প্যাকেজ বেছে নিন — ডান পাশে মেসেজ সাথে সাথে বদলে যাবে।
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Users className="h-4 w-4 text-primary" /> ব্যবহারকারী
                </span>
                <div className="relative">
                  <select value={userId} onChange={(e) => setUserId(e.target.value)} className={selectCls}>
                    {USERS.map((u) => (
                      <option key={u.id} value={u.id}>{u.name.bn} — {u.shop.bn}</option>
                    ))}
                  </select>
                  <Chevron />
                </div>
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Store className="h-4 w-4 text-primary" /> ইন্ডাস্ট্রি
                </span>
                <div className="relative">
                  <select value={industryId} onChange={(e) => setIndustryId(e.target.value)} className={selectCls}>
                    {INDUSTRIES.map((i) => (
                      <option key={i.id} value={i.id}>{i.label.bn}</option>
                    ))}
                  </select>
                  <Chevron />
                </div>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <PackageIcon className="h-4 w-4 text-primary" /> প্যাকেজ ও মূল্য
                </span>
                <div className="relative">
                  <select value={packageId} onChange={(e) => setPackageId(e.target.value)} className={selectCls}>
                    {PACKAGES.map((p) => (
                      <option key={p.id} value={p.id}>{p.name.bn} — {p.price.bn}</option>
                    ))}
                  </select>
                  <Chevron />
                </div>
              </label>
            </div>

            <button
              onClick={handleGenerate}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
              নতুন মেসেজ তৈরি করুন
            </button>

            <div className="flex flex-1 flex-col">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <MessageSquareText className="h-4 w-4 text-primary" /> মেসেজ এডিটর
                </span>
                <Tabs value={editorLang} onChange={setEditorLang} />
              </div>
              <textarea
                value={templates[editorLang]}
                onChange={(e) => setTemplates((t) => ({ ...t, [editorLang]: e.target.value }))}
                spellCheck={false}
                className="min-h-56 flex-1 resize-y rounded-xl border border-input bg-background px-4 py-3 text-[15px] leading-relaxed text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {KEYWORDS.map((k) => (
                  <code key={k} className="rounded bg-secondary px-1.5 py-0.5 text-[11px] text-secondary-foreground">
                    {`{${k}}`}
                  </code>
                ))}
              </div>
            </div>
          </section>

          <section className="card-lift flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 bg-secondary/50 px-5 py-3.5 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                <h2 className="text-sm font-semibold text-foreground">লাইভ প্রিভিউ</h2>
                <Tabs value={previewLang} onChange={setPreviewLang} />
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary active:scale-[0.97]"
              >
                {copied ? (<><Check className="h-3.5 w-3.5 text-primary" /> কপি হয়েছে</>) : (<><Copy className="h-3.5 w-3.5" /> কপি</>)}
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-4 bg-background/60 p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-base font-bold text-primary">
                  {values.user.charAt(0)}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-foreground">{values.user}</p>
                  <p className="text-xs text-muted-foreground">{values.phone} · {values.email}</p>
                </div>
                <span className="ml-auto rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
                  {values.package} · {values.price}
                </span>
              </div>

              <div className="relative max-w-md self-start whitespace-pre-line rounded-2xl rounded-tl-md border border-border/60 bg-card p-4 text-[15px] leading-relaxed text-foreground shadow-sm">
                {rendered}
                <div className="mt-2 flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
                  <span>{previewLang === "bn" ? "এখন" : "now"} · {outputText.length}</span>
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
