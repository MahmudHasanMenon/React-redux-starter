const NoMatch = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw", // should be 100vw (viewport width), not 100vh again!
        overflow: "hidden",
        display: "flex", // <-- this is important!
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "red",
      }}
    >
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NoMatch;
// This component is used to display a 404 Not Found page when the user navigates to a non-existent route.
