import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
// Pages
import MediaManager from "./dashboard/MediaManager";
// Components
import Nav from "./Nav";
import DrawerMenu from "./DrawerMenu";

// Just to view what they will look like
import TopicNav from "./kanban/TopicNav";
import TopicBucket2 from "./kanban2/TopicBucket2";
import CreateTopic from "./kanban2/CreateTopic.js";

import HomePage from "./HomePage";

const Home = () => {
  const { authService } = useOktaAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // TODO: update user info in redux store
  // TODO: Using component state now. Change to react-redux useSelector
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (!user.email) {
      // load user info
      (async () => {
        const oktaUser = await authService.getUser();
        setUser(oktaUser);
      })();
    } else {
      // Check if user has linked twitter account
      if (!user.twitter_screenName) {
        // Redirect user if there is no linked accounts
        history.push("/connect/twitter");
      }
    }
  }, [authService, user]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    user?.email && (
      <>
        <Nav toggleMenu={toggleMenu} />
        <DrawerMenu open={menuOpen} toggleMenu={toggleMenu} />

        <main>
          <Route exact path={["/app", "/app/media-manager"]}>
            <MediaManager />
          </Route>
        </main>
      </>
    )
  );
};

export default React.memo(Home);
