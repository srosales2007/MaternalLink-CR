import type { ReactNode } from "react";
import {
  Priority,
  priorityTone,
  ReferralRecord,
  Screen,
  stepDefinitions,
} from "@/lib/maternalink";

type Option<T extends string> = { value: T; label: string };

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

// ─── Priority tone map — warm editorial on light ─────────────────────────────
const tone: Record<Priority, { dot: string; bg: string; border: string; text: string; label: string }> = {
  high: {
    label:  "High priority",
    dot:    "bg-[#c8382a]",
    bg:     "bg-[rgba(200,56,42,0.07)]",
    border: "border-[rgba(200,56,42,0.22)]",
    text:   "text-[#c8382a]",
  },
  medium: {
    label:  "Medium priority",
    dot:    "bg-[#b07030]",
    bg:     "bg-[rgba(176,112,48,0.07)]",
    border: "border-[rgba(176,112,48,0.22)]",
    text:   "text-[#8a5620]",
  },
  low: {
    label:  "Low priority",
    dot:    "bg-[#4a7a5a]",
    bg:     "bg-[rgba(74,122,90,0.07)]",
    border: "border-[rgba(74,122,90,0.22)]",
    text:   "text-[#3a6a4a]",
  },
};

// ─── App Header ──────────────────────────────────────────────────────────────

export function AppHeader({ screen, onGoHome }: { screen: Screen; onGoHome: () => void }) {
  return (
    <header className="mb-8 grid gap-3 lg:mb-10 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
      {/* Brand */}
      <button
        type="button"
        onClick={onGoHome}
        className="app-shell screen-reveal flex items-center gap-4 rounded-[20px] px-5 py-4 text-left"
      >
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] border border-[rgba(26,26,26,0.10)] bg-[var(--surface-warm)]">
          <span className="display-type text-[1rem] font-semibold tracking-tight text-[#1a1a1a]">ML</span>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="display-type text-[1.15rem] font-semibold tracking-tight text-[#1a1a1a]">
              MaternaLink CR
            </p>
            <span className="rounded-full border border-[var(--red-border)] bg-[var(--red-soft)] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-[var(--red)]">
              Costa Rica
            </span>
          </div>
          <p className="mt-0.5 text-[0.75rem] text-[var(--foreground-muted)]">
            Referral support · High-risk pregnancy · First-level care
          </p>
        </div>
      </button>

      {/* Step nav */}
      <nav className="app-shell screen-reveal rounded-[20px] px-4 py-3">
        <div className="flex flex-wrap gap-1.5">
          {stepDefinitions.map((step, i) => (
            <span
              key={step.id}
              className={cx(
                "rounded-full border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em]",
                step.id === screen
                  ? "border-[var(--red-border)] bg-[var(--red-soft)] text-[var(--red)]"
                  : "border-[var(--rule)] bg-transparent text-[var(--foreground-faint)]",
              )}
            >
              {i + 1}. {step.label}
            </span>
          ))}
        </div>
      </nav>
    </header>
  );
}

// ─── Card wrappers ────────────────────────────────────────────────────────────

export function SurfaceCard({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cx("surface-card screen-reveal", className)}>{children}</section>;
}

export function MutedCard({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cx("muted-card", className)}>{children}</section>;
}

// ─── Typography atoms ─────────────────────────────────────────────────────────

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--foreground-faint)]">
      {children}
    </p>
  );
}

export function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h2 className="display-type text-[1.85rem] font-semibold tracking-[-0.04em] text-[#1a1a1a] sm:text-[2.25rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-3xl text-[0.875rem] leading-7 text-[var(--foreground-muted)] sm:text-[0.9375rem]">
          {description}
        </p>
      )}
    </div>
  );
}

// ─── Form atoms ───────────────────────────────────────────────────────────────

export function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[0.8125rem] font-medium text-[var(--foreground-mid)]">{label}</span>
        {required && (
          <span className="rounded-full border border-[var(--red-border)] bg-[var(--red-soft)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--red)]">
            Required
          </span>
        )}
        {hint && (
          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--foreground-faint)]">
            {hint}
          </span>
        )}
      </div>
      {children}
    </label>
  );
}

export function ToggleCard({
  label,
  description,
  active,
  onClick,
}: {
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "rounded-[16px] border p-4 text-left transition-all duration-200",
        active
          ? "border-[var(--rule-strong)] bg-[var(--surface-white)] shadow-[var(--shadow-md)]"
          : "border-[var(--rule)] bg-[var(--surface-warm)] hover:border-[var(--rule-strong)] hover:bg-[var(--surface-white)]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.8125rem] font-semibold text-[#1a1a1a]">{label}</p>
          <p className="mt-1 text-[0.75rem] leading-5 text-[var(--foreground-muted)]">{description}</p>
        </div>
        <span
          className={cx(
            "mt-0.5 shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]",
            active
              ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
              : "border-[var(--rule-strong)] bg-transparent text-[var(--foreground-faint)]",
          )}
        >
          {active ? "Yes" : "No"}
        </span>
      </div>
    </button>
  );
}

export function HistoryToggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "rounded-[14px] border px-4 py-3.5 text-left transition-all duration-200",
        active
          ? "border-[var(--rule-strong)] bg-[var(--surface-white)] shadow-[var(--shadow-sm)]"
          : "border-[var(--rule)] bg-[var(--surface-warm)] hover:border-[var(--rule-strong)]",
      )}
    >
      <p className="text-[0.8125rem] font-medium text-[#1a1a1a]">{label}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--foreground-faint)]">
        {active ? "Included" : "Not included"}
      </p>
    </button>
  );
}

