import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../lib/supabase";
import "../styles/Dashboard.css";

const API_BASE = "http://localhost:3000";

console.log("NEW DASHBOARD VERSION RUNNING");
interface TaskItem {
  id?: string;
  title?: string;
  isCompleted?: boolean;
  created_at?: string;
}

interface IntentResponse {
  Identity: string;
  Response: {
    message: string;
    tasks?: TaskItem[];
    title?: string;
  } | null;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<IntentResponse | null>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const sendToBackend = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError("Please log in again.");
      return;
    }

    setError(null);
    setResponse(null);
    setLoading(true);

    try {
      const res = await axios.post<IntentResponse>(
        `${API_BASE}/api/intents`,
        { input },
        { headers: { Authorization: `Bearer ${session.access_token}` } }
      );
      console.log("FULL RESPONSE FROM GATEWAY:", res.data);
      setResponse(res.data);
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message || "Request failed"
        : "Something went wrong";
      setError(String(message));
    } finally {
      setLoading(false);
    }
  };

  const intentLabel =
    response?.Identity?.replace("API called determining intent: ", "") ?? null;

  const tasks = response?.Response?.tasks ?? [];
  const message = response?.Response?.message ?? null;
  const deletedTaskTitle = response?.Response?.title ?? null;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-row">
          <h1 className="dashboard-title">IntentFlow</h1>
          <button className="dashboard-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
        <p className="dashboard-subtitle">
          Say what you want to do in plain language.
        </p>
      </header>

      <section className="dashboard-input-section">
        <div className="input-wrap">
          <input
            type="text"
            className="dashboard-input"
            placeholder="e.g. Add a task to buy groceries, or list my tasks"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendToBackend()}
            disabled={loading}
          />
          <button
            className="dashboard-send"
            onClick={sendToBackend}
            disabled={loading || !input.trim()}
          >
            {loading ? "…" : "Send"}
          </button>
        </div>
      </section>

      {error && (
        <div className="dashboard-panel dashboard-error">
          <span className="panel-label">Error</span>
          <p>{error}</p>
        </div>
      )}

      {response && (
        <section className="dashboard-response">
          {intentLabel && (
            <div className="intent-badge">
              {intentLabel.replace(/_/g, " ")}
            </div>
          )}

          {message && <p className="response-message">{message}</p>}

          {deletedTaskTitle && (
            <div className="dashboard-panel dashboard-deleted">
              <span className="panel-label">Deleted</span>
              <p>
                Task "<strong>{deletedTaskTitle}</strong>" was deleted.
              </p>
            </div>
          )}

          {tasks.length > 0 && (
            <div className="tasks-list">
              <h3 className="tasks-title">Tasks</h3>
              <ul className="tasks-ul">
                {tasks.map((task, i) => (
                  <li key={task.id ?? i} className="task-item">
                    <span className="task-title">
                      {task.title ?? "Untitled"}
                    </span>

                    {task.isCompleted != null && (
                      <span
                        className={`task-status ${
                          task.isCompleted ? "done" : "pending"
                        }`}
                      >
                        {task.isCompleted ? "Done" : "Pending"}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {response.Response === null && intentLabel && (
            <p className="response-muted">
              This intent is not connected to a service yet.
            </p>
          )}
        </section>
      )}
    </div>
  );
}