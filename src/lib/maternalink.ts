export type Priority = "high" | "medium" | "low";
export type Screen = "dashboard" | "form" | "result" | "checklist" | "confirmation";
export type AbdominalPainLevel = "none" | "mild" | "moderate" | "severe";
export type BleedingLevel = "none" | "spotting" | "moderate" | "heavy";
export type ContractionFrequency = "none" | "irregular" | "frequent";
export type NumberField = number | "";

export type CaseForm = {
  originFacility: string;
  patientLabel: string;
  gestationalAge: NumberField;
  maternalAge: NumberField;
  systolic: NumberField;
  diastolic: NumberField;
  headache: boolean;
  blurredVision: boolean;
  abdominalPain: AbdominalPainLevel;
  bleedingLevel: BleedingLevel;
  contractions: ContractionFrequency;
  fluidLeakage: boolean;
  previousHypertension: boolean;
  previousHighRiskPregnancy: boolean;
  previousCesarean: boolean;
};

export type AssessmentResult = {
  priority: Priority;
  priorityLabel: string;
  message: string;
  explanation: string;
  destination: string;
  nextStep: string;
  reasons: string[];
  signals: string[];
  supportNote: string;
};

export type ReferralRecord = {
  id: string;
  patientLabel: string;
  originFacility: string;
  gestationalAge: number;
  priority: Priority;
  destination: string;
  reason: string;
  status: string;
  createdAt: string;
};

export const stepDefinitions: Array<{ id: Screen; label: string }> = [
  { id: "dashboard", label: "Start" },
  { id: "form", label: "Case" },
  { id: "result", label: "Risk" },
  { id: "checklist", label: "Transfer" },
  { id: "confirmation", label: "Traceability" },
];

export const facilityOptions = [
  "EBAIS Desamparados 3",
  "EBAIS Alajuelita 2",
  "EBAIS Liberia Central",
  "EBAIS Turrialba Centro",
  "EBAIS Limon Centro",
];

export const priorityTone: Record<
  Priority,
  { label: string; accent: string; soft: string; ring: string; text: string }
> = {
  high: {
    label: "High priority",
    accent: "bg-[#e56f69]",
    soft: "bg-[#fff1ee]",
    ring: "ring-[#f1b7b2]",
    text: "text-[#a53d35]",
  },
  medium: {
    label: "Medium priority",
    accent: "bg-[#e3ad42]",
    soft: "bg-[#fff7e7]",
    ring: "ring-[#f3ddad]",
    text: "text-[#9d6a09]",
  },
  low: {
    label: "Low priority",
    accent: "bg-[#49b985]",
    soft: "bg-[#eff9f3]",
    ring: "ring-[#bfe5d0]",
    text: "text-[#1e7a55]",
  },
};

export const defaultCaseForm: CaseForm = {
  originFacility: facilityOptions[0],
  patientLabel: "",
  gestationalAge: "",
  maternalAge: "",
  systolic: "",
  diastolic: "",
  headache: false,
  blurredVision: false,
  abdominalPain: "none",
  bleedingLevel: "none",
  contractions: "none",
  fluidLeakage: false,
  previousHypertension: false,
  previousHighRiskPregnancy: false,
  previousCesarean: false,
};

export const demoCaseForm: CaseForm = {
  originFacility: "EBAIS Desamparados 3",
  patientLabel: "Case 24-017",
  gestationalAge: 31,
  maternalAge: 28,
  systolic: 168,
  diastolic: 112,
  headache: true,
  blurredVision: true,
  abdominalPain: "moderate",
  bleedingLevel: "none",
  contractions: "none",
  fluidLeakage: false,
  previousHypertension: true,
  previousHighRiskPregnancy: false,
  previousCesarean: false,
};

export const seededCases: ReferralRecord[] = [
  {
    id: "MLC-260321-011",
    patientLabel: "Case 24-011",
    originFacility: "EBAIS Alajuelita 2",
    gestationalAge: 34,
    priority: "high",
    destination: "Hospital with obstetric emergency capacity",
    reason: "Heavy bleeding reported during pregnancy",
    status: "Awaiting transport confirmation",
    createdAt: "21 Mar, 17:42",
  },
  {
    id: "MLC-260321-009",
    patientLabel: "Case 24-009",
    originFacility: "EBAIS Liberia Central",
    gestationalAge: 29,
    priority: "medium",
    destination: "Referral center for same-day maternal evaluation",
    reason: "Elevated blood pressure without severe symptoms",
    status: "Receiving facility notified",
    createdAt: "21 Mar, 16:18",
  },
  {
    id: "MLC-260321-006",
    patientLabel: "Case 24-006",
    originFacility: "EBAIS Turrialba Centro",
    gestationalAge: 37,
    priority: "low",
    destination: "Primary care follow-up and monitoring",
    reason: "Mild isolated abdominal discomfort",
    status: "Follow-up plan documented",
    createdAt: "21 Mar, 14:05",
  },
];

