import { useState } from "react";
import Graph3D from "../components/Graph3D";

const sampleData = {
  nodes: [
    { id: "1", name: "JavaScript", type: "Skill", weight: 9 },
    { id: "2", name: "React", type: "Skill", weight: 8 },
    { id: "3", name: "Node.js", type: "Skill", weight: 7 },
    { id: "4", name: "MongoDB", type: "Skill", weight: 6 },
    { id: "5", name: "AI Chatbot", type: "Project", weight: 8 },
    { id: "6", name: "Portfolio", type: "Project", weight: 6 },
    { id: "7", name: "AWS Certification", type: "Certification", weight: 5 }
  ],
  links: [
    { source: "5", target: "1" },
    { source: "5", target: "2" },
    { source: "5", target: "3" },
    { source: "6", target: "2" },
    { source: "6", target: "1" },
    { source: "7", target: "4" }
  ]
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);

  const totalSkills = sampleData.nodes.filter(n => n.type === "Skill").length;
  const totalProjects = sampleData.nodes.filter(n => n.type === "Project").length;
  const totalCerts = sampleData.nodes.filter(n => n.type === "Certification").length;

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0f172a", color: "white" }}>

      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#111827",
        padding: "30px 20px",
        borderRight: "1px solid rgba(255,255,255,0.05)"
      }}>
        <h2 style={{ marginBottom: "40px" }}>Talent AI</h2>

        <p style={{ opacity: 0.7 }}>Dashboard</p>
        <p style={{ opacity: 0.7 }}>Skill Insights</p>
        <p style={{ opacity: 0.7 }}>Projects</p>
        <p style={{ opacity: 0.7 }}>Certifications</p>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, position: "relative" }}>

        {/* Top Bar */}
        <div style={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          borderBottom: "1px solid rgba(255,255,255,0.05)"
        }}>
          <h3>Corporate Skill Intelligence Dashboard</h3>

          <input
            type="text"
            placeholder="Search skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px 15px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              background: "#1f2937",
              color: "white"
            }}
          />
        </div>

        {/* KPI Cards */}
        <div style={{
          display: "flex",
          gap: "20px",
          padding: "20px 30px"
        }}>
          <div style={cardStyle}>
            <h4>Total Skills</h4>
            <h2>{totalSkills}</h2>
          </div>
          <div style={cardStyle}>
            <h4>Total Projects</h4>
            <h2>{totalProjects}</h2>
          </div>
          <div style={cardStyle}>
            <h4>Certifications</h4>
            <h2>{totalCerts}</h2>
          </div>
        </div>

        {/* Graph Section */}
        <Graph3D
          data={sampleData}
          searchTerm={searchTerm}
          onNodeSelect={setSelectedNode}
        />

        {/* Right Detail Panel */}
        {selectedNode && (
          <div style={{
            position: "absolute",
            top: "110px",
            right: "20px",
            width: "260px",
            background: "#1f2937",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
          }}>
            <h3>{selectedNode.name}</h3>
            <p>Type: {selectedNode.type}</p>
            <p>Strength: {selectedNode.weight}/10</p>
          </div>
        )}
      </div>
    </div>
  );
};

const cardStyle = {
  background: "#1f2937",
  padding: "20px",
  borderRadius: "12px",
  width: "180px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
};

export default Dashboard;
