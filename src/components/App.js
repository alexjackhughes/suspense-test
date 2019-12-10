import React, { useState, Suspense } from "react";
import { fetchProfileData } from "../api/fakeApi";

function getNextId(id) {
  return id === 3 ? 0 : id + 1;
}

const initialResource = fetchProfileData(0);

function App() {
  const [resource, setResource] = useState(
    initialResource
  );

  return (
    <div className="App">
      <header className="App-header">
        <ProfilePage resource={resource} />
        <button
          onClick={() => {
            const nextUserId = getNextId(
              resource.userId
            );
            setResource(
              fetchProfileData(nextUserId)
            );
          }}
        >
          Next
      </button>
      </header>
    </div>
  );
}


function ProfilePage({ resource }) {
  return (
    <Suspense
      fallback={<h1>Loading profile...</h1>}
    >
      <ProfileDetails resource={resource} />
      <Suspense
        fallback={<h1>Loading posts...</h1>}
      >
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails({ resource }) {
  const user = resource.user.read();
  return <h3>{user.name}</h3>;
}

function ProfileTimeline({ resource }) {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <div key={post.id}>{post.text}</div>
      ))}
    </ul>
  );
}

export default App;
