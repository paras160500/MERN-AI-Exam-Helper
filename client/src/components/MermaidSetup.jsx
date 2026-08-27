// import mermaid from "mermaid";
// import { useEffect, useRef } from "react";

// mermaid.initialize({
//   startOnLoad: false,
//   theme: "default",
// });

// const cleanMermaidChart = (diagram) => {
//   if (!diagram) return "";
//   let clean = diagram.replace(/\r\n/g, "\n").trim();
//   if (!clean.startsWith("graph")) {
//     clean = `graph TD\n${clean}`;
//   }
//   return clean;
// };

// const NODE_STYLES = [
//   {
//     fill: "#E0F2FE",
//     stroke: "#0284C7",
//     color: "#0C4A6E",
//   },
//   {
//     fill: "#DCFCE7",
//     stroke: "#16A34A",
//     color: "#14532D",
//   },
//   {
//     fill: "#F3E8FF",
//     stroke: "#9333EA",
//     color: "#581C87",
//   },
//   {
//     fill: "#FEF3C7",
//     stroke: "#D97706",
//     color: "#78350F",
//   },
//   {
//     fill: "#FCE7F3",
//     stroke: "#DB2777",
//     color: "#831843",
//   },
//   {
//     fill: "#E0E7FF",
//     stroke: "#4F46E5",
//     color: "#312E81",
//   },
// ];

// const addAutoStyles = (diagram) => {
//   const lines = diagram.split("\n");

//   const nodes = [];

//   for (const line of lines) {
//     const match = line.match(/^(\w+)\[(.*?)\]$/);

//     if (match) {
//       nodes.push({
//         id: match[1],
//         label: match[2],
//       });
//     }
//   }

//   const output = [...lines];

//   nodes.forEach((node, index) => {
//     const style = NODE_STYLES[index % NODE_STYLES.length];

//     output.push(
//       `classDef node${index} fill:${style.fill},stroke:${style.stroke},color:${style.color},stroke-width:2px`,
//     );

//     output.push(`class ${node.id} node${index}`);
//   });

//   output.push("linkStyle default stroke:#64748B,stroke-width:2px");

//   return output.join("\n");
// };

// const autoFixBadNodes = (diagram) => {
//   let index = 0;
//   const used = new Map();

//   return diagram.replace(/\[(.*?)\]/g, (match, label) => {
//     // normalize the label for key
//     const key = label.trim();

//     // reuse same node if label already seen
//     if (used.has(key)) {
//       return used.get(key);
//     }
//     index++;
//     const id = `N${index}`;
//     const node = `${id}["${key}"]`;
//     used.set(key, node);
//     return node;
//   });
// };

// function MermaidSetup({ diagram }) {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (!diagram || !containerRef.current) return;
//     const renderDiagram = async () => {
//       try {
//         containerRef.current.innerHTML = "";
//         const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
//         const safeChart = addAutoStyles(cleanMermaidChart(diagram));
//         const { svg } = await mermaid.render(uniqueId, safeChart);
//         containerRef.current.innerHTML = svg;
//       } catch (error) {
//         console.log("Mermaid Render failed : ", error);
//       }
//     };
//     renderDiagram();
//   }, [diagram]);

//   return (
//     <div className="bg-white border rounded-lg p-4 overflow-x-auto">
//       <div ref={containerRef} />
//     </div>
//   );
// }

// export default MermaidSetup;

import mermaid from "mermaid";
import { useEffect, useRef } from "react";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram.replace(/\r\n/g, "\n").trim();

  if (!clean.startsWith("graph") && !clean.startsWith("flowchart")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

const NODE_COLORS = [
  {
    bg: "#DBEAFE",
    border: "#2563EB",
    text: "#1E3A8A",
  },
  {
    bg: "#DCFCE7",
    border: "#16A34A",
    text: "#14532D",
  },
  {
    bg: "#F3E8FF",
    border: "#9333EA",
    text: "#581C87",
  },
  {
    bg: "#FEF3C7",
    border: "#D97706",
    text: "#78350F",
  },
  {
    bg: "#FCE7F3",
    border: "#DB2777",
    text: "#831843",
  },
  {
    bg: "#CCFBF1",
    border: "#0D9488",
    text: "#134E4A",
  },
];

const styleMermaidNodes = (container) => {
  const nodes = container.querySelectorAll(".node");

  nodes.forEach((node, index) => {
    const color = NODE_COLORS[index % NODE_COLORS.length];

    const rect = node.querySelector("rect");
    const polygon = node.querySelector("polygon");
    const path = node.querySelector("path");

    const shape = rect || polygon || path;

    if (shape) {
      shape.style.fill = color.bg;
      shape.style.stroke = color.border;
      shape.style.strokeWidth = "2px";
    }

    const texts = node.querySelectorAll("text");

    texts.forEach((text) => {
      text.style.fill = color.text;
      text.style.fontWeight = "600";
    });
  });

  // Make arrows look nicer
  const edges = container.querySelectorAll(".edgePath path");

  edges.forEach((edge) => {
    edge.style.stroke = "#64748B";
    edge.style.strokeWidth = "2px";
  });

  // Arrow heads
  const arrowHeads = container.querySelectorAll(".arrowheadPath");

  arrowHeads.forEach((arrow) => {
    arrow.style.fill = "#64748B";
    arrow.style.stroke = "#64748B";
  });
};

function MermaidSetup({ diagram }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";

        const uniqueId = `mermaid-${Math.random()
          .toString(36)
          .substring(2, 9)}`;

        const safeChart = cleanMermaidChart(diagram);

        const { svg } = await mermaid.render(uniqueId, safeChart);

        containerRef.current.innerHTML = svg;

        // Style AFTER Mermaid has created the SVG
        styleMermaidNodes(containerRef.current);
      } catch (error) {
        console.error("Mermaid Render failed:", error);
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      <div ref={containerRef} />
    </div>
  );
}

export default MermaidSetup;
