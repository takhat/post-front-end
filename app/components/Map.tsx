"use client";
import React, { useState, useEffect, useRef } from "react";
import { geoPath, geoAlbersUsa } from "d3-geo";
import { feature, mesh } from "topojson-client";
import { Topology } from "topojson-specification";
import { GeometryCollection, GeometryObject } from "topojson-specification";
import { json } from "d3";
import { FeatureCollection, MultiLineString, Geometry } from "geojson";
import * as d3 from "d3";

const jsonUrl = "/data/states.json";

const projection = geoAlbersUsa();
const path = geoPath(projection);
const hoverStates = new Set([
  "Arizona",
  "California",
  "Florida",
  "Georgia",
  "Illinois",
  "Maryland",
  "Ohio",
  "Oregon",
  "South Carolina",
  "Tennessee",
  "Texas",
  "Vermont",
  "Washington",
]);

export const Map = () => {
  const [data, setData] = useState<{
    land: FeatureCollection<Geometry>;
    interiors: MultiLineString;
  } | null>(null);
  const [viewBox, setViewBox] = useState<string>("0 0 960 500");
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedState, setSelectedState] = useState<string>("");

  useEffect(() => {
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

    fetchData();
  }, []);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);

    svg
      .selectAll(".land")
      .data(data.land.features)
      .join("path")
      .attr("class", "land")
      .attr("d", (feature) => path(feature)!)
      .attr("fill", (feature) =>
        hoverStates.has(feature.properties?.name) ? "#729DC3" : "lightgray"
      )
      .attr("stroke", "black") // Outline color
      .attr("stroke-width", "1px")
      .on("mouseover", (event, feature) => {
        if (hoverStates.has(feature.properties?.name)) {
          d3.select(event.target).attr("fill", "#4777A2");
        }
      })
      .on("mouseout", (event, feature) => {
        if (hoverStates.has(feature.properties?.name)) {
          d3.select(event.target).attr("fill", "#729DC3");
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

    svg
      .selectAll(".label")
      .data(selectedState ? [selectedState] : [])
      .join("text")
      .attr("class", "label")
      .text(selectedState)
      .attr("x", 30)
      .attr("y", 25);
  }, [data, selectedState]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (svgRef.current && !svgRef.current.contains(event.target as Node)) {
        setSelectedState("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ marginBottom: "2rem" }}>
      <svg
        className="map"
        ref={svgRef}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", maxHeight: "70vh" }}
      />
    </div>
  );
};
