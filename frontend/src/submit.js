import { useStore } from "./store";

export const SubmitButton = () => {

  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges
  }));

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nodes,
          edges
        })
      });

      const result = await response.json();

      alert(
        `Pipeline Analysis:\n\n` +
        `Nodes: ${result.num_nodes}\n` +
        `Edges: ${result.num_edges}\n` +
        `Is DAG: ${result.is_dag ? "Yes" : "No"}`
      );

    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert("Submission failed. Please check backend connection.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#1C2536",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Submit
      </button>
    </div>
  );
};
