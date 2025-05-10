// function that creates the progress bar
function QuestionProgressBar({ progress }: { progress: number }) {
  // wrapper to center the progress bar on the page
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px", // Optional spacing from top
  };

  // red background bar (outer container)
  const containerStyle = {
    width: "80%",
    backgroundColor: "red",
    borderRadius: "20px",
    height: "5vh"
  };

  // green bar that covers up red bar
  const progressBarStyles = {
    width: `${progress}%`,
    backgroundColor: "green",
    height: "5vh",
    borderRadius: "20px",
    justifyContent: "center",
    fontWeight: 'bold',
    alignItems: 'center',
    display: 'flex',
    color: 'black' 
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle} role="progressbar">
        <div style={progressBarStyles}>{Math.round(progress)}%</div>
      </div>
    </div>
  );
}

export default QuestionProgressBar;