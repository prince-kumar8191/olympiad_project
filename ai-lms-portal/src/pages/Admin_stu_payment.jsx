import { useNavigate } from "react-router-dom";

export default function PaymentWaiting() {

  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#020617",
      color: "white",
      flexDirection: "column"
    }}>
      <h1>⏳ Waiting for Admin Approval</h1>
      <p>Your payment is under review...</p>

      {/* 🔥 GO HOME BUTTON */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          background: "#22c55e",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
          color: "white"
        }}
      >
        🏠 Go to Home
      </button>

    </div>
  );
}