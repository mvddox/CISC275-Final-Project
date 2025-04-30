import { resultValues } from "./PreviousResult";

  // function that created the progess bar
  function SingleValueBar({ progress }: { progress: number }) {
    const containerStyle = {
    width: "100%",
    backgroundColor: "red",
    borderRadius: "20px",
    height: "5vh"
  };
  //green bar that covers up red bar
  const progressBarStyles = {
    width: `${progress}%`,
    backgroundColor: "green",
    height: "5vh",
    borderRadius: "20px",
    justifyContent: "center",
    fontWeight: 'bold',
    alignItems: 'center',
    display: 'flex',
    
  };
    return (
      <div style={containerStyle} role = "progressbar">
        <div style={progressBarStyles}>{Math.round(progress)}%</div>
      </div>
    );
  }


function ValueBars({values}: {values: resultValues}){
    return <div>
        <SingleValueBar progress={values.empathy}></SingleValueBar>
        <SingleValueBar progress={values.ambition}></SingleValueBar>
        <SingleValueBar progress={values.workLifeBalance}></SingleValueBar>
    </div>

}
export default ValueBars