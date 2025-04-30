import { Col, Container, Row } from "react-bootstrap";
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
    return <Container>
        Empathy
        <Row>
            <Col>Sociopath</Col>
           <Col xs={8}><SingleValueBar progress={values.empathy}></SingleValueBar></Col>
            <Col>Paragon</Col>
        </Row>
        Ambition
        <Row>
            <Col>Placant</Col>
           <Col xs={8}><SingleValueBar progress={values.ambition}></SingleValueBar></Col>
            <Col>Augustine</Col>
        </Row>
        Work Life
        <Row>
            <Col>Workoholic</Col>
           <Col xs={8}><SingleValueBar progress={values.workLifeBalance}></SingleValueBar></Col>
            <Col>Unemployed</Col>
        </Row>
    </Container>

}
export default ValueBars