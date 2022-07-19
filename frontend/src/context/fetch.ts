import axios from "axios";
import { base } from "./env";

async function fetchColumns(project_id) {
  let url = base + `${project_id}/columns`;
  const res = await axios.get(url);

  return res.data;
}

async function fetchLines(project_id) {
  let url = base + `${project_id}/lines`;
  const res = await axios.get(url);

  return res.data;
}

async function fetchPoints(project_id) {
  let url = base + `${project_id}/points`;
  const res = await axios.get(url);
  return res.data;
}

async function fetchProjColGroups(project_id) {
  let url = base + `${project_id}/col-groups`;
  const res = await axios.get(url);
  return res.data.data;
}

async function fetchVoronoiPolygons(project_id, points, radius, quad_segs) {
  let url = base + `${project_id}/voronoi`;
  const res = await axios.put(url, { points, radius, quad_segs });
  return res.data.polygons;
}

export {
  fetchColumns,
  fetchLines,
  fetchVoronoiPolygons,
  fetchProjColGroups,
  fetchPoints,
};
