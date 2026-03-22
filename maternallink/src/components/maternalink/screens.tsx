import {
  AssessmentResult,
  CaseForm,
  ChecklistState,
  checklistGroups,
  facilityOptions,
  preTransferChecklist,
  ReferralRecord,
} from "@/lib/maternalink";
import {
  AppHeader,
  ChecklistToggle,
  cx,
  Eyebrow,
  Field,
  HighlightPill,
  HistoryRow,
  HistoryToggle,
  InfoCard,
  MetricTile,
  MutedCard,
  PriorityBadge,
  ScenarioCard,
  SectionTitle,
  SegmentedField,
  SummaryRow,
  SurfaceCard,
  ToggleCard,
} from "@/components/maternalink/primitives";

type Option<T extends string> = { value: T; label: string };

// ─── Shared input style ───────────────────────────────────────────────────────
const inputClassName =
  "w-full rounded-[12px] border border-[rgba(26,26,26,0.12)] bg-[#faf8f5] px-4 py-2.5 text-[0.875rem] text-[#1a1a1a] outline-none placeholder:text-[var(--foreground-faint)] focus:border-[rgba(26,26,26,0.28)] focus:bg-white focus:shadow-[0_4px_16px_rgba(26,26,26,0.07)]";

// ─── Option sets ──────────────────────────────────────────────────────────────
const painOptions: Option<CaseForm["abdominalPain"]>[] = [
  { value: "none",     label: "None"     },
  { value: "mild",     label: "Mild"     },
  { value: "moderate", label: "Moderate" },
  { value: "severe",   label: "Severe"   },
];

const bleedingOptions: Option<CaseForm["bleedingLevel"]>[] = [
  { value: "none",     label: "None"     },
  { value: "spotting", label: "Spotting" },
  { value: "moderate", label: "Moderate" },
  { value: "heavy",    label: "Heavy"    },
];

const contractionOptions: Option<CaseForm["contractions"]>[] = [
  { value: "none",      label: "None"      },
  { value: "irregular", label: "Irregular" },
  { value: "frequent",  label: "Frequent"  },
];

// ─── Dashboard static data ────────────────────────────────────────────────────
const scenarioPatterns = [
  {
    marker: "01",
    title:  "Preeclampsia / hypertension",
    body:   "Uses blood pressure and neurologic symptoms to surface urgent referral patterns.",
  },
  {
    marker: "02",
    title:  "Bleeding in pregnancy",
    body:   "Escalates bleeding clearly so the clinician sees one visible referral priority.",
  },
  {
    marker: "03",
    title:  "Severe pain / preterm labor",
    body:   "Captures abdominal pain, contractions, and fluid leakage without extra screens.",
  },
] as const;

const liveDemoSteps = [
  "Open a new case or load the demo case",
  "Enter triage findings",
  "Show one clear priority result",
  "Confirm transfer readiness",
  "Register the case and handoff record",
] as const;

export { AppHeader };

// ─── Dashboard ────────────────────────────────────────────────────────────────

