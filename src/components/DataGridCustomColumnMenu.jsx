import {
  GridColumnMenuContainer,
  GridFilterMenuItem,
  HiderGridColMenu
  ,
  DataGrid,
  GridCell,
} from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn, open } = props;
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={open}
    >
      < DataGrid  getRowId={(row) => row._id} onClick={hideMenu} column={currentColumn} />
      <DataGrid   getRowId={(row) => row._id}onClick={hideMenu} column={currentColumn} />
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;
