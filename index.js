// function promiseTest(delay) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("resolved");
//         }, delay);
//     });
// }

// promiseTest(1000)
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// Resolve or reject the promise after this delay
function setTimeoutPromise(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Resolve message.");
        }, delay);
    });
}

setTimeoutPromise(100)
    .then((val) => console.log("Resolved value: ", val))
    .catch((err) => console.log("Catched message", err));
