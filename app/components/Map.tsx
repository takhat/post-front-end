"use client";
import React, { useState, useEffect, useRef } from "react";
import { geoPath, geoAlbersUsa } from "d3-geo";
import { FeatureCollection, MultiLineString, Geometry } from "geojson";
import * as d3 from "d3";
import { useRouter } from "next/navigation";
import colors from "@/styles/colors";

const projection = geoAlbersUsa();
const path = geoPath(projection);

interface MapProps {
  data: {
    land: FeatureCollection<Geometry>;
    interiors: MultiLineString;
  };
  availableStates: { [key: string]: string };
}

export const Map = ({ data, availableStates }: MapProps) => {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedState, setSelectedState] = useState<string>("");
  const projection = geoAlbersUsa();
  const pathGenerator = geoPath(projection);

  // calculate viewBox
  const bounds = pathGenerator.bounds(data.land);
  const padding = 20;
  const dx = bounds[1][0] - bounds[0][0] + padding;
  const dy = bounds[1][1] - bounds[0][1] + padding;
  const x = bounds[0][0] - padding / 2;
  const y = bounds[0][1] - padding / 2;
  const viewBox = `${x.toFixed(2)} ${y.toFixed(2)} ${dx.toFixed(2)} ${dy.toFixed(2)}`;

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Create svg element
    const svg = d3.select(svgRef.current);

    // Create tooltip background (rect) and text
    const tooltipBg = svg
      .append("rect")
      .attr("class", "tooltip-bg")
      .attr("fill", "rgba(255, 255, 255, 0.8)") // semi-transparent white background
      .attr("stroke", "black") // border color
      .style("visibility", "hidden");

    const tooltip = svg
      .append("text")
      .attr("class", "tooltip")
      .attr("fill", "black")
      .style("pointer-events", "none")
      .style("visibility", "hidden");

    // Draw map
    svg
      .selectAll(".land")
      .data(data.land.features)
      .join("path")
      .attr("class", "land")
      .attr("d", (feature) => path(feature)!)
      .attr("fill", (feature) =>
        availableStates[feature.properties?.name]
          ? colors.stateWithData
          : colors.defaultStateFill
      )
      .attr("stroke", colors.stateBorder)
      .attr("stroke-width", "1")
      .on("mouseover", (event, feature) => {
        const [mx, my] = d3.pointer(event);
        tooltip
          .attr("x", mx + 20)
          .attr("y", my + 20)
          .text(feature.properties?.name)
          .style("visibility", "visible");

        // Get text bounding box and adjust the background rect
        const tooltipNode = tooltip.node();
        if (tooltipNode) {
          const bbox = tooltipNode.getBBox();
          tooltipBg
            .attr("x", bbox.x - 5)
            .attr("y", bbox.y - 5)
            .attr("width", bbox.width + 10)
            .attr("height", bbox.height + 5)
            .style("visibility", "visible");
        }

        if (availableStates[feature.properties?.name]) {
          d3.select(event.target).attr("fill", colors.hoverState);
        }
      })
      .on("mouseout", (event, feature) => {
        tooltip.style("visibility", "hidden");
        tooltipBg.style("visibility", "hidden");
        if (availableStates[feature.properties?.name]) {
          d3.select(event.target).attr("fill", colors.stateWithData);
        }
      })
      .on("mousemove", (event) => {
        const [mx, my] = d3.pointer(event);

        // Update text position
        tooltip.attr("x", mx + 20).attr("y", my + 20);

        // Get updated text bounding box and adjust the background rect
        const tooltipNode = tooltip.node();
        if (tooltipNode) {
          const bbox = tooltipNode.getBBox();
          tooltipBg
            .attr("x", bbox.x - 5)
            .attr("y", bbox.y - 5)
            .attr("width", bbox.width + 10)
            .attr("height", bbox.height + 10);
        }
      })
      .on("click", (event, feature) => {
        setSelectedState(feature.properties?.name);
      })
      .transition();

    svg
      .selectAll(".interiors")
      .data([data.interiors])
      .join("path")
      .attr("class", "interiors")
      .attr("d", path)
      .attr("fill", "none");

    return () => {
      tooltip.remove();
      tooltipBg.remove();
    };
  }, [data, selectedState, availableStates]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (svgRef.current && !svgRef.current.contains(event.target as Node)) {
        const clickedElement = event.target as HTMLElement;
        // Exclude state button from triggering state reset
        if (!clickedElement.closest(".button")) {
          setSelectedState("");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigate = () => {
    router.push("/states/" + availableStates[selectedState]);
  };

  return (
    <div>
      <svg
        className="h-full w-full cursor-pointer"
        ref={svgRef}
        viewBox={viewBox}
      />
      {selectedState in availableStates && (
        <div
          style={{
            position: "absolute",
            top: "25px",
            left: "30px",
            background: "#fff",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
          }}
        >
          <p>View police officer employment history data for {selectedState}</p>
          <button
            type="button"
            className="button"
            onClick={handleNavigate}
            style={{
              backgroundColor: "#d1d5db",
              color: "white",
              border: "none",
              padding: "5px 10px",
            }}
          >
            Go to {selectedState}
          </button>
        </div>
      )}
    </div>
  );
};
export default Map;
