export function fetchProfileData(userId) {
    let userPromise = fetchUser(userId);
    let postsPromise = fetchPosts(userId);
    return {
        userId,
        user: wrapPromise(userPromise),
        posts: wrapPromise(postsPromise)
    };
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
        r => {
            status = "success";
            result = r;
        },
        e => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        }
    };
}

export function fetchUser(userId) {
    console.log("fetch user " + userId + "...");
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("fetched user " + userId);
            switch (userId) {
                case 0:
                    resolve({
                        name: "Ben"
                    });
                    break;
                case 1:
                    resolve({
                        name: "Simon"
                    });
                    break;
                case 2:
                    resolve({
                        name: "Alex #1"
                    });
                    break;
                case 3:
                    resolve({
                        name: "Lucy"
                    });
                    break;
                default:
                    throw Error("Unknown user.");
            }
        }, 1000 * Math.random());
    });
}

export function fetchPosts(userId) {
    console.log(
        "fetch posts for " + userId + "..."
    );
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("fetched posts for " + userId);
            switch (userId) {
                case 0:
                    resolve([
                        {
                            id: 0,
                            text:
                                "Feels slightly overcomplicated but 🤷"
                        }
                    ]);
                    break;
                case 1:
                    resolve([
                        {
                            id: 0,
                            text:
                                "Can we not just use Vue.js? 🙅"
                        }
                    ]);
                    break;
                case 2:
                    resolve([
                        {
                            id: 0,
                            text:
                                "Don't worry, everything is fine but our cluster is on fire 🔥"
                        }
                    ]);
                    break;
                case 3:
                    resolve([
                        {
                            id: 0,
                            text: "YOU'RE NOT A DOCTOR 👩‍⚕️"
                        }
                    ]);
                    break;
                default:
                    throw Error("Unknown user.");
            }
        }, 2000 * Math.random());
    });
}
