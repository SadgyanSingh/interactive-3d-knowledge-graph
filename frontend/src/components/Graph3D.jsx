import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import ForceGraph3D from "react-force-graph-3d";

const Graph3D = ({ data, searchTerm, onNodeSelect }) => {
  const fgRef = useRef();
  const [hoverNode, setHoverNode] = useState(null);
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());

  const handleNodeClick = (node) => {
  if (!fgRef.current) return;

  onNodeSelect(node);

  fgRef.current.cameraPosition(
    { x: node.x, y: node.y, z: node.z + 120 },
    node,
    1500
  );
};


  useEffect(() => {
    if (!searchTerm || !fgRef.current) return;

    const node = data.nodes.find((n) =>
      n.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (node && node.x !== undefined) {
      const distance = 80;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition(
        {
          x: node.x * distRatio,
          y: node.y * distRatio,
          z: node.z * distRatio,
        },
        node,
        2000,
      );
    }
  }, [searchTerm, data]);

  useEffect(() => {
    if (!fgRef.current) return;

    const timeout = setTimeout(() => {
      fgRef.current.cameraPosition(
        { x: 150, y: 100, z: 200 },
        { x: 0, y: 0, z: 0 },
        3000,
      );
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
  if (!fgRef.current) return;
  const scene = fgRef.current.scene();

  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);
}, []);


  return (
    <div style={{ height: "100vh", background: "#0f172a" }}>
      <ForceGraph3D
        rendererConfig={{ antialias: true }}
        backgroundColor="#0f172a"
        ref={fgRef}
        graphData={data}
        nodeColor={(node) => {
          if (
            searchTerm &&
            node.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
            return "#ff0000";

          if (hoverNode && node.id === hoverNode.id) return "#ffffff";
          if (highlightNodes.has(node)) return "#facc15";

          if (node.type === "Skill") return "#3b82f6";
          if (node.type === "Project") return "#10b981";
          if (node.type === "Certification") return "#f59e0b";

          return "#94a3b8";
        }}
        nodeLabel={(node) => `${node.name} (${node.type})`}
        nodeVal={(node) => node.weight || 4}
        linkColor={(link) =>
          highlightLinks.has(link) ? "#ffffff" : "rgba(255,255,255,0.2)"
        }
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.002}
        nodeThreeObject={(node) => {
          const size = node.weight ? node.weight * 1.2 : 6;

          let color = "#94a3b8";
          if (node.type === "Skill") color = "#3b82f6";
          if (node.type === "Project") color = "#10b981";
          if (node.type === "Certification") color = "#f59e0b";

          const group = new THREE.Group();

          // 🌟 Inner solid sphere
          const innerGeometry = new THREE.SphereGeometry(size, 32, 32);
          const innerMaterial = new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.5,
          });
          const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
          group.add(innerSphere);

          // ✨ Glow layer (additive blending)
          const glowGeometry = new THREE.SphereGeometry(size * 1.6, 32, 32);
          const glowMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.35,
            blending: THREE.AdditiveBlending,
          });
          const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
          group.add(glowSphere);

          return group;
        }}
        onNodeHover={(node) => {
          setHoverNode(node);

          const newHighlightNodes = new Set();
          const newHighlightLinks = new Set();

          if (node) {
            newHighlightNodes.add(node);

            data.links.forEach((link) => {
              const sourceId =
                typeof link.source === "object" ? link.source.id : link.source;

              const targetId =
                typeof link.target === "object" ? link.target.id : link.target;

              if (sourceId === node.id || targetId === node.id) {
                newHighlightLinks.add(link);

                const sourceNode =
                  typeof link.source === "object"
                    ? link.source
                    : data.nodes.find((n) => n.id === link.source);

                const targetNode =
                  typeof link.target === "object"
                    ? link.target
                    : data.nodes.find((n) => n.id === link.target);

                if (sourceNode) newHighlightNodes.add(sourceNode);
                if (targetNode) newHighlightNodes.add(targetNode);
              }
            });
          }

          setHighlightNodes(newHighlightNodes);
          setHighlightLinks(newHighlightLinks);
        }}
        onNodeClick={handleNodeClick}
      />
    </div>
  );
};
export default Graph3D;
