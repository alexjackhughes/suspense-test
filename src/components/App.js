import React, { useState, useTransition } from "react";
import { fetchProfileData } from "../api/fakeApi";

import { ProfilePage } from './ProfilePage'

const getNextId = (id) => {
  return id === 4 ? 0 : id + 1;
}

const App = () => {
  const [profile, setProfile] = useState(fetchProfileData(0));

  const fetchNextProfile = () => {
    const nextUserId = getNextId(profile.userId);
    setProfile(fetchProfileData(nextUserId));
  }

  return (
    <div className="App">
      <header className="App-header">
        <ProfilePage
          resource={profile}
          onClick={fetchNextProfile}
        />
      </header>
    </div>
  );
}
export default App;

  // const [startTransition, isPending] = useTransition({ timeoutMs: 2000 });

// This uses a sexy transition:
//   startTransition(() => {
//     const nextUserId = getNextId(profile.userId);
//     setProfile(fetchProfileData(nextUserId));
//   });

// isPending allows us to add a notification during transisiton wait time
// {isPending ? " Loading..." : null}