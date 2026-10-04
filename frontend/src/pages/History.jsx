import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        setError("Please login to view your prediction history.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/predictions/${userId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch prediction history.");
        }

        const data = await response.json();

        if (data.success) {
          setHistory(data.predictions);
        } else {
          setError("Unable to load prediction history.");
        }
      } catch {
        setError(
          "Unable to connect to backend. Please make sure FastAPI is running.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const averageYield =
    history.length > 0
      ? (
          history.reduce((sum, item) => sum + Number(item.predicted_yield), 0) /
          history.length
        ).toFixed(2)
      : "0.00";

  const uniqueCrops = new Set(history.map((item) => item.crop)).size;

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="history-page">
      {/* HEADER */}
      <section className="history-header">
        <div className="section-label">PREDICTION RECORDS</div>

        <h1>
          Prediction <span>History</span>
        </h1>

        <p>View and track your previous crop yield predictions.</p>
      </section>

      {/* SUMMARY */}
      <section className="history-summary">
        <div className="history-summary-card">
          <div className="history-summary-icon">📊</div>

          <div>
            <span>Total Predictions</span>
            <strong>{history.length}</strong>
          </div>
        </div>

        <div className="history-summary-card">
          <div className="history-summary-icon">🌾</div>

          <div>
            <span>Crops Predicted</span>
            <strong>{uniqueCrops}</strong>
          </div>
        </div>

        <div className="history-summary-card">
          <div className="history-summary-icon">📈</div>

          <div>
            <span>Average Yield</span>
            <strong>{averageYield}</strong>
          </div>
        </div>
      </section>

      {/* HISTORY TABLE */}
      <section className="history-card">
        <div className="history-card-header">
          <div>
            <span className="card-label">RECENT ACTIVITY</span>
            <h2>Prediction Records</h2>
          </div>

          <a href="/predict" className="history-new-button">
            + New Prediction
          </a>
        </div>

        {loading && (
          <div className="history-empty">Loading prediction history...</div>
        )}

        {error && !loading && <div className="history-empty">{error}</div>}

        {!loading && !error && history.length === 0 && (
          <div className="history-empty">
            <h3>No predictions yet</h3>
            <p>Make your first crop yield prediction to see it here.</p>
          </div>
        )}

        {!loading && !error && history.length > 0 && (
          <div className="history-table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Crop</th>
                  <th>State</th>
                  <th>Season</th>
                  <th>Area (ha)</th>
                  <th>Rainfall (mm)</th>
                  <th>Predicted Yield</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item) => (
                  <tr key={item.prediction_id}>
                    <td>{formatDate(item.created_at)}</td>

                    <td>
                      <div className="history-crop">
                        <span>🌱</span>
                        {item.crop}
                      </div>
                    </td>

                    <td>{item.state}</td>

                    <td>
                      <span className="season-badge">{item.season}</span>
                    </td>

                    <td>{Number(item.area).toLocaleString("en-IN")}</td>

                    <td>
                      {Number(item.annual_rainfall).toLocaleString("en-IN")}
                    </td>

                    <td>
                      <strong className="yield-value">
                        {Number(item.predicted_yield).toFixed(2)} t/ha
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* INFO */}
      <section className="history-info">
        <div className="history-info-icon">💡</div>

        <div>
          <h3>Prediction History</h3>

          <p>
            Your crop yield predictions are stored in your account and displayed
            here automatically.
          </p>
        </div>
      </section>
    </main>
  );
}

export default History;