export const preTransferChecklist = [
  { id: "reason", label: "Reason for referral documented" },
  { id: "onset", label: "Time of symptom onset recorded" },
  { id: "patient", label: "Patient basic details complete" },
  { id: "vitals", label: "Vital signs taken" },
  { id: "bp", label: "Blood pressure recorded if available" },
  { id: "stable", label: "Patient stable for transfer" },
  { id: "fetal", label: "Fetal movements assessed or reported" },
  { id: "iv", label: "IV access established if indicated" },
  { id: "documents", label: "Documents ready" },
  { id: "facility", label: "Receiving facility identified" },
  { id: "transport", label: "Transport arranged" },
] as const;

export type ChecklistItemId = (typeof preTransferChecklist)[number]["id"];
export type ChecklistState = Record<ChecklistItemId, boolean>;

export const checklistGroups: Array<{
  title: string;
  description: string;
  itemIds: ChecklistItemId[];
}> = [
  {
    title: "Documentation",
    description: "Capture the case clearly before transfer starts.",
    itemIds: ["reason", "onset", "patient", "documents"],
  },
  {
    title: "Clinical status",
    description: "Confirm maternal and fetal status before dispatch.",
    itemIds: ["vitals", "bp", "stable", "fetal"],
  },
  {
    title: "Transfer logistics",
    description: "Make sure the receiving pathway is operational.",
    itemIds: ["iv", "facility", "transport"],
  },
];

export function createEmptyChecklistState(): ChecklistState {
  return {
    reason: false,
    onset: false,
    patient: false,
    vitals: false,
    bp: false,
    stable: false,
    fetal: false,
    iv: false,
    documents: false,
    facility: false,
    transport: false,
  };
}

export function createDemoChecklistState(): ChecklistState {
  return {
    reason: true,
    onset: true,
    patient: true,
    vitals: true,
    bp: true,
    stable: false,
    fetal: true,
    iv: false,
    documents: true,
    facility: true,
    transport: false,
  };
}

export function buildSignalSummary(form: CaseForm): string[] {
  const signals: string[] = [];

  if (form.systolic !== "" && form.diastolic !== "") {
    signals.push(`BP ${form.systolic}/${form.diastolic} mmHg`);
  } else if (form.systolic !== "" || form.diastolic !== "") {
    signals.push("Blood pressure partially recorded");
  }

  if (form.headache) {
    signals.push("Headache");
  }

  if (form.blurredVision) {
    signals.push("Blurred vision");
  }

  if (form.abdominalPain !== "none") {
    signals.push(`${capitalize(form.abdominalPain)} abdominal pain`);
  }

  if (form.bleedingLevel !== "none") {
    signals.push(`${capitalize(form.bleedingLevel)} bleeding`);
  }

  if (form.contractions !== "none") {
    signals.push(`${capitalize(form.contractions)} contractions`);
  }

  if (form.fluidLeakage) {
    signals.push("Fluid leakage");
  }

  if (form.previousHypertension) {
    signals.push("Previous hypertension");
  }

  if (form.previousHighRiskPregnancy) {
    signals.push("Previous high-risk pregnancy");
  }

  if (form.previousCesarean) {
    signals.push("Previous C-section");
  }

  return signals;
}

