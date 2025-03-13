const dscc = require('@google/dscc');
const d3 = require('d3');

function drawViz(data) {
  const container = document.getElementById("vizContainer");
  container.innerHTML = ""; // Clear previous visualizations

  const width = 500;
  const height = 400;
  
  const svg = d3.select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  
  const metrics = data.tables.DEFAULT.map(d => {
    return {
      label: d.dimension,
      value: d.metric[0],
    };
  });
  
  const total = metrics[0].value;
  const funnelHeight = height / metrics.length;
  
  const funnel = svg.selectAll(".funnel-section")
    .data(metrics)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 20)
    .attr("y", (d, i) => i * funnelHeight)
    .attr("width", (d) => (d.value / total) * width)
    .attr("height", funnelHeight - 10)
    .attr("fill", (d, i) => d3.schemeCategory10[i]);
  
  svg.selectAll(".label")
    .data(metrics)
    .enter()
    .append("text")
    .attr("x", 20)
    .attr("y", (d, i) => (i * funnelHeight) + funnelHeight / 2)
    .attr("fill", "#fff")
    .text(d => `${d.label}: ${d.value}`);
}

dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
