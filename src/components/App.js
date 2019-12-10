import React, { useState } from "react";
import { fetchProfileData } from "../api/fakeApi";

import { ProfilePage } from './ProfilePage'

// getNextId returns a number between 1 & 3.
const getNextId = (id) => {
  return id === 3 ? 0 : id + 1;
}

const App = () => {
  const [profile, setProfile] = useState(
    fetchProfileData(0)
  );

  return (
    <div className="App">
      <header className="App-header">
        <ProfilePage
          resource={profile}
          onClick={() => {
            const nextUserId = getNextId(profile.userId);
            setProfile(fetchProfileData(nextUserId));
          }}
        />
      </header>
    </div>
  );
}
export default App;
