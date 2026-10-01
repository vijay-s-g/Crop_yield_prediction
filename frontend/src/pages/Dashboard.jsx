function Dashboard() {
  return (
    <main className="dashboard-page">
      {/* Header */}
      <section className="dashboard-header">
        <div className="section-label">CROP INTELLIGENCE</div>

        <h1>
          Agricultural
          <span> Dashboard</span>
        </h1>

        <p>
          Explore crop yield information, model performance, and agricultural
          statistics.
        </p>
      </section>

      {/* Statistics */}
      <section className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">🌱</div>

          <div>
            <span>Crop Types</span>

            <strong>62+</strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">📍</div>

          <div>
            <span>States / UTs</span>

            <strong>31</strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">📊</div>

          <div>
            <span>Training Records</span>

            <strong>15,954</strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">🤖</div>

          <div>
            <span>Test R²</span>

            <strong>0.9825</strong>
          </div>
        </div>
      </section>

      {/* Main dashboard cards */}
      <section className="dashboard-grid">
        {/* Model Performance */}
        <div className="dashboard-card model-card">
          <div className="dashboard-card-header">
            <div>
              <span className="card-label">MACHINE LEARNING</span>

              <h2>Model Performance</h2>
            </div>

            <div className="card-icon">🤖</div>
          </div>

          <div className="performance-item">
            <div>
              <span>R² Score</span>

              <strong>0.9825</strong>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "98.25%" }}></div>
            </div>
          </div>

          <div className="performance-item">
            <div>
              <span>MAE</span>

              <strong>9.39</strong>
            </div>
          </div>

          <div className="performance-item">
            <div>
              <span>RMSE</span>

              <strong>118.25</strong>
            </div>
          </div>

          <p className="dashboard-note">
            Metrics calculated on the held-out test set.
          </p>
        </div>

        {/* Model Inputs */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div>
              <span className="card-label">MODEL INPUTS</span>

              <h2>Prediction Factors</h2>
            </div>

            <div className="card-icon">🌾</div>
          </div>

          <div className="factor-list">
            <div className="factor-item">
              <span>📅</span>
              <div>
                <strong>Year</strong>
                <small>Historical agricultural year</small>
              </div>
            </div>

            <div className="factor-item">
              <span>📍</span>
              <div>
                <strong>State</strong>
                <small>State or Union Territory</small>
              </div>
            </div>

            <div className="factor-item">
              <span>🌱</span>
              <div>
                <strong>Crop</strong>
                <small>Selected crop type</small>
              </div>
            </div>

            <div className="factor-item">
              <span>☀️</span>
              <div>
                <strong>Season</strong>
                <small>Agricultural growing season</small>
              </div>
            </div>

            <div className="factor-item">
              <span>💧</span>
              <div>
                <strong>Annual Rainfall</strong>
                <small>Measured in millimetres</small>
              </div>
            </div>

            <div className="factor-item">
              <span>🌾</span>
              <div>
                <strong>Farming Inputs</strong>
                <small>Area, fertilizer and pesticide</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How prediction works */}
      <section className="dashboard-card dashboard-process">
        <div className="dashboard-card-header">
          <div>
            <span className="card-label">PREDICTION PIPELINE</span>

            <h2>From Agricultural Data to Prediction</h2>
          </div>
        </div>

        <div className="process-flow">
          <div className="process-step">
            <div className="process-number">01</div>

            <h3>Input</h3>

            <p>Agricultural and environmental information is entered.</p>
          </div>

          <div className="process-line"></div>

          <div className="process-step">
            <div className="process-number">02</div>

            <h3>Process</h3>

            <p>
              Data is prepared and passed through the trained model pipeline.
            </p>
          </div>

          <div className="process-line"></div>

          <div className="process-step">
            <div className="process-number">03</div>

            <h3>Predict</h3>

            <p>The Random Forest model estimates crop yield.</p>
          </div>

          <div className="process-line"></div>

          <div className="process-step">
            <div className="process-number">04</div>

            <h3>Result</h3>

            <p>The estimated yield is presented to the user.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
