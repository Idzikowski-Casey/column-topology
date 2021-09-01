import React from "react";
import {
  ModelEditor,
  useModelEditor,
  ModelEditButton,
  EditableMultilineText,
} from "@macrostrat/ui-components";
import { SaveButton } from "../../blueprint";
import axios from "axios";

function EditComponents() {
  const { actions } = useModelEditor();
  return (
    <div>
      <div className="edit-with-label">
        <h4 className="h4-0">Column-Group: </h4>
        <h4 className="h4-0">
          {/* @ts-ignore */}
          <EditableMultilineText field="col_group" className="col_group" />
        </h4>
      </div>
      <div className="edit-with-label">
        <h4 className="h4-0">Column-Group-Name:</h4>
        <h4 className="h4-0">
          {/* @ts-ignore */}
          <EditableMultilineText
            field="col_group_name"
            className="col_group_name"
          />
        </h4>
      </div>
      <SaveButton onClick={() => actions.persistChanges()} />
    </div>
  );
}

function NewColGroups(props) {
  const { onCreate } = props;
  let state = {
    col_group: "",
    col_group_name: "",
  };

  const persistChanges = async (updatedModel, changeset) => {
    console.log("changeset", changeset);
    console.log("updatedModel", updatedModel);
    let route = `http://0.0.0.0:8000/col-groups/post`;
    let res = await axios.post(route, { updatedModel });
    const {
      data: { col_group_id },
    } = res;
    const { col_group, col_group_name } = updatedModel;
    onCreate(col_group_id, col_group, col_group_name);
  };

  return (
    <ModelEditor
      model={state}
      canEdit={true}
      isEditing={true}
      persistChanges={persistChanges}
    >
      <EditComponents />
    </ModelEditor>
  );
}

export { NewColGroups };