import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link, useHistory } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutCall } from "../../apiCalls";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Topbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [dialogOpen, setDialogOpen] = useState(false);
  const history = useHistory();
  const searchRef = useRef(null);
  const handleExitIconClick = (e) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleDialogUserClose = (isExisting) => {
    if (isExisting) {
      setDialogOpen(false);
      logoutCall(dispatch);
      history.push("/login");
    } else {
      setDialogOpen(false);
    }
  };

  const searchUser = () => {
    let val = searchRef.current.value;
    console.log(val);
  };

  const handleSearchKeyPress = (e) => {
    if (e.nativeEvent.keyCode == 13) {
      searchUser();
    }
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="topbarLogo">{user.username}</span>
        </Link>
        <ExitToAppIcon className="exitIcon" onClick={handleExitIconClick} />
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Exist APP"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {"Are you sure to exit the application?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleDialogUserClose(false);
              }}
              color="primary"
            >
              No
            </Button>
            <Button
              onClick={() => handleDialogUserClose(true)}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            ref={searchRef}
            placeholder="Search for..."
            type="text"
            className="searchInput"
            onKeyPress={handleSearchKeyPress}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Link to="/messenger" style={{ textDecoration: "none" }}>
              <Chat style={{ color: "white" }} />
            </Link>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/10.jpeg"
            }
            alt=""
            className="topbarImage"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
