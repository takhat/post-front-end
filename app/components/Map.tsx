"use client";

import React, { useState, useEffect, useRef } from "react";
import { geoPath, geoAlbersUsa } from "d3-geo";
import { FeatureCollection, MultiLineString, Geometry } from "geojson";
import * as d3 from "d3";
import { useRouter } from "next/navigation";
import colors from "@/styles/colors";
import { useTheme } from "next-themes";

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
  const { resolvedTheme } = useTheme();
  const themeColors = colors[resolvedTheme || "light"]; // Default to "light" if resolvedTheme is not available

  // Calculate viewBox
  const bounds = path.bounds(data.land);
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

    // Create tooltip background and text
    const tooltipBg = svg
      .append("rect")
      .attr("class", "tooltip-bg")
      .attr("fill", "rgba(255, 255, 255, 0.8)")
      .attr("stroke", "black")
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
          ? themeColors.stateWithData
          : themeColors.defaultStateFill
      )
      .attr("stroke", themeColors.stateBorder)
      .attr("stroke-width", "1")
      .on("mouseover", (event, feature) => {
        const [mx, my] = d3.pointer(event);
        tooltip
          .attr("x", mx + 20)
          .attr("y", my + 20)
          .text(feature.properties?.name)
          .style("visibility", "visible");

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
          d3.select(event.target).attr("fill", themeColors.hoverState);
        }
      })
      .on("mouseout", (event, feature) => {
        tooltip.style("visibility", "hidden");
        tooltipBg.style("visibility", "hidden");
        if (availableStates[feature.properties?.name]) {
          d3.select(event.target).attr("fill", themeColors.stateWithData);
        }
      })
      .on("mousemove", (event) => {
        const [mx, my] = d3.pointer(event);

        tooltip.attr("x", mx + 20).attr("y", my + 20);

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
        const stateName = feature.properties?.name;
        setSelectedState(selectedState === stateName ? "" : stateName);
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
  }, [data, selectedState, availableStates, themeColors]);

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
    <div className="relative">
      <svg
        className="h-full w-full cursor-pointer"
        ref={svgRef}
        viewBox={viewBox}
      />
      {selectedState in availableStates && (
        <button
          className="button text-sm border border-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-gray-100 dark:bg-slate-800  dark:bg-opacity-75 px-4 py-2 rounded-md dark:hover:bg-opacity-100"
          onClick={handleNavigate}
        >
          View Data for {selectedState}
        </button>
      )}
    </div>
  );
};

export default Map;
