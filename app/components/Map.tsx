"use client";
import React, { useState, useEffect, useRef } from "react";
import { geoPath, geoAlbersUsa } from "d3-geo";
import { feature, mesh } from "topojson-client";
import {
  GeometryCollection,
  GeometryObject,
  Topology,
} from "topojson-specification";
import { json } from "d3";
import { FeatureCollection, MultiLineString, Geometry } from "geojson";
import * as d3 from "d3";
import { useRouter } from "next/navigation";

const jsonUrl = "/data/states.json";
interface MapProps {
  availableStates: { [key: string]: string };
}
const projection = geoAlbersUsa();
const path = geoPath(projection);

export const Map = ({ availableStates }: MapProps) => {
  const router = useRouter();

  const [data, setData] = useState<{
    land: FeatureCollection<Geometry>;
    interiors: MultiLineString;
  } | null>(null);
  const [viewBox, setViewBox] = useState<string>("0 0 960 500");
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedState, setSelectedState] = useState<string>("");

  const fetchData = async () => {
    try {
      const topology = (await json(jsonUrl)) as Topology;
      const { states } = topology.objects as {
        states: GeometryCollection<GeometryObject>;
      };

      const land = feature(topology, states) as FeatureCollection<Geometry>;
      const interiors = mesh(
        topology,
        states,
        (a, b) => a !== b
      ) as MultiLineString;

      setData({ land, interiors });

      // Calculate bounds and viewBox
      const bounds = path.bounds(land);
      const padding = 20;
      const dx = bounds[1][0] - bounds[0][0] + padding;
      const dy = bounds[1][1] - bounds[0][1] + padding;
      const x = bounds[0][0] - padding / 2;
      const y = bounds[0][1] - padding / 2;

      setViewBox(`${x} ${y} ${dx} ${dy}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        availableStates[feature.properties?.name] ? "#DAD7D7" : "white"
      )
      .attr("stroke", "black")
      .attr("stroke-width", "1px")
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
          d3.select(event.target).attr("fill", "#A7A3A3");
        }
      })
      .on("mouseout", (event, feature) => {
        tooltip.style("visibility", "hidden");
        tooltipBg.style("visibility", "hidden");
        if (availableStates[feature.properties?.name]) {
          d3.select(event.target).attr("fill", "#DAD7D7");
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
        setSelectedState(feature.properties?.name || "");
      })
      .transition();

    svg
      .selectAll(".interiors")
      .data([data.interiors])
      .join("path")
      .attr("class", "interiors")
      .attr("d", path);

    return () => {
      tooltip.remove();
      tooltipBg.remove();
    };
  }, [data, selectedState]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (svgRef.current && !svgRef.current.contains(event.target as Node)) {
        const clickedElement = event.target as HTMLElement;
        // Exclude button from triggering state reset
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
    <div style={{ marginBottom: "2rem" }}>
      <svg
        className="map"
        ref={svgRef}
        viewBox={viewBox}
        style={{ width: "100%", height: "auto", maxHeight: "70vh" }}
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
          <p>
            {" "}
            View police officer employment history data for {selectedState}
          </p>
          <button
            type="button"
            className="button"
            onClick={handleNavigate}
            style={{
              backgroundColor: "#008CBA",
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
