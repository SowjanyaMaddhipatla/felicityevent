const AdminPasswordRequests = () => {
  return (
    <div style={styles.container}>
      <h1>Password Reset Requests</h1>
      <p>No password reset requests at the moment.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "900px",
    margin: "auto",
  },
};

export default AdminPasswordRequests;