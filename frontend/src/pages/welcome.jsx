// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Welcome = () => {
//   const navigate = useNavigate();

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h1>Welcome to EventHub 🎉</h1>
//       <p>Your campus event management platform</p>

//       <div style={{ marginTop: "30px" }}>
//         <button onClick={() => navigate("/login")} style={{ marginRight: "10px" }}>
//           Login
//         </button>

//         <button onClick={() => navigate("/register")}>
//           Register
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Welcome;



import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎉 EventHub</h1>
        <p style={styles.subtitle}>
          Discover. Register. Organize.
          <br />
          Your Campus Event Platform.
        </p>

        <div style={styles.buttonContainer}>
          <button
            style={styles.primaryButton}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "white",
    padding: "50px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    width: "400px",
  },
  title: {
    fontSize: "36px",
    marginBottom: "15px",
    color: "#333",
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "30px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  primaryButton: {
    padding: "12px 25px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#667eea",
    color: "white",
    transition: "0.3s",
  },
  secondaryButton: {
    padding: "12px 25px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "2px solid #667eea",
    cursor: "pointer",
    backgroundColor: "white",
    color: "#667eea",
    transition: "0.3s",
  },
};

export default Welcome;

