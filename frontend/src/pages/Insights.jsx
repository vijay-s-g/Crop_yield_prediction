function Insights() {
  const crops = [
    {
      name: "Rice",
      emoji: "🌾",
      category: "Cereal",
      description: "Major food crop commonly grown during Kharif season.",
    },
    {
      name: "Wheat",
      emoji: "🌿",
      category: "Cereal",
      description: "Important Rabi crop with strong agricultural significance.",
    },
    {
      name: "Maize",
      emoji: "🌽",
      category: "Cereal",
      description:
        "Versatile crop used for food, feed and industrial purposes.",
    },
    {
      name: "Sugarcane",
      emoji: "🎋",
      category: "Commercial",
      description:
        "High-value commercial crop requiring substantial water resources.",
    },
    {
      name: "Cotton",
      emoji: "☁️",
      category: "Cash Crop",
      description: "Important fibre crop cultivated across several regions.",
    },
    {
      name: "Banana",
      emoji: "🍌",
      category: "Fruit",
      description:
        "Fruit crop with relatively high yield compared with many cereals.",
    },
  ];

  return (
    <main className="insights-page">
      <section className="insights-header">
        <div className="section-label">CROP INTELLIGENCE</div>

        <h1>
          Agricultural <span>Insights</span>
        </h1>

        <p>
          Explore crop information and understand the factors used by the yield
          prediction system.
        </p>
      </section>

      <section className="insight-overview">
        <div className="insight-overview-card">
          <div className="insight-icon">🌱</div>
          <div>
            <span>Crop Types</span>
            <strong>62+</strong>
            <p>Represented in the dataset</p>
          </div>
        </div>

        <div className="insight-overview-card">
          <div className="insight-icon">🗺️</div>
          <div>
            <span>States / UTs</span>
            <strong>31</strong>
            <p>Covered by the dataset</p>
          </div>
        </div>

        <div className="insight-overview-card">
          <div className="insight-icon">📅</div>
          <div>
            <span>Historical Period</span>
            <strong>2000–2020</strong>
            <p>Data used for model training</p>
          </div>
        </div>
      </section>

      <section className="insights-section">
        <div className="insights-section-heading">
          <div>
            <span className="card-label">FEATURED CROPS</span>
            <h2>Explore Crop Categories</h2>
          </div>

          <p>Examples of crops represented in the prediction dataset.</p>
        </div>

        <div className="crop-insight-grid">
          {crops.map((crop) => (
            <div className="crop-insight-card" key={crop.name}>
              <div className="crop-insight-top">
                <div className="crop-emoji">{crop.emoji}</div>

                <span className="crop-category">{crop.category}</span>
              </div>

              <h3>{crop.name}</h3>

              <p>{crop.description}</p>

              <div className="crop-insight-link">Dataset feature →</div>
            </div>
          ))}
        </div>
      </section>

      <section className="insights-section">
        <div className="insights-section-heading">
          <div>
            <span className="card-label">PREDICTION FACTORS</span>
            <h2>What Influences the Prediction?</h2>
          </div>
        </div>

        <div className="factor-grid">
          <div className="factor-card">
            <div className="factor-number">01</div>
            <div className="factor-icon">📍</div>
            <h3>Location</h3>
            <p>
              State information helps the model identify regional agricultural
              patterns.
            </p>
          </div>

          <div className="factor-card">
            <div className="factor-number">02</div>
            <div className="factor-icon">🌾</div>
            <h3>Crop & Season</h3>
            <p>
              Crop type and growing season provide important categorical
              information to the model.
            </p>
          </div>

          <div className="factor-card">
            <div className="factor-number">03</div>
            <div className="factor-icon">💧</div>
            <h3>Rainfall</h3>
            <p>
              Annual rainfall is included as an environmental factor in the
              prediction.
            </p>
          </div>

          <div className="factor-card">
            <div className="factor-number">04</div>
            <div className="factor-icon">🧪</div>
            <h3>Farm Inputs</h3>
            <p>
              Fertilizer and pesticide usage are included as agricultural input
              features.
            </p>
          </div>

          <div className="factor-card">
            <div className="factor-number">05</div>
            <div className="factor-icon">📐</div>
            <h3>Cultivated Area</h3>
            <p>
              The cultivated area is used directly as a numerical feature by the
              prediction model.
            </p>
          </div>

          <div className="factor-card">
            <div className="factor-number">06</div>
            <div className="factor-icon">📆</div>
            <h3>Year</h3>
            <p>
              The agricultural year helps the model capture changes across the
              historical dataset.
            </p>
          </div>
        </div>
      </section>

      <section className="insights-highlight">
        <div className="highlight-icon">🤖</div>

        <div>
          <span className="card-label">MACHINE LEARNING</span>

          <h2>Data-driven crop yield estimation</h2>

          <p>
            CropYield uses a Random Forest regression model with agricultural,
            environmental and categorical features to estimate crop yield.
          </p>
        </div>

        <div className="highlight-metric">
          <strong>0.9825</strong>
          <span>Test R²</span>
        </div>
      </section>
    </main>
  );
}

export default Insights;
