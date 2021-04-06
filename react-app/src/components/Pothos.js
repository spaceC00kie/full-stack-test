import React, { useEffect, useState } from "react"
import GaugeChart from "react-gauge-chart"
import "../App.css"
import { Button } from "@material-ui/core"
import { styled } from '@material-ui/core/styles';


const Pothos = () => {
  const [sensor1, setSensor1] = useState(0.5)
  const [sensor2, setSensor2] = useState(0.5)
  const [isConnected, setIsConnected] = useState(true)

  const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  });

  const getSoilSensor = () => {
    fetch("http://10.0.0.6:8080/sensor")
      .then(res => res.json())
      .then(i => {
        setSensor1(i.is1Wet ? 1.0 : 0.0)
        setSensor2(i.is2Wet ? 1.0 : 0.0)
      })
      .catch(e => {
        setIsConnected(false)
      })
  }

  useEffect(getSoilSensor, [])

  const chartStyle = {
    height: "100%",
  }

  return (
    <div className="gauge">
      <Button
        class="button"
        onClick={() => getSoilSensor()}
        variant="outlined"
      >
        Check again?
      </Button>
      <MyButton>Try this</MyButton>
      {isConnected ? "" : <h2 id="connection-status">Failed to Connect!</h2>}
      <h1>Sensor 1</h1>
      <GaugeChart
        id="gauge-chart1"
        nrOfLevels={7}
        colors={["#fcf644", "#44edfc"]}
        arcWidth={0.4}
        percent={sensor1}
        style={chartStyle}
        textColor="#07b3f7"
        needleColor="#afd6fa"
        needleBaseColor="#0c87fa"
        cornerRadius={30}
        arcPadding={0.03}
      />
      <h1>Sensor 2</h1>
      <GaugeChart
        id="gauge-chart2"
        nrOfLevels={7}
        colors={["#fcf644", "#44edfc"]}
        arcWidth={0.4}
        percent={sensor2}
        style={chartStyle}
        textColor="#07b3f7"
        needleColor="#afd6fa"
        needleBaseColor="#0c87fa"
        cornerRadius={30}
        arcPadding={0.03}
      />
    </div>
  )
}

export default Pothos
