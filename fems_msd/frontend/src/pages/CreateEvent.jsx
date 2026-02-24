// import React, { useState } from "react";
// import axios from "axios";
// import "./CreateEvent.css";

// const CreateEvent = () => {
//   const [eventData, setEventData] = useState({
//     name: "",
//     description: "",
//     type: "normal",
//     eligibility: "",
//     registrationDeadline: "",
//     startDate: "",
//     endDate: "",
//     registrationLimit: "",
//     registrationFee: "",
//     tags: "",
//   });

//   const handleChange = (e) => {
//     setEventData({ ...eventData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (status) => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/events",
//         { ...eventData, status },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       alert(`Event ${status} successfully`);
//     } catch (err) {
//       alert("Error creating event");
//     }
//   };

//   return (
//     <div className="create-container">
//       <h1 className="page-title">Create Event</h1>

//       <div className="section-card">
//         <h2 className="section-title">Event Details</h2>

//         {/* Event Name */}
//         <div className="form-group">
//           <label>Event Name</label>
//           <input
//             type="text"
//             name="name"
//             value={eventData.name}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Description */}
//         <div className="form-group">
//           <label>Event Description</label>
//           <textarea
//             name="description"
//             value={eventData.description}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Event Type */}
//         <div className="form-group">
//           <label>Event Type</label>
//           <select
//             name="type"
//             value={eventData.type}
//             onChange={handleChange}
//           >
//             <option value="normal">Normal Event</option>
//             <option value="merchandise">Merchandise Event</option>
//           </select>
//         </div>

//         {/* Eligibility */}
//         <div className="form-group">
//           <label>Eligibility</label>
//           <input
//             type="text"
//             name="eligibility"
//             value={eventData.eligibility}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Dates */}
//         <div className="date-grid">
//           <div className="form-group">
//             <label>Registration Deadline</label>
//             <input
//               type="datetime-local"
//               name="registrationDeadline"
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label>Event Start Date & Time</label>
//             <input
//               type="datetime-local"
//               name="startDate"
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label>Event End Date & Time</label>
//             <input
//               type="datetime-local"
//               name="endDate"
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Limits & Fee */}
//         <div className="two-column">
//           <div className="form-group">
//             <label>Registration Limit</label>
//             <input
//               type="number"
//               name="registrationLimit"
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label>Registration Fee (₹)</label>
//             <input
//               type="number"
//               name="registrationFee"
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Tags */}
//         <div className="form-group">
//           <label>Event Tags (comma separated)</label>
//           <input
//             type="text"
//             name="tags"
//             value={eventData.tags}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Buttons */}
//         <div className="button-row">
//           <button
//             className="draft-btn"
//             onClick={() => handleSubmit("draft")}
//           >
//             Save Draft
//           </button>

//           <button
//             className="publish-btn"
//             onClick={() => handleSubmit("published")}
//           >
//             Publish Event
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateEvent;