export function DashboardScreen({
  records,
  onStartBlankCase,
  onStartDemoCase,
}: {
  records: ReferralRecord[];
  onStartBlankCase: () => void;
  onStartDemoCase: () => void;
}) {
  return (
    <div className="space-y-5">
      {/* Hero card */}
      <SurfaceCard className="overflow-hidden rounded-[32px]">
        {/* Hero body */}
        <div className="px-7 py-8 sm:px-9 sm:py-10 lg:px-11 lg:py-11">
          <HighlightPill active>Premium referral workflow · Costa Rica</HighlightPill>
          <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)] xl:items-end">
            <div>
              <h1 className="display-type text-[2.8rem] font-semibold leading-[0.96] tracking-[-0.05em] text-[#1a1a1a] sm:text-[4rem]">
                Calm, structured referral support for high-risk pregnancy cases.
              </h1>
              <p className="mt-5 max-w-2xl text-[0.9375rem] leading-8 text-[var(--foreground-muted)]">
                MaternaLink CR helps first-level care teams register a case, classify referral
                priority, suggest the receiving facility type, complete transfer preparation, and
                leave a traceable handoff record.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row xl:flex-col">
              <button
                type="button"
                onClick={onStartBlankCase}
                className="inline-flex items-center justify-center rounded-full bg-[#1a1a1a] px-6 py-3 text-[0.875rem] font-semibold text-white shadow-[0_16px_40px_rgba(26,26,26,0.18)] hover:-translate-y-0.5 hover:bg-[#2d2d2d]"
              >
                Start new referral
              </button>
              <button
                type="button"
                onClick={onStartDemoCase}
                className="inline-flex items-center justify-center rounded-full border border-[var(--rule-strong)] bg-[var(--surface-warm)] px-6 py-3 text-[0.875rem] font-medium text-[#1a1a1a] hover:-translate-y-0.5 hover:border-[rgba(26,26,26,0.24)]"
              >
                Load demo case
              </button>
            </div>
          </div>
        </div>

        {/* Referral patterns */}
        <div className="border-t border-[var(--rule)] px-7 py-7 sm:px-9 lg:px-11">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)] xl:gap-8">
            <div className="max-w-xs">
              <Eyebrow>Referral patterns</Eyebrow>
              <h2 className="display-type mt-3 text-[1.75rem] font-semibold tracking-[-0.04em] text-[#1a1a1a] sm:text-[2rem]">
                Three clear pathways.
              </h2>
              <p className="mt-3 text-[0.875rem] leading-7 text-[var(--foreground-muted)]">
                Warning patterns in one continuous section so teams can scan without the cramped
                feeling of stacked mobile cards.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[24px] border border-[var(--rule-strong)] bg-[var(--rule)] md:grid-cols-3">
              {scenarioPatterns.map((p) => (
                <ScenarioCard key={p.marker} marker={p.marker} title={p.title} body={p.body} />
              ))}
            </div>
          </div>
        </div>

        {/* Live demo steps */}
        <div className="border-t border-[var(--rule)] px-7 py-7 sm:px-9 lg:px-11">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Live demo path</Eyebrow>
              <p className="mt-2 text-[0.875rem] leading-7 text-[var(--foreground-muted)]">
                The workflow sits as a proper horizontal page section so every step stays visible.
              </p>
            </div>
            <HighlightPill>5-step path</HighlightPill>
          </div>
          <ol className="mt-5 grid gap-px overflow-hidden rounded-[24px] border border-[var(--rule-strong)] bg-[var(--rule)] md:grid-cols-2 xl:grid-cols-5">
            {liveDemoSteps.map((item, i) => (
              <li
                key={item}
                className="flex min-h-[6.5rem] gap-3 bg-[var(--surface-white)] px-4 py-5"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--red-border)] bg-[var(--red-soft)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--red)]">
                  {i + 1}
                </span>
                <p className="text-[0.8125rem] leading-6 text-[#1a1a1a]">{item}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Disclaimer footer */}
        <div className="border-t border-[var(--rule)] px-7 py-5 sm:px-9 lg:px-11">
          <div className="flex flex-wrap items-center gap-2.5">
            <HighlightPill active>Support tool</HighlightPill>
            <HighlightPill>Does not diagnose</HighlightPill>
            <HighlightPill>Does not replace medical judgment</HighlightPill>
          </div>
          <p className="mt-3 max-w-3xl text-[0.875rem] leading-7 text-[var(--foreground-muted)]">
            Designed for EBAIS doctors, nurses, and first-level maternal triage personnel in Costa
            Rica. The experience is intentionally narrow so it can be explained live in one clean demo.
          </p>
        </div>
      </SurfaceCard>

      {/* KPIs + recent cases row */}
      <div className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
        <SurfaceCard className="rounded-[28px] p-6 sm:p-7">
          <Eyebrow>Operational snapshot</Eyebrow>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
            <MetricTile label="Active cases"  value={String(records.length).padStart(2, "0")} />
            <MetricTile
              label="Urgent"
              value={String(records.filter((r) => r.priority === "high").length).padStart(2, "0")}
            />
            <MetricTile
              label="Ready"
              value={String(records.filter((r) => r.status.toLowerCase().includes("ready")).length).padStart(2, "0")}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="rounded-[28px] p-6 sm:p-7">
          <div className="flex items-end justify-between gap-4 border-b border-[var(--rule)] pb-4">
            <div>
              <Eyebrow>Recent cases</Eyebrow>
              <h2 className="display-type mt-1.5 text-[1.7rem] font-semibold tracking-[-0.04em] text-[#1a1a1a]">
                Traceability queue
              </h2>
            </div>
            <HighlightPill active>Demo ready</HighlightPill>
          </div>
          <div className="mt-4 space-y-2.5">
            {records.slice(0, 4).map((r) => (
              <HistoryRow key={r.id} record={r} />
            ))}
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}

