import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  authFetch, buildQuery, toSession, CATEGORIES, ivxTheme, DifficultyGauge,
  INTERVIEWS_PATH, Session,
} from "./aiInterviewShared";

const SessionCard = ({ s, onOpen, onStart }: { s: Session; onOpen: (id: string) => void; onStart: (s: Session) => void }) => (
  <div className="ivx-card ivx-rise" onClick={() => onOpen(s.id)}>
    <div className="ivx-card-body">
      <DifficultyGauge level={s.difficulty} />
      <div className="ivx-card-title">{s.title}</div>
      <div className="ivx-card-desc">{s.description}</div>
      <div className="ivx-card-meta">
        <span>{s.questionCount} questions · {s.duration}m</span>
        <span>★ {s.rating.toFixed(1)}</span>
      </div>
    </div>
    <div className="ivx-card-foot">
      <div className="ivx-author">
        <img src={s.authorAvatar} alt="" />
        <span>{s.authorLabel}</span>
      </div>
      <button className="ivx-go" onClick={e => { e.stopPropagation(); onStart(s); }} aria-label="Start session">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 3l14 9-14 9V3z" fill="#fff" /></svg>
      </button>
    </div>
  </div>
);

const AIInterviewBrowse: React.FC = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState<"community" | "mine">("community");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [search, setSearch] = useState("");

  const [community, setCommunity] = useState<Session[]>([]);
  const [mine, setMine] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (scope: "community" | "mine") => {
    setLoading(true);
    setError(null);
    try {
      const q = buildQuery(scope, { category, sort, search });
      const data = await authFetch(`${INTERVIEWS_PATH}?${q}`);
      const sessions: Session[] = (data.result?.interviews ?? []).map(toSession);
      if (scope === "community") setCommunity(sessions);
      else setMine(sessions.filter(s => !s.isPublic));
    } catch (err: any) {
      setError(err?.message ?? "Couldn't load sessions. Try again.");
    } finally {
      setLoading(false);
    }
  }, [category, sort, search]);

  useEffect(() => { load(tab); }, [tab, load]);

  const active = tab === "mine" ? mine : community;
  const featured = community.filter(s => s.featured);

  const openSession = (id: string) => navigate(`/mentee/ai-interview/${id}`);
  const startSession = (s: Session) => navigate("/mentee/ai-practice", {
    state: { interviewId: s.id, title: s.title, questions: s.questionList, duration: s.duration, category: s.category },
  });

  return (
    <>
      <style>{ivxTheme}</style>
      <div className="ivx-shell">

        <section className="ivx-hero">
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <span className="ivx-eyebrow ivx-rise">◆ AI-guided practice</span>
            <div className="ivx-title ivx-rise d1">Build the reps that<br />make interviews feel routine.</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
              <p className="ivx-sub ivx-rise d1">
                Run through sessions the community has built, or put together your own. Each one adapts its follow-ups to what you say.
              </p>
              <Link to="/mentee/ai-interview/new" className="ivx-cta ivx-rise d2">+ New session</Link>
            </div>
            <div className="ivx-rise d2" style={{ display: "flex", gap: 28, marginTop: 32, flexWrap: "wrap" }}>
              <div className="ivx-stat"><b>{community.length}</b><span>sessions live</span></div>
              <div className="ivx-stat"><b>{community.reduce((n, s) => n + s.attempts, 0)}</b><span>attempts logged</span></div>
            </div>
          </div>
        </section>

        <div className="ivx-body">
          <aside className="ivx-rail">
            <div className="ivx-rail-group">
              <h4>Search</h4>
              <div className="ivx-search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
                <input placeholder="Find a session…" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>
            <div className="ivx-rail-group">
              <h4>Sort</h4>
              <select className="ivx-sort" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="popular">Most popular</option>
                <option value="rating">Highest rated</option>
                <option value="newest">Newest first</option>
                <option value="shortest">Shortest</option>
              </select>
            </div>
            <div className="ivx-rail-group">
              <h4>Category</h4>
              <button className={`ivx-cat-btn${category === "All" ? " active" : ""}`} onClick={() => setCategory("All")}>All</button>
              {CATEGORIES.map(c => (
                <button key={c} className={`ivx-cat-btn${category === c ? " active" : ""}`} onClick={() => setCategory(c)}>
                  {c}
                </button>
              ))}
            </div>
          </aside>

          <main>
            {error && (
              <div style={{ background: "var(--bad-wash)", border: "1px solid #F5C2C2", borderRadius: 12, padding: 16, marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 13.5, color: "#991B1B" }}>{error}</span>
                <button onClick={() => load(tab)} style={{ border: "none", background: "var(--bad)", color: "#fff", borderRadius: 8, padding: "7px 14px", fontSize: 12.5, cursor: "pointer" }}>Retry</button>
              </div>
            )}

            {tab === "community" && !loading && featured.length > 0 && (
              <div style={{ marginTop: 28 }}>
                <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 12 }}>Featured</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
                  {featured.map(s => (
                    <div key={s.id} className="ivx-feat" onClick={() => openSession(s.id)}>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.title}</div>
                      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.55)", lineHeight: 1.6, marginBottom: 16 }}>{s.description}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11.5, color: "rgba(255,255,255,.5)" }}>{s.questionCount} questions · {s.duration}m</span>
                        <svg className="ivx-feat-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="ivx-tabs">
              <button className={`ivx-tab${tab === "community" ? " active" : ""}`} onClick={() => setTab("community")}>
                Community <span className="ivx-tab-count">{community.length}</span>
              </button>
              <button className={`ivx-tab${tab === "mine" ? " active" : ""}`} onClick={() => setTab("mine")}>
                My sessions <span className="ivx-tab-count">{mine.length}</span>
              </button>
            </div>

            {loading ? (
              <div className="ivx-grid">{[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="ivx-skel" />)}</div>
            ) : active.length === 0 ? (
              <div className="ivx-empty">
                <div className="ivx-empty-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
                </div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
                  {tab === "mine" ? "No sessions yet" : "Nothing matches"}
                </div>
                <div style={{ fontSize: 13.5, color: "var(--ink-2)", marginBottom: 20 }}>
                  {tab === "mine" ? "Build your first session and share it with the community." : "Try a different search or category."}
                </div>
                {tab === "mine" && <Link to="/mentee/ai-interview/new" className="ivx-cta">+ New session</Link>}
              </div>
            ) : (
              <div className="ivx-grid">
                {active.map(s => <SessionCard key={s.id} s={s} onOpen={openSession} onStart={startSession} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default AIInterviewBrowse;