import React, { useState } from "react";
import axios from "axios";
import "./CreateEvent.css";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    type: "normal",
    eligibility: "",
    registrationDeadline: "",
    startDate: "",
    endDate: "",
    registrationLimit: "",
    registrationFee: "",
    tags: "",
  });

  const [customFields, setCustomFields] = useState([]);
  const [merchandiseItems, setMerchandiseItems] = useState([]);
  const [purchaseLimit, setPurchaseLimit] = useState(1);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  /* ================= NORMAL EVENT FORM BUILDER ================= */

  const addField = () => {
    setCustomFields([
      ...customFields,
      {
        id: Date.now(),
        label: "",
        type: "text",
        required: false,
        options: "",
      },
    ]);
  };

  const updateField = (id, key, value) => {
    setCustomFields((fields) =>
      fields.map((f) => (f.id === id ? { ...f, [key]: value } : f))
    );
  };

  const deleteField = (id) => {
    setCustomFields(customFields.filter((f) => f.id !== id));
  };

  /* ================= MERCHANDISE ================= */

  const addItem = () => {
    setMerchandiseItems([
      ...merchandiseItems,
      { name: "", sizes: "", colors: "", stock: 0 },
    ]);
  };

  const updateItem = (index, key, value) => {
    const updated = [...merchandiseItems];
    updated[index][key] = value;
    setMerchandiseItems(updated);
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (status) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/events`,
        {
          ...eventData,
          status,
          tags: eventData.tags.split(",").map((t) => t.trim()),
          customFields: eventData.type === "normal" ? customFields : [],
          merchandiseConfig:
            eventData.type === "merchandise"
              ? {
                  items: merchandiseItems,
                  purchaseLimit: Number(purchaseLimit),
                }
              : null,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(`Event ${status} successfully`);
    } catch (err) {
      console.log(err.response);
      alert("Error creating event");
    }
  };

  return (
    <div className="create-container">
      <h1 className="page-title">Create Event</h1>

      <div className="section-card">
        <h2 className="section-title">Event Attributes</h2>

        {/* Event Name */}
        <div className="form-group">
          <label>Event Name</label>
          <input
            name="name"
            value={eventData.name}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Event Description</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
          />
        </div>

        {/* Event Type */}
        <div className="form-group">
          <label>Event Type</label>
          <select
            name="type"
            value={eventData.type}
            onChange={handleChange}
          >
            <option value="normal">Normal Event</option>
            <option value="merchandise">Merchandise Event</option>
          </select>
        </div>

        {/* Eligibility */}
        <div className="form-group">
          <label>Eligibility</label>
          <input
            name="eligibility"
            value={eventData.eligibility}
            onChange={handleChange}
          />
        </div>

        {/* Dates */}
        <div className="date-grid">
          <div className="form-group">
            <label>Registration Deadline</label>
            <input
              type="datetime-local"
              name="registrationDeadline"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Event Start Date & Time</label>
            <input
              type="datetime-local"
              name="startDate"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Event End Date & Time</label>
            <input
              type="datetime-local"
              name="endDate"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Limit & Fee */}
        <div className="two-column">
          <div className="form-group">
            <label>Registration Limit</label>
            <input
              type="number"
              name="registrationLimit"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Registration Fee</label>
            <input
              type="number"
              name="registrationFee"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="form-group">
          <label>Event Tags (comma separated)</label>
          <input
            name="tags"
            value={eventData.tags}
            onChange={handleChange}
          />
        </div>

        {/* ================= NORMAL EVENT ================= */}
        {eventData.type === "normal" && (
          <div className="form-section">
            <h3>Custom Registration Form</h3>

            <button className="add-btn" onClick={addField}>
              + Add Field
            </button>

            {customFields.map((field) => (
              <div key={field.id} className="form-builder-card">
                <div className="form-group">
                  <label>Field Label</label>
                  <input
                    value={field.label}
                    onChange={(e) =>
                      updateField(field.id, "label", e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Field Type</label>
                  <select
                    value={field.type}
                    onChange={(e) =>
                      updateField(field.id, "type", e.target.value)
                    }
                  >
                    <option value="text">Text</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="file">File Upload</option>
                  </select>
                </div>

                {field.type === "dropdown" && (
                  <div className="form-group">
                    <label>Dropdown Options (comma separated)</label>
                    <input
                      value={field.options}
                      onChange={(e) =>
                        updateField(field.id, "options", e.target.value)
                      }
                    />
                  </div>
                )}

                <div className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) =>
                      updateField(field.id, "required", e.target.checked)
                    }
                  />
                  <span>Required</span>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteField(field.id)}
                >
                  Delete Field
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ================= MERCHANDISE EVENT ================= */}
        {eventData.type === "merchandise" && (
          <div className="form-section">
            <h3>Merchandise Configuration</h3>

            <button className="add-btn" onClick={addItem}>
              + Add Item
            </button>

            {merchandiseItems.map((item, index) => (
              <div key={index} className="form-builder-card">
                <div className="form-group">
                  <label>Item Name</label>
                  <input
                    onChange={(e) =>
                      updateItem(index, "name", e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Available Sizes (S,M,L)</label>
                  <input
                    onChange={(e) =>
                      updateItem(index, "sizes", e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Available Colors</label>
                  <input
                    onChange={(e) =>
                      updateItem(index, "colors", e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    onChange={(e) =>
                      updateItem(index, "stock", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <div className="form-group">
              <label>Purchase Limit Per Participant</label>
              <input
                type="number"
                value={purchaseLimit}
                onChange={(e) => setPurchaseLimit(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="button-row">
          <button
            className="draft-btn"
            onClick={() => handleSubmit("draft")}
          >
            Save Draft
          </button>
          <button
            className="publish-btn"
            onClick={() => handleSubmit("published")}
          >
            Publish Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;