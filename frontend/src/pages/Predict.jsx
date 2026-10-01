import { useState } from "react";

function Predict() {
  // ================================
  // FORM DATA
  // ================================

  const [formData, setFormData] = useState({
    Year: 2020,
    State: "",
    Crop: "",
    Season: "",
    Area: "",
    Annual_Rainfall: "",
    Fertilizer: "",
    Pesticide: "",
  });

  // ================================
  // PREDICTION STATE
  // ================================

  const [prediction, setPrediction] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ================================
  // HANDLE INPUT CHANGES
  // ================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ================================
  // RESET FORM
  // ================================

  const handleReset = () => {
    setFormData({
      Year: 2020,
      State: "",
      Crop: "",
      Season: "",
      Area: "",
      Annual_Rainfall: "",
      Fertilizer: "",
      Pesticide: "",
    });

    setPrediction(null);

    setError("");
  };

  // ================================
  // SUBMIT PREDICTION
  // ================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setPrediction(null);

    setError("");

    // Basic validation

    if (
      Number(formData.Area) <= 0 ||
      Number(formData.Annual_Rainfall) < 0 ||
      Number(formData.Fertilizer) < 0 ||
      Number(formData.Pesticide) < 0
    ) {
      setError("Please enter valid positive agricultural values.");

      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          Year: Number(formData.Year),

          State: formData.State,

          Crop: formData.Crop,

          Season: formData.Season,

          Area: Number(formData.Area),

          Annual_Rainfall: Number(formData.Annual_Rainfall),

          Fertilizer: Number(formData.Fertilizer),

          Pesticide: Number(formData.Pesticide),
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed.");
      }

      const data = await response.json();

      setPrediction(Number(data.predicted_yield));
    } catch {
      setError(
        "Unable to get prediction. Please make sure the FastAPI backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // PAGE
  // ================================

  return (
    <main className="predict-page" id="predict">
      {/* ================================= */}
      {/* PAGE HEADER */}
      {/* ================================= */}

      <section className="predict-header">
        <div className="section-label">CROP YIELD PREDICTION</div>

        <h1>
          Predict your crop
          <span>yield.</span>
        </h1>

        <p>
          Enter agricultural and environmental information to estimate crop
          yield using our machine learning model.
        </p>
      </section>

      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

      <section className="prediction-container">
        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}

        <form className="prediction-form" onSubmit={handleSubmit}>
          {/* ================================= */}
          {/* CROP INFORMATION */}
          {/* ================================= */}

          <div className="form-section">
            <div className="form-section-title">
              <div className="form-icon">🌱</div>

              <div>
                <h2>Crop Information</h2>

                <p>Tell us about the crop and growing season.</p>
              </div>
            </div>

            <div className="form-grid">
              {/* YEAR */}

              <div className="input-group">
                <label>Year</label>

                <input
                  type="number"
                  name="Year"
                  value={formData.Year}
                  min="2000"
                  max="2020"
                  onChange={handleChange}
                  required
                />

                <small>Historical dataset range: 2000–2020</small>
              </div>

              {/* STATE */}

              <div className="input-group">
                <label>State / UT</label>

                <select
                  name="State"
                  value={formData.State}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select state / UT</option>

                  <option value="Andhra Pradesh">Andhra Pradesh</option>

                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>

                  <option value="Assam">Assam</option>

                  <option value="Bihar">Bihar</option>

                  <option value="Chhattisgarh">Chhattisgarh</option>

                  <option value="Delhi">Delhi</option>

                  <option value="Goa">Goa</option>

                  <option value="Gujarat">Gujarat</option>

                  <option value="Haryana">Haryana</option>

                  <option value="Himachal Pradesh">Himachal Pradesh</option>

                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>

                  <option value="Jharkhand">Jharkhand</option>

                  <option value="Karnataka">Karnataka</option>

                  <option value="Kerala">Kerala</option>

                  <option value="Madhya Pradesh">Madhya Pradesh</option>

                  <option value="Maharashtra">Maharashtra</option>

                  <option value="Manipur">Manipur</option>

                  <option value="Meghalaya">Meghalaya</option>

                  <option value="Mizoram">Mizoram</option>

                  <option value="Nagaland">Nagaland</option>

                  <option value="Odisha">Odisha</option>

                  <option value="Puducherry">Puducherry</option>

                  <option value="Punjab">Punjab</option>

                  <option value="Rajasthan">Rajasthan</option>

                  <option value="Sikkim">Sikkim</option>

                  <option value="Tamil Nadu">Tamil Nadu</option>

                  <option value="Telangana">Telangana</option>

                  <option value="Tripura">Tripura</option>

                  <option value="Uttar Pradesh">Uttar Pradesh</option>

                  <option value="Uttarakhand">Uttarakhand</option>

                  <option value="West Bengal">West Bengal</option>
                </select>

                <small>Select the agricultural region.</small>
              </div>

              {/* CROP */}

              <div className="input-group">
                <label>Crop</label>

                <select
                  name="Crop"
                  value={formData.Crop}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select crop</option>

                  <option value="Rice">Rice</option>

                  <option value="Wheat">Wheat</option>

                  <option value="Maize">Maize</option>

                  <option value="Potato">Potato</option>

                  <option value="Sugarcane">Sugarcane</option>

                  <option value="Banana">Banana</option>

                  <option value="Coconut">Coconut</option>

                  <option value="Jute">Jute</option>

                  <option value="Lentil">Lentil</option>

                  <option value="Peas & beans">Peas & beans</option>
                </select>

                <small>Choose the crop you want to predict.</small>
              </div>

              {/* SEASON */}

              <div className="input-group">
                <label>Season</label>

                <select
                  name="Season"
                  value={formData.Season}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select season</option>

                  <option value="Kharif">Kharif</option>

                  <option value="Rabi">Rabi</option>

                  <option value="Whole Year">Whole Year</option>

                  <option value="Summer">Summer</option>

                  <option value="Winter">Winter</option>

                  <option value="Autumn">Autumn</option>
                </select>

                <small>Select the growing season.</small>
              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* AGRICULTURAL INFORMATION */}
          {/* ================================= */}

          <div className="form-section">
            <div className="form-section-title">
              <div className="form-icon">🌾</div>

              <div>
                <h2>Agricultural Information</h2>

                <p>Enter environmental and farming measurements.</p>
              </div>
            </div>

            <div className="form-grid">
              {/* AREA */}

              <div className="input-group">
                <label>Cultivated Area</label>

                <div className="input-unit-wrapper">
                  <input
                    type="number"
                    name="Area"
                    value={formData.Area}
                    onChange={handleChange}
                    min="0"
                    step="any"
                    placeholder="e.g. 5000"
                    required
                  />

                  <span className="input-unit">hectares</span>
                </div>

                <small>Total cultivated agricultural area.</small>
              </div>

              {/* RAINFALL */}

              <div className="input-group">
                <label>Annual Rainfall</label>

                <div className="input-unit-wrapper">
                  <input
                    type="number"
                    name="Annual_Rainfall"
                    value={formData.Annual_Rainfall}
                    onChange={handleChange}
                    min="0"
                    step="any"
                    placeholder="e.g. 1200"
                    required
                  />

                  <span className="input-unit">mm</span>
                </div>

                <small>Average annual rainfall.</small>
              </div>

              {/* FERTILIZER */}

              <div className="input-group">
                <label>Fertilizer Usage</label>

                <div className="input-unit-wrapper">
                  <input
                    type="number"
                    name="Fertilizer"
                    value={formData.Fertilizer}
                    onChange={handleChange}
                    min="0"
                    step="any"
                    placeholder="e.g. 50000"
                    required
                  />

                  <span className="input-unit">tonnes</span>
                </div>

                <small>Total fertilizer used for cultivation.</small>
              </div>

              {/* PESTICIDE */}

              <div className="input-group">
                <label>Pesticide Usage</label>

                <div className="input-unit-wrapper">
                  <input
                    type="number"
                    name="Pesticide"
                    value={formData.Pesticide}
                    onChange={handleChange}
                    min="0"
                    step="any"
                    placeholder="e.g. 200"
                    required
                  />

                  <span className="input-unit">tonnes</span>
                </div>

                <small>Total pesticide used for cultivation.</small>
              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* MODEL INFORMATION */}
          {/* ================================= */}

          <div className="model-info-card">
            <div className="model-info-icon">🤖</div>

            <div>
              <strong>Powered by Machine Learning</strong>

              <p>
                Your inputs are processed by a Random Forest regression model
                trained on historical crop data.
              </p>
            </div>
          </div>

          {/* ================================= */}
          {/* ACTION BUTTONS */}
          {/* ================================= */}

          <div className="form-actions">
            <button
              type="button"
              className="reset-button"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </button>

            <button type="submit" className="predict-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Analyzing...
                </>
              ) : (
                <>Predict Crop Yield →</>
              )}
            </button>
          </div>

          {/* ================================= */}
          {/* ERROR */}
          {/* ================================= */}

          {error && (
            <div className="error-message">
              <span>⚠</span>

              {error}
            </div>
          )}
        </form>

        {/* ================================= */}
        {/* RESULT */}
        {/* ================================= */}

        {prediction !== null && (
          <div className="result-card">
            <div className="result-label">PREDICTION RESULT</div>

            <div className="result-icon">🌾</div>

            <h2>Estimated Crop Yield</h2>

            <div className="result-value">{prediction.toFixed(2)}</div>

            <div className="result-unit">metric tons / hectare</div>

            <p>
              Estimated yield based on the agricultural information provided.
            </p>

            {/* RESULT SUMMARY */}

            <div className="result-summary">
              <div>
                <span>Crop</span>

                <strong>{formData.Crop}</strong>
              </div>

              <div>
                <span>State</span>

                <strong>{formData.State}</strong>
              </div>

              <div>
                <span>Season</span>

                <strong>{formData.Season}</strong>
              </div>

              <div>
                <span>Year</span>

                <strong>{formData.Year}</strong>
              </div>
            </div>

            {/* INPUT SUMMARY */}

            <div className="result-input-summary">
              <div>
                <span>Area</span>

                <strong>{Number(formData.Area).toLocaleString()} ha</strong>
              </div>

              <div>
                <span>Rainfall</span>

                <strong>
                  {Number(formData.Annual_Rainfall).toLocaleString()} mm
                </strong>
              </div>

              <div>
                <span>Fertilizer</span>

                <strong>
                  {Number(formData.Fertilizer).toLocaleString()} tonnes
                </strong>
              </div>

              <div>
                <span>Pesticide</span>

                <strong>
                  {Number(formData.Pesticide).toLocaleString()} tonnes
                </strong>
              </div>
            </div>

            <div className="result-note">
              <span>✓</span>
              Prediction generated successfully
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Predict;
