export const openConfirmDeleteDialog = (data) => {
  return (dispatch) => {
    dispatch({ type: "OPEN_CONFIRM_DELETE_DIALOG_SETTINGS" });
    dispatch({ type: "SET_COMPONENT_DATA_DELETE_CONFIRM", payload: data});
  };
};

export const closeConfirmDeleteDialog = () => {
  return (dispatch) => {
    dispatch({ type: "CLOSE_CONFIRM_DELETE_DIALOG_SETTINGS" });
  };
};
