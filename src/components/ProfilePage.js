import React, { Suspense } from "react";

// with suspense
export const ProfilePage = ({ resource, onClick }) => {
    return (
        <div onClick={onClick} style={{ cursor: "pointer" }}>
            {/** 
             * Suspense
             * 1. Suspense takes one prop: a "fallback" component - shown when error or loading
             */}
            <Suspense fallback={<h1>Loading profile...</h1>} >
                <ProfileDetails resource={resource} />
                <Suspense fallback={<h1>Loading quote...</h1>}>
                    <ProfileTimeline resource={resource} />
                </Suspense>
            </Suspense>
        </div>
    );
}

// without suspense
// export const ProfilePage = ({ resource, onClick }) => {
//     if (!resource) {
//         return <h1>Loading data...</h1>
//     }
//     return (
//         <div onClick={onClick} style={{ cursor: "pointer" }}>
//             <ProfileDetails resource={resource} />
//             <ProfileTimeline resource={resource} />
//         </div>
//     );
// }

const ProfileDetails = ({ resource }) => {
    // These are resolved before we return.
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
