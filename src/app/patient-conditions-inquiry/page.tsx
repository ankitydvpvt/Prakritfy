"use client";

import { useState, useEffect } from "react";

// Use Render production API only
const BASE_URL = "https://nutribot-backend-9e3a.onrender.com";

const diseaseQuestions: Record<string, any[]> = {
  diabetes: [
    {
      id: "fasting_sugar",
      question: "Fasting sugar level (mg/dL)",
      type: "text",
      placeholder: "Enter value ",
    },
    {
      id: "postmeal_sugar",
      question: "Post-meal sugar level (mg/dL)",
      type: "text",
      placeholder: "Enter value ",
    },
    {
      id: "hba1c",
      question: "HbA1c level",
      type: "text",
      placeholder: "Enter value ",
    },
    {
      id: "diabetes_medication",
      question: "Diabetes medication",
      type: "select",
      options: ["Yes", "No"],
    },
  ],
  blood_pressure: [
    {
      id: "systolic_bp",
      question: "Systolic BP (upper value)",
      type: "text",
      placeholder: "Enter value ",
    },
    {
      id: "diastolic_bp",
      question: "Diastolic BP (lower value)",
      type: "text",
      placeholder: "Enter value ",
    },
    {
      id: "bp_medication",
      question: "BP medication",
      type: "select",
      options: ["Yes", "No"],
    },
  ],
  cholesterol: [
    {
      id: "total_cholesterol",
      question: "Total cholesterol level",
      type: "text",
      placeholder: "Enter value ",
    },
  ],
  thyroid: [
    {
      id: "tsh_level",
      question: "TSH level",
      type: "text",
      placeholder: "Enter value ",
    },
    {
      id: "thyroid_type",
      question: "Thyroid type",
      type: "radio",
      options: ["Hypothyroid", "Hyperthyroid", "Not sure"],
    },
  ],
  heart_health: [
    {
      id: "heart_diagnosis",
      question: "Diagnosed with heart issues",
      type: "select",
      options: ["Yes", "No"],
    },
  ],
  liver_issues: [
    {
      id: "fatty_liver",
      question: "Fatty liver issues",
      type: "select",
      options: ["Yes", "No"],
    },
  ],
  arthritis: [
    {
      id: "pain_issue",
      question: "Pain issue description",
      type: "text",
      placeholder: "Describe your pain",
    },
  ],
  pcos: [
    {
      id: "menstrual_cycle",
      question: "Menstrual cycle regular",
      type: "select",
      options: ["Yes", "No"],
    },
  ],
};

// Display names for UI
const diseaseDisplayNames: Record<string, string> = {
  diabetes: "Diabetes",
  blood_pressure: "Blood Pressure",
  cholesterol: "Cholesterol",
  thyroid: "Thyroid",
  heart_health: "Heart Health",
  liver_issues: "Liver Issues",
  arthritis: "Arthritis",
  pcos: "PCOS",
};

interface FormData {
  diseases: string[];
  name: string;
  phone: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  email: string;
  conditionDetails: Record<string, Record<string, any>>;
}

type ToastType = "success" | "error" | "warn";

