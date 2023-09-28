export const Notification = ({ message }) => {
    const messageStyles = {
        color: "red",
        background: "black",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBotton: 10,
    };

    if (message === null) return null;

    return <div style={messageStyles}>{message}</div>;
};
