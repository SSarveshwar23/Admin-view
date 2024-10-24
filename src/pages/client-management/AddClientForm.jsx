import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Notyf } from "notyf"; // Import Notyf for notifications
import "notyf/notyf.min.css"; // Notyf styles
import Confetti from "react-confetti"; // Import React Confetti for Done celebration

function AddClientForm({ handleSubmit, handleClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDone, setIsDone] = useState(false); // To trigger confetti on the final step
  const [formData, setFormData] = useState({
    companyName: "",
    registeredAddress: "",
    companyID: "",
    gstNumber: "",
    industry: "",
    otherIndustry: "",
    companyEmail: "",
    phoneNumber: "",
    countryCode: "",
    rep1Name: "",
    rep1Email: "",
    rep1Phone: "",
    rep2Name: "",
    rep2Email: "",
    rep2Phone: "",
  });

  const notyf = new Notyf({
    duration: 3000, // 3 seconds
    position: { x: "right", y: "top" }, // Position of the notification
    ripple: true, // Ripple effect
  });

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSaveAndNext = (e) => {
    e.preventDefault();
    if (currentStep < 4) {
      nextStep(); // Go to next step
    } else {
      // Final submit when on the last step
      handleSubmit(formData);

      // Show Notyf success message
      notyf.success("Client successfully added!");

      // Trigger confetti and close modal
      setIsDone(true);
      setTimeout(() => {
        handleClose(); // Close the modal after success
      }, 4000); // Close the modal after 4 seconds to allow confetti to show
    }
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        {isDone && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}{" "}
        {/* Confetti */}
        <div className="modal-header bg-dark text-white">
          <h5 className="modal-title">Add New Client</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={handleClose}
          ></button>
        </div>
        <div className="modal-body">
          <div className="nav-wizards-container">
            <nav className="nav nav-wizards-1 mb-2">
              <div className="nav-item col">
                <a
                  className={`nav-link ${currentStep >= 1 ? "completed" : ""}`}
                >
                  <div className="nav-no">1</div>
                  <div className="nav-text">Company Details</div>
                </a>
              </div>
              <div className="nav-item col">
                <a
                  className={`nav-link ${currentStep === 2 ? "active" : ""} ${
                    currentStep > 2 ? "completed" : ""
                  }`}
                >
                  <div className="nav-no">2</div>
                  <div className="nav-text">Client Representative 1</div>
                </a>
              </div>
              <div className="nav-item col">
                <a
                  className={`nav-link ${currentStep === 3 ? "active" : ""} ${
                    currentStep > 3 ? "completed" : ""
                  }`}
                >
                  <div className="nav-no">3</div>
                  <div className="nav-text">Client Representative 2</div>
                </a>
              </div>
              <div className="nav-item col">
                <a className={`nav-link ${currentStep === 4 ? "active" : ""}`}>
                  <div className="nav-no">4</div>
                  <div className="nav-text">Done</div>
                </a>
              </div>
            </nav>
          </div>

          <form onSubmit={handleSaveAndNext}>
            {currentStep === 1 && (
              <div>
                {/* Company Details */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="companyName" className="form-label">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="registeredAddress" className="form-label">
                      Registered Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="registeredAddress"
                      name="registeredAddress"
                      value={formData.registeredAddress}
                      onChange={(e) =>
                        handleInputChange("registeredAddress", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="companyID" className="form-label">
                      Company ID Number / Registration Number
                    </label>
                    <input
                      className="form-control"
                      id="companyID"
                      name="companyID"
                      value={formData.companyID}
                      onChange={(e) =>
                        handleInputChange("companyID", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="gstNumber" className="form-label">
                      GST Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="gstNumber"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={(e) =>
                        handleInputChange("gstNumber", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="industry" className="form-label">
                      Industry
                    </label>
                    <select
                      className="form-select"
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={(e) =>
                        handleInputChange("industry", e.target.value)
                      }
                      required
                    >
                      <option value="">Select your industry</option>

                      {/* Financial Services */}
                      <optgroup label="Financial Services">
                        <option value="Finance">Finance</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Banking">Banking</option>
                        <option value="Investment">Investment</option>
                      </optgroup>

                      {/* Healthcare */}
                      <optgroup label="Healthcare">
                        <option value="Healthcare">Healthcare</option>
                        <option value="Pharmaceuticals">Pharmaceuticals</option>
                        <option value="Medical Devices">Medical Devices</option>
                        <option value="Biotechnology">Biotechnology</option>
                      </optgroup>

                      {/* Technology */}
                      <optgroup label="Technology">
                        <option value="Technology">Technology</option>
                        <option value="Software">Software</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Telecommunications">
                          Telecommunications
                        </option>
                        <option value="IT Services">IT Services</option>
                      </optgroup>

                      {/* Retail and Consumer Services */}
                      <optgroup label="Retail and Consumer Services">
                        <option value="Retail">Retail</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Food and Beverage">
                          Food and Beverage
                        </option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Travel">Travel</option>
                        <option value="Entertainment">Entertainment</option>
                      </optgroup>

                      {/* Manufacturing and Industry */}
                      <optgroup label="Manufacturing and Industry">
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Aerospace">Aerospace</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Energy">Energy</option>
                        <option value="Construction">Construction</option>
                        <option value="Transportation">Transportation</option>
                      </optgroup>

                      {/* Government and Non-Profit */}
                      <optgroup label="Government and Non-Profit">
                        <option value="Government">Government</option>
                        <option value="Non-Profit">Non-Profit</option>
                        <option value="Education">Education</option>
                        <option value="Military">Military</option>
                      </optgroup>

                      <option value="Other">Other</option>
                    </select>

                    {formData.industry === "Other" && (
                      <div className="mt-2">
                        <label htmlFor="otherIndustry" className="form-label">
                          Please specify
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="otherIndustry"
                          name="otherIndustry"
                          value={formData.otherIndustry}
                          onChange={(e) =>
                            handleInputChange("otherIndustry", e.target.value)
                          }
                          placeholder="Enter your industry"
                          required
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="companyEmail" className="form-label">
                      Company Email
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="companyEmail"
                      name="companyEmail"
                      value={formData.companyEmail}
                      onChange={(e) =>
                        handleInputChange("companyEmail", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <PhoneInput
                      country={"us"} // Default country
                      value={formData.phoneNumber}
                      onChange={(phone) =>
                        handleInputChange("phoneNumber", phone)
                      }
                      inputStyle={{ width: "100%" }} // Match the Bootstrap input style
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                {/* Client Representative 1 */}
                <h5>Client Representative 1</h5>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="rep1Name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="rep1Name"
                      name="rep1Name"
                      value={formData.rep1Name}
                      onChange={(e) =>
                        handleInputChange("rep1Name", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="rep1Email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="rep1Email"
                      name="rep1Email"
                      value={formData.rep1Email}
                      onChange={(e) =>
                        handleInputChange("rep1Email", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="rep1Phone" className="form-label">
                      Phone Number
                    </label>
                    <PhoneInput
                      country={"us"} // Default country
                      value={formData.rep1Phone}
                      onChange={(phone) =>
                        handleInputChange("rep1Phone", phone)
                      }
                      inputStyle={{ width: "100%" }} // Match the Bootstrap input style
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                {/* Client Representative 2 */}
                <h5>Client Representative 2</h5>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="rep2Name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="rep2Name"
                      name="rep2Name"
                      value={formData.rep2Name}
                      onChange={(e) =>
                        handleInputChange("rep2Name", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="rep2Email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="rep2Email"
                      name="rep2Email"
                      value={formData.rep2Email}
                      onChange={(e) =>
                        handleInputChange("rep2Email", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="rep2Phone" className="form-label">
                      Phone Number
                    </label>
                    <PhoneInput
                      country={"us"} // Default country
                      value={formData.rep2Phone}
                      onChange={(phone) =>
                        handleInputChange("rep2Phone", phone)
                      }
                      inputStyle={{ width: "100%" }} // Match the Bootstrap input style
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={prevStep}
                >
                  Back
                </button>
              )}
              <button type="submit" className="btn btn-primary float-end">
                {currentStep < 4 ? "Save and Next" : "Finish"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddClientForm;
