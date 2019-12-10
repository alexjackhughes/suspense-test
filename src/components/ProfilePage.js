import React, { Suspense } from "react";


export const ProfilePage = ({ resource, onClick }) => {
    return (
        <div onClick={onClick} style={{ cursor: "pointer" }}>
            <Suspense fallback={<h1>Loading profile...</h1>} >
                <ProfileDetails resource={resource} />
                <Suspense fallback={<h1>Loading posts...</h1>}>
                    <ProfileTimeline resource={resource} />
                </Suspense>
            </Suspense>
        </div>
    );
}

const ProfileDetails = ({ resource }) => {
    const user = resource.user.read();

    return <h3>{user.name}</h3>;
}

const ProfileTimeline = ({ resource }) => {
    const posts = resource.posts.read();

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>{post.text}</div>
            ))}
        </div>
    );
}