export function classifyCase(form: CaseForm): AssessmentResult {
  const gestationalAge = Number(form.gestationalAge);
  const systolic = Number(form.systolic);
  const diastolic = Number(form.diastolic);

  const bpRecorded = form.systolic !== "" && form.diastolic !== "";
  const hasSevereBp = bpRecorded && (systolic >= 160 || diastolic >= 110);
  const hasElevatedBp = bpRecorded && (systolic >= 140 || diastolic >= 90);
  const hasBpSymptoms = form.headache || form.blurredVision;
  const heavyBleeding = form.bleedingLevel === "heavy";
  const anyBleeding = form.bleedingLevel === "spotting" || form.bleedingLevel === "moderate";
  const severePainWithAssociatedSigns =
    form.abdominalPain === "severe" &&
    (form.bleedingLevel !== "none" || form.fluidLeakage || form.contractions !== "none");
  const frequentPretermContractions =
    form.contractions === "frequent" && gestationalAge > 0 && gestationalAge < 37;
  const fluidLeakage = form.fluidLeakage;
  const moderatePain = form.abdominalPain === "moderate";
  const irregularContractions = form.contractions === "irregular";

  const highReasons: string[] = [];
  const mediumReasons: string[] = [];

  if (hasSevereBp && hasBpSymptoms) {
    highReasons.push(
      `Very high blood pressure (${systolic}/${diastolic} mmHg) was entered together with neurologic warning symptoms.`,
    );
  } else if (hasSevereBp) {
    highReasons.push(`Very high blood pressure (${systolic}/${diastolic} mmHg) was entered.`);
  } else if (hasElevatedBp) {
    mediumReasons.push(`Elevated blood pressure (${systolic}/${diastolic} mmHg) was recorded.`);
  }

  if (heavyBleeding) {
    highReasons.push("Heavy bleeding was reported during pregnancy.");
  } else if (anyBleeding) {
    mediumReasons.push("Mild to moderate bleeding was reported.");
  }

  if (severePainWithAssociatedSigns) {
    highReasons.push("Severe abdominal pain was reported together with additional warning signs.");
  } else if (moderatePain) {
    mediumReasons.push("Moderate abdominal pain was reported.");
  }

  if (frequentPretermContractions) {
    highReasons.push(`Frequent contractions were entered before 37 weeks (${gestationalAge} weeks).`);
  } else if (irregularContractions) {
    mediumReasons.push("Irregular contractions were reported.");
  }

  if (fluidLeakage) {
    highReasons.push("Fluid leakage was reported and needs urgent evaluation.");
  }

  const signals = buildSignalSummary(form);

  if (highReasons.length > 0) {
    return {
      priority: "high",
      priorityLabel: "HIGH PRIORITY",
      message: "Urgent referral to a higher-level care center is recommended.",
      explanation:
        "This case includes warning signs that should trigger urgent maternal-fetal evaluation and transfer coordination.",
      destination: "Hospital with obstetric emergency capacity",
      nextStep: "Initiate phone coordination and complete the pre-transfer checklist before dispatch.",
      reasons: highReasons,
      signals,
      supportNote:
        "MaternaLink CR supports referral prioritization. It does not diagnose and does not replace clinical judgment.",
    };
  }

  if (mediumReasons.length > 0) {
    return {
      priority: "medium",
      priorityLabel: "MEDIUM PRIORITY",
      message: "Evaluation at a referral center is recommended based on availability.",
      explanation:
        "This case should be escalated for timely evaluation because referral warning signs are present, even without the highest urgency triggers.",
      destination: "Referral center for same-day maternal evaluation",
      nextStep: "Coordinate referral availability, document findings clearly, and prepare transfer information.",
      reasons: mediumReasons,
      signals,
      supportNote:
        "MaternaLink CR supports referral prioritization. It does not diagnose and does not replace clinical judgment.",
    };
  }

  return {
    priority: "low",
    priorityLabel: "LOW PRIORITY",
    message: "Monitoring and follow-up are suggested according to clinical judgment.",
    explanation:
      "No urgent referral warning signs were triggered from the information entered. Continue monitoring and document any change in symptoms.",
    destination: "Primary care follow-up and monitoring",
    nextStep: "Maintain observation, reinforce return precautions, and escalate if warning signs appear.",
    reasons: [
      signals.length > 0
        ? "Only isolated mild findings were entered and no urgent referral trigger was activated."
        : "No warning signs were entered in the MVP screening fields.",
    ],
    signals,
    supportNote:
      "MaternaLink CR supports referral prioritization. It does not diagnose and does not replace clinical judgment.",
  };
}

export function createCaseId(existingCount: number): string {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const suffix = String(existingCount + 12).padStart(3, "0");
  return `MLC-${year}${month}${day}-${suffix}`;
}

export function formatCreatedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function buildHandoffSummary(form: CaseForm, assessment: AssessmentResult): string {
  const caseLabel = form.patientLabel.trim() || "New maternal referral";
  const gestation = form.gestationalAge !== "" ? `${form.gestationalAge} weeks` : "unknown gestational age";
  const topReasons = assessment.reasons.slice(0, 2).join(" ");
  return `${caseLabel} from ${form.originFacility}. ${gestation}. ${topReasons} ${assessment.message}`;
}

function capitalize(value: string): string {
  if (!value) {
    return value;
  }

  return value[0].toUpperCase() + value.slice(1);
}
