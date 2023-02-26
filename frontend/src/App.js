
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useFetchData from './hooks/useFetchData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Gauge from "react-svg-gauge";

import * as React from 'react';
import Switch from '@mui/material/Switch';
import { fontSize } from '@mui/system';


function App() {
  const [light, setLight] = useState(false)
  const [light2, setLight2] = useState(false)
  const [light3, setLight3] = useState(false)
  const [fan, setFan] = useState(false)

  const { data } = useFetchData('http://localhost:4000/data')

  const fanChange = (e) => {
    if (e.target.checked === true) {
      setFan(true)
    } else {
      setFan(false)
    }
    console.log(e.target.checked)
  }

  const led1Change = (e) => {
    if (e.target.checked === true) {
      setLight(true)
    } else {
      setLight(false)
    }
    console.log(e.target.checked)
  }

  const led2Change = (e) => {
    if (e.target.checked === true) {
      setLight2(true)
    } else {
      setLight2(false)
    }
    console.log(e.target.checked)
  }

  const led3Change = (e) => {
    if (e.target.checked === true) {
      setLight3(true)
    } else {
      setLight3(false)
    }
    console.log(e.target.checked)
  }

  useEffect(() => {
    const request = async () => {
      try {
        const response = await axios.post('http://localhost:4000/data', {
          name: 'LED',
          value: light,
          led2: light2,
          led3: light3,
          fan: fan
        })
      } catch (error) {
        console.log(error)
      }
    }

    request()

  }, [light, light2, light3, fan])

  let dataArray = []
  let humidArray = []

  let sumCelcius = 0
  let sumFarenheight = 0
  let sumKelvin = 0

  let celcuis
  let timestamp = 0
  let humidity

  let sumHumidity = 0

  try {
    for (let i = 0; i < 20; i++) {
      timestamp = i
      celcuis = data[0]?.tempArray[i]
      humidity = data[0]?.humidArray[i]

      let farenheight = Math.round(celcuis * 9 / 5 + 32);
      let kelvin = celcuis + 273

      sumCelcius += celcuis
      sumFarenheight += farenheight
      sumKelvin += kelvin
      sumHumidity += humidity

      dataArray.push({ timestamp, celcuis, farenheight, kelvin })
      humidArray.push({ timestamp, humidity })
    }
  } catch (error) {

  }

  let avgCelcuis = sumCelcius / 20
  let avgFarenheight = sumFarenheight / 20
  let avgKelvin = sumKelvin / 20
  let avgHumidity = sumHumidity / 20

  const label = { inputProps: { 'aria-label': 'Size switch demo' } };

  let temp

  if (avgCelcuis < 20) {
    temp = 'Cold'
  }
  if (20 < avgCelcuis < 35) {
    temp = 'Normal'
  }
  if (avgCelcuis > 35) {
    temp = 'Hot'
  }


  return (
    <div className="App">
      <h1>IOT Smart Home Automation System</h1>
      <div className='control-container'>
        <div className='Light'>
          <h3>Control Lights</h3>

          <div className='led-lights'>
            <div>
              <div className='led-items'>
                <h4>LED 01</h4>
                <Switch {...label} onChange={led1Change} />
              </div>
              <span class="material-symbols-outlined" style={{ color: `${light ? 'blue' : 'black'}` }}>emoji_objects</span>
            </div>
            <div>
              <div className='led-items'>
                <h4>LED 02</h4>
                <Switch {...label} color="warning" onChange={led2Change} />
              </div>
              <span class="material-symbols-outlined" style={{ color: `${light2 ? 'red' : 'black'}`}}>emoji_objects</span>
            </div>
            <div>
              <div className='led-items'>
                <h4>LED 03</h4>
                <Switch {...label} color="error" onChange={led3Change} />
              </div>
              <span class="material-symbols-outlined" style={{ color: `${light3 ? 'orange' : 'black'}` }}>emoji_objects</span>
            </div>
          </div>

        </div>
        <div className='Fans'>
          <h3>Control Fans</h3>
          <div className='fan-controls'>
            <h4>Main Fan</h4>
            <Switch {...label} onChange={fanChange} />
          </div>
          <span class="material-symbols-outlined" style={{ color: `${fan ? 'red' : 'black'}` }}>mode_fan</span>
        </div>
      </div>
      <div className='temperature-container'>

        <ResponsiveContainer width="55%" height="80%">
          <LineChart
            width={500}
            height={300}
            data={dataArray}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >src/App.js
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="celcuis" stroke="#F00000" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="farenheight" stroke="#FFA500" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="kelvin" stroke="#ECE81A" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>

        <div className='temp-details-container'>
          <h3>Your average Room temperature</h3>

          <div className='charts'>
            <Gauge
              value={avgCelcuis}
              label={""}
              width={120}
              height={200}
              topLabelStyle={{ display: "none" }}
              valueLabelStyle={{}}
              valueFormatter={number => `${number}%`}
              color={'#F00000'}
            />


            <Gauge
              value={avgFarenheight}
              label={""}
              width={120}
              height={200}
              topLabelStyle={{ display: "none" }}
              valueLabelStyle={{}}
              valueFormatter={number => `${number}%`}
              color={'#FFA500'}
            />

            <Gauge
              value={avgKelvin}
              label={""}
              width={120}
              height={200}
              topLabelStyle={{ display: "none" }}
              valueLabelStyle={{}}
              valueFormatter={number => `${number}%`}
              color={'#ECE81A'}
            />
          </div>

          <div className='names'>
            <p>Celcuis</p>
            <p>Farenheight</p>
            <p>Kelvin</p>
          </div>

          <p>Your room temperature is {temp} at the moment</p>

        </div>

      </div>


      {/* DHT11 temperature */}
      <div className='temperature-container'>

        <ResponsiveContainer width="55%" height="80%">
          <LineChart
            width={500}
            height={300}
            data={humidArray}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >src/App.js
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="humidity" stroke="#1e90ff" activeDot={{ r: 8 }} />

          </LineChart>
        </ResponsiveContainer>

        <div className='temp-details-container'>
          <h3>Average Humidity</h3>

          <div className='charts'>
            <Gauge
              value={avgHumidity}
              label={""}
              width={120}
              height={200}
              topLabelStyle={{ display: "none" }}
              valueLabelStyle={{}}
              valueFormatter={number => `${number}%`}
              color={'#1e90ff'}
            />
          </div>

          <div className='names'>
            <p>Average Humidity</p>
          </div>

          <p>{avgHumidity > 65 ? 'Average Humidity is high.There could be Rain Today' : 'Average Humidity is Normal. No sign of rain today'}</p>

        </div>
      </div>
    </div>)
}

export default App;