// ─── Form screen ──────────────────────────────────────────────────────────────

export function FormScreen({
  form,
  signalSummary,
  validationError,
  onBack,
  onLoadDemo,
  onUpdateField,
  onUpdateNumberField,
  onSubmit,
}: {
  form: CaseForm;
  signalSummary: string[];
  validationError: string | null;
  onBack: () => void;
  onLoadDemo: () => void;
  onUpdateField: <K extends keyof CaseForm>(field: K, value: CaseForm[K]) => void;
  onUpdateNumberField: (
    field: "gestationalAge" | "maternalAge" | "systolic" | "diastolic",
    value: string,
  ) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
      {/* Main form card */}
      <SurfaceCard className="rounded-[32px] p-6 sm:p-8 lg:p-10">
        <div className="mb-7 flex flex-col gap-4 border-b border-[var(--rule)] pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <HighlightPill active>Step 2 of 5</HighlightPill>
            <div className="mt-4">
              <SectionTitle
                title="Guided case entry"
                description="Capture only what is available at triage. The form is intentionally narrow so the referral decision stays fast and understandable."
              />
            </div>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-[var(--rule-strong)] bg-[var(--surface-warm)] px-5 py-2.5 text-[0.8125rem] font-medium text-[#1a1a1a] hover:-translate-y-0.5 hover:border-[rgba(26,26,26,0.24)]"
          >
            Back to dashboard
          </button>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
        >
          {/* Case context */}
          <MutedCard className="rounded-[24px] p-5 sm:p-6">
            <Eyebrow>Case context</Eyebrow>
            <div className="mt-2">
              <SectionTitle title="Origin and pregnancy details" />
            </div>
            <div className="mt-5 grid gap-3.5 md:grid-cols-2">
              <Field label="Origin facility">
                <select
                  value={form.originFacility}
                  onChange={(e) => onUpdateField("originFacility", e.target.value)}
                  className={inputClassName}
                >
                  {facilityOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Patient label or ID" hint="Optional">
                <input
                  type="text"
                  value={form.patientLabel}
                  onChange={(e) => onUpdateField("patientLabel", e.target.value)}
                  placeholder="Case 24-017"
                  className={inputClassName}
                />
              </Field>
              <Field label="Gestational age (weeks)" required>
                <input
                  type="number"
                  min="1" max="42"
                  value={form.gestationalAge}
                  onChange={(e) => onUpdateNumberField("gestationalAge", e.target.value)}
                  placeholder="31"
                  className={inputClassName}
                />
              </Field>
              <Field label="Maternal age" hint="Optional">
                <input
                  type="number"
                  min="10" max="60"
                  value={form.maternalAge}
                  onChange={(e) => onUpdateNumberField("maternalAge", e.target.value)}
                  placeholder="28"
                  className={inputClassName}
                />
              </Field>
            </div>
          </MutedCard>

          {/* Vitals */}
          <MutedCard className="rounded-[24px] p-5 sm:p-6">
            <Eyebrow>Vitals</Eyebrow>
            <div className="mt-2">
              <SectionTitle
                title="Blood pressure"
                description="Record if available. The flow still works without it."
              />
            </div>
            <div className="mt-5 grid gap-3.5 md:grid-cols-2">
              <Field label="Systolic">
                <input
                  type="number"
                  value={form.systolic}
                  onChange={(e) => onUpdateNumberField("systolic", e.target.value)}
                  placeholder="168"
                  className={inputClassName}
                />
              </Field>
              <Field label="Diastolic">
                <input
                  type="number"
                  value={form.diastolic}
                  onChange={(e) => onUpdateNumberField("diastolic", e.target.value)}
                  placeholder="112"
                  className={inputClassName}
                />
              </Field>
            </div>
          </MutedCard>

          {/* Warning signs */}
          <MutedCard className="rounded-[24px] p-5 sm:p-6">
            <Eyebrow>Warning signs</Eyebrow>
            <div className="mt-2">
              <SectionTitle title="Clinical findings at triage" />
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <ToggleCard
                label="Headache"
                description="Neurologic symptom relevant in hypertensive warning patterns."
                active={form.headache}
                onClick={() => onUpdateField("headache", !form.headache)}
              />
              <ToggleCard
                label="Blurred vision"
                description="Visual symptom that increases urgency with high blood pressure."
                active={form.blurredVision}
                onClick={() => onUpdateField("blurredVision", !form.blurredVision)}
              />
            </div>
            <div className="mt-5 space-y-5">
              <SegmentedField
                label="Abdominal pain"
                value={form.abdominalPain}
                options={painOptions}
                onChange={(v) => onUpdateField("abdominalPain", v)}
              />
              <SegmentedField
                label="Bleeding level"
                value={form.bleedingLevel}
                options={bleedingOptions}
                onChange={(v) => onUpdateField("bleedingLevel", v)}
              />
              <SegmentedField
                label="Contractions"
                value={form.contractions}
                options={contractionOptions}
                onChange={(v) => onUpdateField("contractions", v)}
              />
              <ToggleCard
                label="Fluid leakage"
                description="Use when rupture is suspected or reported."
                active={form.fluidLeakage}
                onClick={() => onUpdateField("fluidLeakage", !form.fluidLeakage)}
              />
            </div>
          </MutedCard>

          {/* Relevant history */}
          <MutedCard className="rounded-[24px] p-5 sm:p-6">
            <Eyebrow>Relevant history</Eyebrow>
            <div className="mt-2">
              <SectionTitle title="History that can influence escalation" />
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <HistoryToggle
                label="Previous hypertension"
                active={form.previousHypertension}
                onClick={() => onUpdateField("previousHypertension", !form.previousHypertension)}
              />
              <HistoryToggle
                label="Previous high-risk pregnancy"
                active={form.previousHighRiskPregnancy}
                onClick={() => onUpdateField("previousHighRiskPregnancy", !form.previousHighRiskPregnancy)}
              />
              <HistoryToggle
                label="Previous C-section"
                active={form.previousCesarean}
                onClick={() => onUpdateField("previousCesarean", !form.previousCesarean)}
              />
            </div>
          </MutedCard>

          {/* Validation error */}
          {validationError && (
            <div className="rounded-[16px] border border-[var(--red-border)] bg-[var(--red-soft)] px-5 py-4 text-[0.8125rem] text-[var(--red)]">
              {validationError}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2.5 border-t border-[var(--rule)] pt-5 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={onLoadDemo}
              className="rounded-full border border-[var(--rule-strong)] bg-[var(--surface-warm)] px-5 py-2.5 text-[0.8125rem] font-medium text-[#1a1a1a] hover:-translate-y-0.5"
            >
              Load demo values
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#1a1a1a] px-6 py-2.5 text-[0.875rem] font-semibold text-white shadow-[0_16px_40px_rgba(26,26,26,0.18)] hover:-translate-y-0.5"
            >
              Classify referral
            </button>
          </div>
        </form>
      </SurfaceCard>

      {/* Sidebar */}
      <div className="space-y-5">
        <SurfaceCard className="rounded-[28px] p-6">
          <Eyebrow>Live case summary</Eyebrow>
          <div className="mt-2">
            <SectionTitle title="Referral context" />
          </div>
          <div className="mt-5 space-y-3">
            <SummaryRow label="Origin" value={form.originFacility} />
            <SummaryRow
              label="Gestational age"
              value={form.gestationalAge === "" ? "Not entered yet" : `${form.gestationalAge} weeks`}
            />
            <SummaryRow
              label="Maternal age"
              value={form.maternalAge === "" ? "Optional" : `${form.maternalAge} years`}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="rounded-[28px] p-6">
          <Eyebrow>Captured signals</Eyebrow>
          <div className="mt-4 flex flex-wrap gap-2">
            {signalSummary.length > 0 ? (
              signalSummary.map((s) => <HighlightPill key={s}>{s}</HighlightPill>)
            ) : (
              <p className="text-[0.8125rem] leading-7 text-[var(--foreground-muted)]">
                Add symptoms and findings to build the referral profile.
              </p>
            )}
          </div>
        </SurfaceCard>

        <SurfaceCard className="rounded-[28px] p-6">
          <Eyebrow>MVP flow</Eyebrow>
          <div className="mt-4 space-y-2.5">
            {[
              "Capture the few fields needed to assess referral urgency quickly.",
              "Show one visible priority result with the reason behind it.",
              "Move directly into transfer readiness and traceability.",
            ].map((item, i) => (
              <MutedCard key={item} className="rounded-[18px] px-4 py-3.5">
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-[11px] font-semibold text-white">
                    {i + 1}
                  </div>
                  <p className="text-[0.8125rem] leading-6 text-[#1a1a1a]">{item}</p>
                </div>
              </MutedCard>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}

// ─── Result screen ────────────────────────────────────────────────────────────

export function ResultScreen({
  assessment,
  activeRecord,
  onContinue,
  onEdit,
}: {
  assessment: AssessmentResult;
  activeRecord: ReferralRecord;
  onContinue: () => void;
  onEdit: () => void;
}) {
  const priorityBg: Record<string, string> = {
    high:   "border-[rgba(200,56,42,0.22)]   bg-[rgba(200,56,42,0.05)]",
    medium: "border-[rgba(176,112,48,0.22)]  bg-[rgba(176,112,48,0.05)]",
    low:    "border-[rgba(74,122,90,0.22)]   bg-[rgba(74,122,90,0.05)]",
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
      <SurfaceCard className="rounded-[32px] p-6 sm:p-8 lg:p-10">
        <div className="mb-5 flex flex-wrap items-center gap-2.5">
          <HighlightPill active>Step 3 of 5</HighlightPill>
          <HighlightPill>{activeRecord.id}</HighlightPill>
          <HighlightPill>{activeRecord.originFacility}</HighlightPill>
        </div>

        {/* Priority result block */}
        <div className={cx("rounded-[24px] border p-6 sm:p-7", priorityBg[assessment.priority])}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Eyebrow>Referral priority</Eyebrow>
              <h1 className="display-type mt-2.5 text-[2.6rem] font-semibold tracking-[-0.05em] text-[#1a1a1a] sm:text-[3.5rem]">
                {assessment.priorityLabel}
              </h1>
            </div>
            <PriorityBadge priority={assessment.priority} />
          </div>
          <p className="mt-4 max-w-3xl text-[1rem] leading-8 text-[#1a1a1a]">
            {assessment.message}
          </p>
          <p className="mt-3 max-w-3xl text-[0.875rem] leading-7 text-[var(--foreground-muted)]">
            {assessment.explanation}
          </p>
        </div>

        <div className="mt-5 grid gap-3.5 lg:grid-cols-2">
          <InfoCard
            eyebrow="Suggested receiving facility type"
            title={assessment.destination}
            body={assessment.nextStep}
          />
          <InfoCard
            eyebrow="Case snapshot"
            title={`${activeRecord.gestationalAge} weeks gestation`}
            body={`${activeRecord.patientLabel} from ${activeRecord.originFacility}`}
          />
        </div>

        <div className="mt-5 grid gap-3.5 lg:grid-cols-2">
          <MutedCard className="rounded-[22px] p-5">
            <Eyebrow>Why this level was triggered</Eyebrow>
            <div className="mt-3.5 space-y-2.5">
              {assessment.reasons.map((reason) => (
                <div
                  key={reason}
                  className="rounded-[16px] border border-[var(--rule-strong)] bg-[var(--surface-white)] px-4 py-3.5 text-[0.8125rem] leading-6 text-[#1a1a1a]"
                >
                  {reason}
                </div>
              ))}
            </div>
          </MutedCard>
          <MutedCard className="rounded-[22px] p-5">
            <Eyebrow>Captured signals</Eyebrow>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {assessment.signals.length > 0 ? (
                assessment.signals.map((s) => <HighlightPill key={s}>{s}</HighlightPill>)
              ) : (
                <p className="text-[0.8125rem] leading-7 text-[var(--foreground-muted)]">
                  No additional signals were entered.
                </p>
              )}
            </div>
          </MutedCard>
        </div>
      </SurfaceCard>

      <div className="space-y-5">
        <SurfaceCard className="rounded-[28px] p-6">
          <Eyebrow>Clinical support note</Eyebrow>
          <p className="mt-3 text-[0.875rem] leading-7 text-[var(--foreground-muted)]">
            {assessment.supportNote}
          </p>
        </SurfaceCard>

        <SurfaceCard className="rounded-[28px] p-6">
          <Eyebrow>Recommended next move</Eyebrow>
          <p className="mt-3 text-[0.9375rem] leading-7 text-[#1a1a1a]">
            Continue to the pre-transfer checklist and confirm operational readiness before handoff.
          </p>
          <div className="mt-7 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={onContinue}
              className="rounded-full bg-[#1a1a1a] px-6 py-2.5 text-[0.875rem] font-semibold text-white shadow-[0_16px_40px_rgba(26,26,26,0.18)] hover:-translate-y-0.5"
            >
              Continue to checklist
            </button>
            <button
              type="button"
              onClick={onEdit}
              className="rounded-full border border-[var(--rule-strong)] bg-[var(--surface-warm)] px-6 py-2.5 text-[0.875rem] font-medium text-[#1a1a1a] hover:-translate-y-0.5"
            >
              Edit case details
            </button>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}

// ─── Checklist screen ─────────────────────────────────────────────────────────

export function ChecklistScreen({
  assessment,
  activeRecord,
  checklist,
  checklistCompleteCount,
  checklistComplete,
  onToggle,
  onBack,
  onConfirm,
}: {
  assessment: AssessmentResult;
  activeRecord: ReferralRecord;
  checklist: ChecklistState;
  checklistCompleteCount: number;
  checklistComplete: boolean;
  onToggle: (id: keyof ChecklistState) => void;
  onBack: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
      <SurfaceCard className="rounded-[32px] p-6 sm:p-8 lg:p-10">
        <div className="mb-7 flex flex-col gap-4 border-b border-[var(--rule)] pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <HighlightPill active>Step 4 of 5</HighlightPill>
            <div className="mt-4">
              <SectionTitle
                title="Pre-transfer checklist"
                description="Confirm operational readiness before the referral is registered and handed off."
              />
            </div>
          </div>
          <HighlightPill active>
            {checklistCompleteCount}/{preTransferChecklist.length} items confirmed
          </HighlightPill>
        </div>

        <div className="space-y-4">
          {checklistGroups.map((group) => (
            <MutedCard key={group.title} className="rounded-[24px] p-5">
              <Eyebrow>{group.title}</Eyebrow>
              <p className="mt-2 text-[0.8125rem] leading-6 text-[var(--foreground-muted)]">
                {group.description}
              </p>
              <div className="mt-4 grid gap-2.5 md:grid-cols-2">
                {group.itemIds.map((id) => {
                  const item = preTransferChecklist.find((e) => e.id === id);
                  if (!item) return null;
                  return (
                    <ChecklistToggle
                      key={item.id}
                      label={item.label}
                      checked={checklist[item.id]}
                      onClick={() => onToggle(item.id)}
                    />
                  );
                })}
              </div>
            </MutedCard>
          ))}
        </div>
      </SurfaceCard>

      <div className="space-y-5">
        <SurfaceCard className="rounded-[28px] p-6">
          <PriorityBadge priority={assessment.priority} />
          <div className="mt-4">
            <SectionTitle title="Referral package summary" />
          </div>
          <div className="mt-5 space-y-3">
            <SummaryRow label="Case ID"            value={activeRecord.id} />
            <SummaryRow label="Origin"             value={activeRecord.originFacility} />
            <SummaryRow label="Receiving facility" value={assessment.destination} />
            <SummaryRow label="Priority"           value={assessment.priorityLabel} />
            <SummaryRow label="Trigger"            value={assessment.reasons[0]} />
          </div>
        </SurfaceCard>

        <SurfaceCard className="rounded-[28px] p-6">
          <Eyebrow>Final gate</Eyebrow>
          <p className="mt-3 text-[0.875rem] leading-7 text-[var(--foreground-muted)]">
            Complete all checklist items to generate the traceable handoff record.
          </p>
          <div className="mt-7 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={onConfirm}
              disabled={!checklistComplete}
              className={cx(
                "rounded-full px-6 py-2.5 text-[0.875rem] font-semibold transition-all duration-200",
                checklistComplete
                  ? "bg-[#1a1a1a] text-white shadow-[0_16px_40px_rgba(26,26,26,0.18)] hover:-translate-y-0.5"
                  : "cursor-not-allowed bg-[var(--surface-warm)] text-[var(--foreground-faint)]",
              )}
            >
              Register referral
            </button>
            <button
              type="button"
              onClick={onBack}
              className="rounded-full border border-[var(--rule-strong)] bg-[var(--surface-warm)] px-6 py-2.5 text-[0.875rem] font-medium text-[#1a1a1a] hover:-translate-y-0.5"
            >
              Back to risk result
            </button>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}

// ─── Confirmation screen ──────────────────────────────────────────────────────

export function ConfirmationScreen({
  assessment,
  activeRecord,
  checklistCompleteCount,
  records,
  handoffSummary,
  onDashboard,
  onStartAnother,
}: {
  assessment: AssessmentResult;
  activeRecord: ReferralRecord;
  checklistCompleteCount: number;
  records: ReferralRecord[];
  handoffSummary: string;
  onDashboard: () => void;
  onStartAnother: () => void;
}) {
  return (
    <div className="space-y-5">
      <SurfaceCard className="rounded-[32px] p-6 sm:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <HighlightPill active>Step 5 of 5</HighlightPill>
              <PriorityBadge priority={assessment.priority} />
            </div>
            <div className="mt-5">
              <SectionTitle
                title="Referral registered"
                description="The case is now traceable and ready for handoff to the receiving facility."
              />
            </div>
            <div className="mt-7 grid gap-3.5 md:grid-cols-2">
              <InfoCard
                eyebrow="Case ID"
                title={activeRecord.id}
                body={`${activeRecord.createdAt} from ${activeRecord.originFacility}`}
              />
              <InfoCard
                eyebrow="Suggested receiving facility"
                title={assessment.destination}
                body={assessment.message}
              />
            </div>
          </div>

          <MutedCard className="rounded-[24px] p-6">
            <Eyebrow>Handoff summary</Eyebrow>
            <p className="mt-3.5 text-[0.875rem] leading-7 text-[#1a1a1a]">{handoffSummary}</p>
          </MutedCard>
        </div>
      </SurfaceCard>

      <div className="grid gap-5 lg:grid-cols-[0.94fr_1.06fr]">
        <SurfaceCard className="rounded-[28px] p-6">
          <SectionTitle title="Traceability snapshot" />
          <div className="mt-5 space-y-3">
            <SummaryRow label="Patient label"        value={activeRecord.patientLabel} />
            <SummaryRow label="Gestational age"      value={`${activeRecord.gestationalAge} weeks`} />
            <SummaryRow label="Referral status"      value={activeRecord.status} />
            <SummaryRow
              label="Checklist completion"
              value={`${checklistCompleteCount}/${preTransferChecklist.length} confirmed`}
            />
            <SummaryRow label="Primary trigger" value={activeRecord.reason} />
          </div>
        </SurfaceCard>

        <SurfaceCard className="rounded-[28px] p-6">
          <div className="flex flex-col gap-4 border-b border-[var(--rule)] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Recent cases</Eyebrow>
              <SectionTitle title="Case added to the queue" />
            </div>
            <button
              type="button"
              onClick={onDashboard}
              className="rounded-full border border-[var(--rule-strong)] bg-[var(--surface-warm)] px-5 py-2.5 text-[0.8125rem] font-medium text-[#1a1a1a] hover:-translate-y-0.5"
            >
              Return to dashboard
            </button>
          </div>
          <div className="mt-4 space-y-2.5">
            {records.slice(0, 4).map((r) => (
              <HistoryRow key={r.id} record={r} />
            ))}
          </div>
          <button
            type="button"
            onClick={onStartAnother}
            className="mt-5 rounded-full bg-[#1a1a1a] px-6 py-2.5 text-[0.875rem] font-semibold text-white shadow-[0_16px_40px_rgba(26,26,26,0.18)] hover:-translate-y-0.5"
          >
            Start another referral
          </button>
        </SurfaceCard>
      </div>
    </div>
  );
}
