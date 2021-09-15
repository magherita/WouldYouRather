export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
};

export const checkSignIn = () => {
    return localStorage.getItem("authedUser") !== "none"
        &&
        localStorage.getItem("authedUser") !== null;
};

export const getSignedInUser = () => checkSignIn() ? localStorage.getItem("authedUser") : "none";