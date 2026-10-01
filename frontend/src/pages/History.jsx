function History() {
  const history = [
    {
      id: 1,
      date: "28 Sep 2026",
      crop: "Rice",
      state: "Karnataka",
      season: "Kharif",
      area: "5,000",
      rainfall: "1,200",
      yield: "3.35",
    },
    {
      id: 2,
      date: "27 Sep 2026",
      crop: "Wheat",
      state: "Punjab",
      season: "Rabi",
      area: "3,500",
      rainfall: "850",
      yield: "4.12",
    },
    {
      id: 3,
      date: "26 Sep 2026",
      crop: "Maize",
      state: "Karnataka",
      season: "Kharif",
      area: "2,800",
      rainfall: "1,050",
      yield: "2.46",
    },
  ];

  return (
    <main className="history-page">
      <section className="history-header">
        <div className="section-label">PREDICTION RECORDS</div>

        <h1>
          Prediction <span>History</span>
        </h1>

        <p>View and track your previous crop yield predictions.</p>
      </section>

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
            <strong>{new Set(history.map((item) => item.crop)).size}</strong>
          </div>
        </div>

        <div className="history-summary-card">
          <div className="history-summary-icon">📈</div>
          <div>
            <span>Average Yield</span>
            <strong>
              {(
                history.reduce((sum, item) => sum + parseFloat(item.yield), 0) /
                history.length
              ).toFixed(2)}
            </strong>
          </div>
        </div>
      </section>

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
                <tr key={item.id}>
                  <td>{item.date}</td>

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

                  <td>{item.area}</td>

                  <td>{item.rainfall}</td>

                  <td>
                    <strong className="yield-value">{item.yield} t/ha</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="history-info">
        <div className="history-info-icon">💡</div>

        <div>
          <h3>Prediction History</h3>
          <p>
            Your prediction records will be stored permanently once the MySQL
            database is connected to the application.
          </p>
        </div>
      </section>
    </main>
  );
}

export default History;