export function SegmentedField<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2.5 text-[0.8125rem] font-medium text-[var(--foreground-mid)]">{label}</p>
      <div className="grid gap-2 sm:grid-cols-4">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cx(
              "rounded-[12px] border px-4 py-2.5 text-[0.8125rem] font-medium transition-all duration-200",
              value === opt.value
                ? "border-[#1a1a1a] bg-[#1a1a1a] text-white shadow-[var(--shadow-sm)]"
                : "border-[var(--rule)] bg-[var(--surface-warm)] text-[var(--foreground-muted)] hover:border-[var(--rule-strong)] hover:bg-[var(--surface-white)]",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Priority badge ────────────────────────────────────────────────────────────

export function PriorityBadge({ priority }: { priority: Priority }) {
  const t = tone[priority];
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]",
        t.bg,
        t.border,
        t.text,
      )}
    >
      <span className={cx("h-2 w-2 rounded-full", t.dot)} />
      {t.label}
    </span>
  );
}

// ─── Summary row ──────────────────────────────────────────────────────────────

export function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[var(--rule-faint)] pb-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--foreground-faint)]">
        {label}
      </p>
      <p className="max-w-[60%] text-right text-[0.8125rem] leading-6 text-[#1a1a1a]">{value}</p>
    </div>
  );
}

// ─── Metric tile ──────────────────────────────────────────────────────────────

export function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <MutedCard className="rounded-[18px] p-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--foreground-faint)]">{label}</p>
      <p className="display-type mt-2.5 text-[2.2rem] font-semibold tracking-[-0.04em] text-[#1a1a1a]">
        {value}
      </p>
    </MutedCard>
  );
}

// ─── Scenario card ────────────────────────────────────────────────────────────

export function ScenarioCard({
  marker,
  title,
  body,
}: {
  marker: string;
  title: string;
  body: string;
}) {
  return (
    <article className="h-full bg-[var(--surface-white)] px-5 py-6 sm:px-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--red-border)] bg-[var(--red-soft)] text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--red)]">
        {marker}
      </div>
      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--foreground-faint)]">
        Referral pattern
      </p>
      <p className="display-type mt-2.5 max-w-[15rem] text-[1.6rem] font-semibold leading-[1.06] tracking-[-0.04em] text-[#1a1a1a]">
        {title}
      </p>
      <p className="mt-3.5 max-w-[22rem] text-[0.875rem] leading-7 text-[var(--foreground-muted)]">
        {body}
      </p>
    </article>
  );
}

// ─── Info card ────────────────────────────────────────────────────────────────

export function InfoCard({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <MutedCard className="rounded-[22px] p-5">
      <Eyebrow>{eyebrow}</Eyebrow>
      <p className="display-type mt-2.5 text-[1.25rem] font-semibold tracking-[-0.03em] text-[#1a1a1a]">
        {title}
      </p>
      <p className="mt-2 text-[0.8125rem] leading-6 text-[var(--foreground-muted)]">{body}</p>
    </MutedCard>
  );
}

// ─── History row ──────────────────────────────────────────────────────────────

export function HistoryRow({ record }: { record: ReferralRecord }) {
  return (
    <MutedCard className="rounded-[22px] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="display-type text-[1rem] font-semibold tracking-[-0.02em] text-[#1a1a1a]">
              {record.id}
            </p>
            <PriorityBadge priority={record.priority} />
          </div>
          <p className="mt-1.5 text-[0.8125rem] text-[#1a1a1a]">
            {record.patientLabel} / {record.gestationalAge} weeks
          </p>
          <p className="mt-1 text-[0.8125rem] leading-5 text-[var(--foreground-muted)]">
            {record.reason}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--foreground-faint)]">
            {record.createdAt}
          </p>
          <p className="mt-1.5 max-w-[12rem] text-[0.75rem] leading-5 text-[var(--foreground-muted)]">
            {record.status}
          </p>
        </div>
      </div>
    </MutedCard>
  );
}

// ─── Checklist toggle ─────────────────────────────────────────────────────────

export function ChecklistToggle({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "rounded-[16px] border px-4 py-3.5 text-left transition-all duration-200",
        checked
          ? "border-[var(--rule-strong)] bg-[var(--surface-white)] shadow-[var(--shadow-sm)]"
          : "border-[var(--rule)] bg-[var(--surface-warm)] hover:border-[var(--rule-strong)]",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cx(
            "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold",
            checked
              ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
              : "border-[var(--rule-strong)] bg-transparent text-transparent",
          )}
        >
          ✓
        </span>
        <div>
          <p className="text-[0.8125rem] font-medium text-[#1a1a1a]">{label}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--foreground-faint)]">
            {checked ? "Confirmed" : "Pending"}
          </p>
        </div>
      </div>
    </button>
  );
}

// ─── Highlight pill ───────────────────────────────────────────────────────────

export function HighlightPill({
  active,
  children,
}: {
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]",
        active
          ? "border-[var(--red-border)] bg-[var(--red-soft)] text-[var(--red)]"
          : "border-[var(--rule)] bg-transparent text-[var(--foreground-muted)]",
      )}
    >
      {children}
    </span>
  );
}
