function Home() {
  return (
    <main id="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span>✦</span>
            AI-POWERED AGRICULTURE
          </div>

          <h1>
            Predict.
            <br />
            <span>Plan.</span>
            <br />
            Grow Smarter.
          </h1>

          <p className="hero-description">
            Make data-driven agricultural decisions with machine
            learning-powered crop yield prediction.
          </p>

          <div className="hero-buttons">
            <button className="primary-button">
              Predict Crop Yield
              <span>→</span>
            </button>

            <button className="secondary-button">Explore Insights</button>
          </div>

          <div className="hero-note">
            <span>✓</span>
            Powered by a Random Forest regression model
          </div>
        </div>

        {/* Hero visual */}
        <div className="hero-visual">
          <div className="visual-glow"></div>

          <div className="farm-card">
            <div className="farm-header">
              <div>
                <span className="small-label">PREDICTION MODEL</span>
                <h3>Crop Intelligence</h3>
              </div>

              <div className="status-dot"></div>
            </div>

            <div className="crop-illustration">🌾</div>

            <div className="prediction-mini-card">
              <div>
                <span>Estimated Yield</span>
                <strong>3.35</strong>
              </div>

              <div className="trend">↗</div>
            </div>

            <div className="farm-data">
              <div>
                <span>Crop</span>
                <strong>Rice</strong>
              </div>

              <div>
                <span>Season</span>
                <strong>Kharif</strong>
              </div>

              <div>
                <span>State</span>
                <strong>Karnataka</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="stat-item">
          <strong>62+</strong>
          <span>Crop Types</span>
        </div>

        <div className="stat-divider"></div>

        <div className="stat-item">
          <strong>31</strong>
          <span>States & UTs</span>
        </div>

        <div className="stat-divider"></div>

        <div className="stat-item">
          <strong>15K+</strong>
          <span>Training Records</span>
        </div>

        <div className="stat-divider"></div>

        <div className="stat-item">
          <strong>0.9825</strong>
          <span>Test R²</span>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-heading">
          <div className="section-label">WHY CROPYIELD</div>

          <h2>
            Agriculture meets
            <span> intelligence.</span>
          </h2>

          <p>
            Turn agricultural data into meaningful predictions through a simple
            and intelligent workflow.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🌱</div>

            <h3>Data-Driven</h3>

            <p>
              Analyze crop, rainfall, fertilizer and agricultural information to
              generate yield estimates.
            </p>
          </div>

          <div className="feature-card featured-card">
            <div className="feature-icon">🧠</div>

            <h3>Machine Learning</h3>

            <p>
              Predictions are generated using a trained Random Forest regression
              model.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>

            <h3>Useful Insights</h3>

            <p>
              Explore prediction history, crop information and agricultural
              trends through interactive analytics.
            </p>
          </div>
        </div>
      </section>

      {/* How it works preview */}
      <section className="workflow-section">
        <div className="section-heading">
          <div className="section-label">HOW IT WORKS</div>

          <h2>
            From data to
            <span> prediction.</span>
          </h2>
        </div>

        <div className="workflow">
          <div className="workflow-step">
            <div className="step-number">01</div>

            <h3>Enter Data</h3>

            <p>Provide crop and agricultural information.</p>
          </div>

          <div className="workflow-line"></div>

          <div className="workflow-step">
            <div className="step-number">02</div>

            <h3>Process</h3>

            <p>The backend prepares the information for the model.</p>
          </div>

          <div className="workflow-line"></div>

          <div className="workflow-step">
            <div className="step-number">03</div>

            <h3>Predict</h3>

            <p>Our trained ML model generates the yield estimate.</p>
          </div>

          <div className="workflow-line"></div>

          <div className="workflow-step">
            <div className="step-number">04</div>

            <h3>Understand</h3>

            <p>View the result and explore useful insights.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
