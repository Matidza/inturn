import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch, INTERVIEWS_PATH, CATEGORIES, ivxTheme } from "./aiInterviewShared";

type FormState = {
  title: string; description: string; category: string; difficulty: string;
  duration: string; visibility: "public" | "private"; questions: string[];
};

const emptyForm = (): FormState => ({
  title: "", description: "", category: "Technical", difficulty: "beginner",
  duration: "30", visibility: "public", questions: ["", "", ""],
});

const AIInterviewCreate: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(emptyForm());
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patch = (k: keyof FormState) => (e: React.ChangeEvent<any>) => setForm(f => ({ ...f, [k]: e.target.value }));
  const patchQ = (i: number, v: string) => setForm(f => { const q = [...f.questions]; q[i] = v; return { ...f, questions: q }; });
  const addQ = () => form.questions.length < 12 && setForm(f => ({ ...f, questions: [...f.questions, ""] }));
  const removeQ = (i: number) => setForm(f => ({ ...f, questions: f.questions.filter((_, j) => j !== i) }));

  const detailsValid = form.title.trim().length > 5 && form.description.trim().length > 10;
  const questionsValid = form.questions.filter(q => q.trim().length > 0).length >= 2;

  const submit = async () => {
    if (!questionsValid) return;
    setSubmitting(true);
    setError(null);
    try {
      const data = await authFetch(INTERVIEWS_PATH, {
        method: "POST",
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          category: form.category,
          difficulty: form.difficulty,
          duration: parseInt(form.duration, 10),
          visibility: form.visibility,
          questions: form.questions.filter(q => q.trim().length > 0),
        }),
      });
      // hand the new session back to the browse page via nav state so it
      // can show a "published" toast without an extra fetch
      navigate("/mentee/ai-home", { state: { justCreated: data.result } });
    } catch (err: any) {
      setError(err?.message ?? "Couldn't create the session. Try again.");
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{ivxTheme}</style>
      <div className="ivx-shell">
        <div className="ivx-page">
          <button className="ivx-back" onClick={() => navigate("/mentee/ai-home")}>← Back to sessions</button>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 24 }}>New practice session</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-2)", marginTop: 4 }}>Step {step} of 2</div>
          </div>

          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="ivx-field">
                <label>Title</label>
                <input placeholder="e.g. React Frontend Engineer — Junior Level" value={form.title} onChange={patch("title")} />
              </div>
              <div className="ivx-field">
                <label>Description</label>
                <textarea placeholder="What will practicers work through? Who is this for?" value={form.description} onChange={patch("description")} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="ivx-field">
                  <label>Category</label>
                  <select value={form.category} onChange={patch("category")}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="ivx-field">
                  <label>Difficulty</label>
                  <select value={form.difficulty} onChange={patch("difficulty")}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="ivx-field">
                  <label>Duration (min)</label>
                  <input type="number" min={5} max={120} value={form.duration} onChange={patch("duration")} />
                </div>
                <div className="ivx-field">
                  <label>Visibility</label>
                  <select value={form.visibility} onChange={patch("visibility")}>
                    <option value="public">Public — anyone can practice</option>
                    <option value="private">Private — only me</option>
                  </select>
                </div>
              </div>
              <button className="ivx-submit" disabled={!detailsValid} onClick={() => setStep(2)}>
                Continue — add questions
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "var(--brand-wash)", borderRadius: 12, padding: 14, fontSize: 13, color: "var(--brand-deep)", lineHeight: 1.6 }}>
                These questions guide the AI's line of questioning during the session.
              </div>
              {form.questions.map((q, i) => (
                <div key={i} className="ivx-q-row">
                  <div className="ivx-q-num">{i + 1}</div>
                  <input
                    placeholder={["Tell me about yourself.", "What's your biggest challenge?", "Describe a project you're proud of."][i % 3]}
                    value={q}
                    onChange={e => patchQ(i, e.target.value)}
                  />
                  {form.questions.length > 2 && (
                    <button onClick={() => removeQ(i)} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--ink-3)" }}>✕</button>
                  )}
                </div>
              ))}
              {form.questions.length < 12 && (
                <button onClick={addQ} style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px dashed var(--line)", background: "none", cursor: "pointer", fontSize: 13.5, color: "var(--ink-2)" }}>
                  + Add another question
                </button>
              )}
              {error && (
                <div style={{ background: "var(--bad-wash)", border: "1px solid #F5C2C2", borderRadius: 10, padding: 12, fontSize: 13, color: "#991B1B" }}>
                  {error}
                </div>
              )}
              <button className="ivx-submit" disabled={!questionsValid || submitting} onClick={submit}>
                {submitting ? <><div className="ivx-spinner" />Publishing…</> : "Publish session"}
              </button>
              <button onClick={() => setStep(1)} style={{ padding: 12, borderRadius: 10, border: "1.5px solid var(--line)", background: "none", cursor: "pointer", fontSize: 13.5 }}>
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AIInterviewCreate;