import React, { useContext } from "react";
import { DownloadButton } from ".";
import { Button, Navbar, Popover, Divider } from "@blueprintjs/core";
import { AppContext } from "../../context";
import { useAPIResult } from "@macrostrat/ui-components";
import axios from "axios";

const import_url = "http://0.0.0.0:8000/import";
const projects_url = "http://0.0.0.0:8000/projects";

function unwrapProjectIds(res) {
  if (res.data) {
    const { data } = res;
    let ids = data.map((project) => project.project_id);
    return ids;
  } else {
    return [];
  }
}

function ProjectDropDown(props) {
  const { project_ids } = props;
  const { state, runAction } = useContext(AppContext);

  const changeProjectId = (id) => {
    runAction({ type: "change-project-id", payload: { project_id: id } });
  };

  const openImportOverlay = () => {
    runAction({ type: "import-overlay", payload: { open: true } });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "5px",
        justifyContent: "flex-start",
      }}
    >
      {project_ids.map((id) => {
        let iconName = id == state.project_id ? "tick" : null;
        return (
          <Button
            key={id}
            minimal={true}
            onClick={() => changeProjectId(id)}
            intent="primary"
            rightIcon={iconName}
          >
            Project {id}
          </Button>
        );
      })}
      <Divider />
      <Button minimal={true} onClick={openImportOverlay}>
        More...
      </Button>
    </div>
  );
}

function MapNavBar(props) {
  const {
    onSave,
    onCancel,
    enterEditMode,
    enterPropertyMode,
    editMode,
    columns,
  } = props;
  const { state, runAction } = useContext(AppContext);

  const onClickImport = () => {
    // const url =
    //   "https://macrostrat.org/api/v2/columns?project_id=10&format=geojson_bare&status_code=in%20process";
    // axios.post(import_url, { url, project_id: 10 });
  };

  let ids = useAPIResult(
    projects_url,
    {},
    { unwrapResponse: unwrapProjectIds }
  );

  return (
    <Navbar>
      <Navbar.Group>
        <Navbar.Heading>
          <Popover
            content={<ProjectDropDown project_ids={ids} />}
            position="bottom"
            minimal={true}
          >
            <Button minimal={true} onClick={onClickImport}>
              <b>Project {state.project_id}</b>
            </Button>
          </Popover>
        </Navbar.Heading>
        <Navbar.Divider />
        <DownloadButton columns={columns} />
        <Button minimal={true} intent="success" onClick={onSave}>
          Save
        </Button>
        <Button minimal={true} intent="danger" onClick={onCancel}>
          Cancel
        </Button>
        <Navbar.Divider />
        <Button minimal={true} active={editMode} onClick={enterEditMode}>
          Topology Edit Mode
        </Button>
        <Button minimal={true} active={!editMode} onClick={enterPropertyMode}>
          Property View Mode
        </Button>
        <Navbar.Divider />
        Total Area: 5000 sq miles?
      </Navbar.Group>
    </Navbar>
  );
}

export { MapNavBar };