function Toast({
  msg,
  type,
  onClose,
}: {
  msg: string;
  type: ToastType;
  onClose: () => void;
}) {
  const colors: Record<ToastType, string> = {
    success: "bg-emerald-50 border-emerald-400 text-emerald-800",
    error: "bg-red-50 border-red-400 text-red-800",
    warn: "bg-amber-50 border-amber-400 text-amber-800",
  };
  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg max-w-sm ${colors[type]}`}
    >
      <span className="text-sm font-medium leading-snug flex-1">{msg}</span>
      <button
        onClick={onClose}
        className="text-lg leading-none opacity-50 hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}

export default function SimpleForm() {
  const [form, setForm] = useState<FormData>({
    diseases: [],
    name: "",
    phone: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    email: "",
    conditionDetails: {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendReady, setBackendReady] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(
    null,
  );

  // wake up Render's free tier on mount
  useEffect(() => {
    const wake = async () => {
      try {
        await fetch(`${BASE_URL}/api/questionnaire/all?page=1&limit=1`);
        setBackendReady(true);
      } catch {
        setBackendReady(true); // still let user try even if ping fails
      }
    };
    wake();
  }, []);

  const showToast = (msg: string, type: ToastType) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // hide PCOS if gender is Male
  const availableDiseases = Object.keys(diseaseQuestions).filter(
    (d) => d !== "pcos" || form.gender === "" || form.gender === "Female",
  );

  const handleDiseaseChange = (disease: string) => {
    if (form.diseases.includes(disease)) {
      const newDiseases = form.diseases.filter((d) => d !== disease);
      const newDetails = { ...form.conditionDetails };
      delete newDetails[disease];
      setForm({ ...form, diseases: newDiseases, conditionDetails: newDetails });
    } else {
      setForm({
        ...form,
        diseases: [...form.diseases, disease],
        conditionDetails: { ...form.conditionDetails, [disease]: {} },
      });
    }
  };
  const fetchWithRetry = async (url: string, options: any, retries = 2) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(await res.text());
      return res;
    } catch (err) {
      if (retries > 0) {
        console.log("🔁 Retrying...");
        await new Promise((r) => setTimeout(r, 2000));
        return fetchWithRetry(url, options, retries - 1);
      }
      throw err;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    // if gender switches to Male, auto-remove PCOS
    if (name === "gender" && value === "Male") {
      const newDiseases = form.diseases.filter((d) => d !== "pcos");
      const newDetails = { ...form.conditionDetails };
      delete newDetails["pcos"];
      setForm({
        ...form,
        gender: value,
        diseases: newDiseases,
        conditionDetails: newDetails,
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleConditionDetailChange = (
    disease: string,
    questionId: string,
    value: any,
  ) => {
    setForm({
      ...form,
      conditionDetails: {
        ...form.conditionDetails,
        [disease]: { ...form.conditionDetails[disease], [questionId]: value },
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) return showToast("Full name is required.", "warn");
    if (!form.phone.trim())
      return showToast("Phone number is required.", "warn");
    if (!form.email.trim())
      return showToast("Email address is required.", "warn");
    if (!form.age) return showToast("Age is required.", "warn");
    if (!form.gender) return showToast("Please select a gender.", "warn");
    if (!form.weight.trim()) return showToast("Weight is required.", "warn");

    setIsSubmitting(true);

    try {
      // Map question IDs to proper schema field names
      const fieldMapping: Record<string, Record<string, string>> = {
        diabetes: {
          fasting_sugar: "fastingSugar",
          postmeal_sugar: "postMealSugar",
          hba1c: "hba1c",
          diabetes_medication: "medication",
        },
        blood_pressure: {
          systolic_bp: "systolic",
          diastolic_bp: "diastolic",
          bp_medication: "medication",
        },
        cholesterol: {
          total_cholesterol: "totalCholesterol",
        },
        thyroid: {
          tsh_level: "tsh",
          thyroid_type: "thyroidType",
        },
        heart_health: {
          heart_diagnosis: "diagnosed",
        },
        pcos: {
          menstrual_cycle: "cycleRegular",
        },
        liver_issues: {
          fatty_liver: "fattyLiver",
        },
        arthritis: {
          pain_issue: "issue",
        },
      };

      // Build conditions object with proper field names
      const conditions: Record<string, any> = {};
      Object.entries(form.conditionDetails).forEach(([disease, details]) => {
        const schemaDiseaseName =
          disease === "blood_pressure"
            ? "bloodPressure"
            : disease === "heart_health"
              ? "heartHealth"
              : disease === "liver_issues"
                ? "liverIssues"
                : disease === "arthritis"
                  ? "arthritisJointPain"
                  : disease === "cholesterol"
                    ? "cholesterolLipids"
                    : disease;

        const mapping = fieldMapping[disease] || {};
        const conditionData: Record<string, any> = {};

        Object.entries(details).forEach(([qId, val]) => {
          const fieldName = mapping[qId] || qId;
          const strVal = String(val ?? "").trim();

          // Convert values
          if (strVal === "" || strVal.toLowerCase() === "n") {
            conditionData[fieldName] = null;
          } else if (
            fieldName === "medication" ||
            fieldName === "cycleRegular" ||
            fieldName === "diagnosed" ||
            fieldName === "fattyLiver"
          ) {
            // Boolean fields
            conditionData[fieldName] = strVal.toLowerCase() === "yes";
          } else if (
            fieldName === "fastingSugar" ||
            fieldName === "postMealSugar" ||
            fieldName === "hba1c" ||
            fieldName === "totalCholesterol" ||
            fieldName === "systolic" ||
            fieldName === "diastolic" ||
            fieldName === "tsh"
          ) {
            // Numeric fields
            conditionData[fieldName] = parseFloat(strVal) || null;
          } else {
            // String fields
            conditionData[fieldName] = strVal || null;
          }
        });

        conditions[schemaDiseaseName] = conditionData;
      });

      // height: number if parseable, else omit entirely
      const heightNum = parseFloat(form.height);

      const payload = {
        phoneNumber: form.phone.trim(),
        email: form.email.trim(),
        name: form.name.trim(),
        selectedConditions: form.diseases,
        responses: {
          gender: form.gender.toLowerCase(),
          age: Number(form.age),
          weightKg: parseFloat(form.weight),
          ...(Number.isFinite(heightNum) ? { heightCm: heightNum } : {}),
          ...(form.diseases.length > 0 ? { conditions } : {}),
        },
      };

      console.log("Submitting payload:", JSON.stringify(payload, null, 2));

      const res = await fetch(`${BASE_URL}/api/questionnaire/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("API response:", data);

      if (!res.ok) {
        const detail = Array.isArray(data?.details)
          ? data.details.join("\n")
          : (data?.error ?? "Submission failed.");
        throw new Error(detail);
      }

      showToast("✅ Submitted successfully!", "success");
      console.log("Inquiry ID:", data?.data?.inquiryId);

      // reset form
      setForm({
        diseases: [],
        name: "",
        phone: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        email: "",
        conditionDetails: {},
      });
    } catch (err: any) {
      console.error("❌ Error:", err);

      showToast(err.message || "Something went wrong", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#71d2ba] via-[#468374] to-[#2c5a4f] py-8 px-4"
      suppressHydrationWarning
    >
      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* backend waking up banner */}
      {!backendReady && (
        <div className="max-w-5xl mx-auto mb-4">
          <div className="bg-amber-50 border border-amber-300 text-amber-800 text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
            <svg
              className="animate-spin w-4 h-4 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Waking up the server — this may take up to 30 seconds on first
            load...
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#71d2ba] to-[#468374] px-6 py-5">
            <div className="text-2xl font-bold text-white">
              Health Assessment Form
            </div>
            <div className="text-white/80 text-sm mt-1">
              Complete all sections below
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* ── 1. Medical Conditions ─────────────────────────────── */}
            <div className="mb-8">
              <div className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b-2 border-[#71d2ba]">
                1. SELECT MEDICAL CONDITIONS
              </div>
              <div className="text-sm text-gray-500 mb-3">
                ✓ Check all that apply
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableDiseases.map((disease) => (
                  <div
                    key={disease}
                    onClick={() => handleDiseaseChange(disease)}
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition ${
                      form.diseases.includes(disease)
                        ? "border-[#468374] bg-[#468374]/10"
                        : "border-gray-200 hover:border-[#71d2ba] hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.diseases.includes(disease)}
                      onChange={() => {}}
                      className="w-4 h-4 text-[#468374] pointer-events-none"
                    />
                    <span
                      className={`text-sm ${
                        form.diseases.includes(disease)
                          ? "text-[#468374] font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {diseaseDisplayNames[disease]}
                    </span>
                  </div>
                ))}
              </div>
              {form.diseases.length > 0 && (
                <div className="mt-3 p-2 bg-[#468374]/10 rounded-lg inline-block">
                  <span className="text-sm text-[#468374] font-medium">
                    ✓ {form.diseases.length} condition(s) selected
                  </span>
                </div>
              )}
            </div>

            {/* ── Dynamic Condition Questions ───────────────────────── */}
            {form.diseases.map((disease) => (
              <div key={disease} className="mb-8">
                <div className="text-md font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  <span className="bg-[#468374]/20 px-3 py-1 rounded text-[#468374]">
                    {diseaseDisplayNames[disease]} Details
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {diseaseQuestions[disease]?.map((q) => (
                    <div
                      key={q.id}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                    >
                      <div className="text-sm font-semibold text-gray-800 mb-2">
                        {q.question}
                      </div>

                      {q.type === "select" ? (
                        <select
                          value={form.conditionDetails[disease]?.[q.id] ?? ""}
                          onChange={(e) =>
                            handleConditionDetailChange(
                              disease,
                              q.id,
                              e.target.value,
                            )
                          }
                          className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#468374] focus:ring-1 focus:ring-[#71d2ba]"
                        >
                          <option value="">-- Select --</option>
                          {q.options?.map((opt: string) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : q.type === "radio" ? (
                        <div className="flex gap-5 mt-1 flex-wrap">
                          {q.options?.map((opt: string) => (
                            <label
                              key={opt}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name={`${disease}_${q.id}`}
                                value={opt}
                                checked={
                                  form.conditionDetails[disease]?.[q.id] === opt
                                }
                                onChange={(e) =>
                                  handleConditionDetailChange(
                                    disease,
                                    q.id,
                                    e.target.value,
                                  )
                                }
                                className="w-4 h-4 text-[#468374]"
                              />
                              <span className="text-sm text-gray-700">
                                {opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={form.conditionDetails[disease]?.[q.id] ?? ""}
                          onChange={(e) =>
                            handleConditionDetailChange(
                              disease,
                              q.id,
                              e.target.value,
                            )
                          }
                          placeholder={q.placeholder}
                          className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* ── 2. Personal Information ───────────────────────────── */}
            <div className="mb-8">
              <div className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b-2 border-[#71d2ba]">
                2. PERSONAL INFORMATION
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-800 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:border-[#468374] focus:ring-1 focus:ring-[#71d2ba]"
                  />
                </div>

                {/* Age */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-800 mb-2">
                    Age <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    required
                    min={1}
                    max={120}
                    className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:border-[#468374] focus:ring-1 focus:ring-[#71d2ba]"
                  />
                </div>

                {/* Gender */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-800 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </div>
                  <div className="flex gap-6 mt-1">
                    {["Male", "Female"].map((g) => (
                      <label
                        key={g}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={form.gender === g}
                          onChange={handleChange}
                          className="w-4 h-4 text-[#468374]"
                        />
                        <span className="text-sm text-gray-700">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Weight */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-800 mb-2">
                    Weight (kg) <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="number"
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    placeholder="Enter your weight"
                    required
                    min={1}
                    className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:border-[#468374] focus:ring-1 focus:ring-[#71d2ba]"
                  />
                </div>

                {/* Height */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-800 mb-2">
                    Height (cm)
                  </div>
                  <input
                    type="text"
                    name="height"
                    value={form.height}
                    onChange={handleChange}
                    placeholder="Enter height or 'n'"
                    className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:border-[#468374] focus:ring-1 focus:ring-[#71d2ba]"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    Enter 'n' if not known
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-800 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. 923001234567"
                    required
                    className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:border-[#468374] focus:ring-1 focus:ring-[#71d2ba]"
                  />
                </div>

                {/* Email — full width */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 md:col-span-2">
                  <div className="text-sm font-semibold text-gray-800 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:border-[#468374] focus:ring-1 focus:ring-[#71d2ba]"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    Required — used for updates
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !backendReady}
              className={`w-full py-3.5 rounded-lg font-semibold transition-all text-base ${
                isSubmitting || !backendReady
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#71d2ba] to-[#468374] text-white hover:shadow-xl"
              }`}
            >
              {isSubmitting
                ? "Submitting..."
                : !backendReady
                  ? "Loading..."
                  : "SUBMIT"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
