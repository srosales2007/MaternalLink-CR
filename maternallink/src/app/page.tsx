"use client";

import { useState } from "react";
import {
  buildHandoffSummary,
  buildSignalSummary,
  CaseForm,
  ChecklistItemId,
  ChecklistState,
  classifyCase,
  createCaseId,
  createDemoChecklistState,
  createEmptyChecklistState,
  defaultCaseForm,
  demoCaseForm,
  formatCreatedAt,
  preTransferChecklist,
  ReferralRecord,
  Screen,
  seededCases,
} from "@/lib/maternalink";
import {
  AppHeader,
  ChecklistScreen,
  ConfirmationScreen,
  DashboardScreen,
  FormScreen,
  ResultScreen,
} from "@/components/maternalink/screens";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [form, setForm] = useState<CaseForm>({ ...defaultCaseForm });
  const [records, setRecords] = useState<ReferralRecord[]>(seededCases);
  const [checklist, setChecklist] = useState<ChecklistState>(createEmptyChecklistState());
  const [assessment, setAssessment] = useState<ReturnType<typeof classifyCase> | null>(null);
  const [activeRecord, setActiveRecord] = useState<ReferralRecord | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const signalSummary = buildSignalSummary(form);
  const checklistCompleteCount = preTransferChecklist.filter((item) => checklist[item.id]).length;
  const checklistComplete = checklistCompleteCount === preTransferChecklist.length;

  function updateField<K extends keyof CaseForm>(field: K, value: CaseForm[K]) {
    setValidationError(null);
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateNumberField(
    field: "gestationalAge" | "maternalAge" | "systolic" | "diastolic",
    value: string,
  ) {
    updateField(field, value === "" ? "" : Number(value));
  }

  function startBlankCase() {
    setForm({ ...defaultCaseForm });
    setChecklist(createEmptyChecklistState());
    setAssessment(null);
    setActiveRecord(null);
    setValidationError(null);
    setScreen("form");
  }

  function startDemoCase() {
    setForm({ ...demoCaseForm });
    setChecklist(createDemoChecklistState());
    setAssessment(null);
    setActiveRecord(null);
    setValidationError(null);
    setScreen("form");
  }

  function goHome() {
    setScreen("dashboard");
  }

  function assessCase() {
    if (form.gestationalAge === "") {
      setValidationError("Gestational age is required to classify this referral.");
      return;
    }

    const result = classifyCase(form);
    const record: ReferralRecord = {
      id: createCaseId(records.length),
      patientLabel: form.patientLabel.trim() || "New referral",
      originFacility: form.originFacility,
      gestationalAge: Number(form.gestationalAge),
      priority: result.priority,
      destination: result.destination,
      reason: result.reasons[0],
      status:
        result.priority === "high"
          ? "Pre-transfer checklist in progress"
          : result.priority === "medium"
            ? "Referral coordination in progress"
            : "Monitoring plan pending confirmation",
      createdAt: formatCreatedAt(new Date()),
    };

    setAssessment(result);
    setActiveRecord(record);
    setScreen("result");
  }

  function toggleChecklist(id: ChecklistItemId) {
    setChecklist((current) => ({ ...current, [id]: !current[id] }));
  }

  function confirmReferral() {
    if (!assessment || !activeRecord || !checklistComplete) {
      return;
    }

    const confirmedRecord: ReferralRecord = {
      ...activeRecord,
      status:
        assessment.priority === "high"
          ? "Registered and ready for urgent handoff"
          : assessment.priority === "medium"
            ? "Registered and queued for referral handoff"
            : "Registered with monitoring plan",
    };

    setActiveRecord(confirmedRecord);
    setRecords((current) =>
      current.some((record) => record.id === confirmedRecord.id)
        ? current
        : [confirmedRecord, ...current],
    );
    setScreen("confirmation");
  }

  const handoffSummary =
    assessment && activeRecord ? buildHandoffSummary(form, assessment) : "";

  return (
    <main className="min-h-screen">
      <div className="mx-auto min-h-screen w-full max-w-[1440px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <AppHeader screen={screen} onGoHome={goHome} />

        {screen === "dashboard" && (
          <DashboardScreen
            records={records}
            onStartBlankCase={startBlankCase}
            onStartDemoCase={startDemoCase}
          />
        )}

        {screen === "form" && (
          <FormScreen
            form={form}
            signalSummary={signalSummary}
            validationError={validationError}
            onBack={goHome}
            onLoadDemo={startDemoCase}
            onUpdateField={updateField}
            onUpdateNumberField={updateNumberField}
            onSubmit={assessCase}
          />
        )}

        {screen === "result" && assessment && activeRecord && (
          <ResultScreen
            assessment={assessment}
            activeRecord={activeRecord}
            onContinue={() => setScreen("checklist")}
            onEdit={() => setScreen("form")}
          />
        )}

        {screen === "checklist" && assessment && activeRecord && (
          <ChecklistScreen
            assessment={assessment}
            activeRecord={activeRecord}
            checklist={checklist}
            checklistCompleteCount={checklistCompleteCount}
            checklistComplete={checklistComplete}
            onToggle={toggleChecklist}
            onBack={() => setScreen("result")}
            onConfirm={confirmReferral}
          />
        )}

        {screen === "confirmation" && assessment && activeRecord && (
          <ConfirmationScreen
            assessment={assessment}
            activeRecord={activeRecord}
            checklistCompleteCount={checklistCompleteCount}
            records={records}
            handoffSummary={handoffSummary}
            onDashboard={goHome}
            onStartAnother={startBlankCase}
          />
        )}
      </div>
    </main>
  );
}
