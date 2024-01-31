import React, { useEffect, useState } from "react";
import { calculateStatistics, calculateGamma } from "../utils/statistics";
import wineData from "../data/wineData.json";

export interface WineData {
  Alcohol: number | string;
  "Malic Acid": number | string;
  Ash: number | string;
  "Alcalinity of ash": number | string;
  Magnesium: number | string;
  "Total phenols": number | string;
  Flavanoids: number | string;
  "Nonflavanoid phenols": number | string;
  Proanthocyanins: number | string;
  "Color intensity": number | string;
  Hue: number | string;
  "OD280/OD315 of diluted wines": number | string;
  Unknown: number | string;
}

const WineStatistics: React.FC = () => {
  const [flavanoidsStatistics, setFlavanoidsStatistics] = useState<any[]>([]);
  const [gammaStatistics, setGammaStatistics] = useState<any[]>([]);

  useEffect(() => {
    // Calculate statistics for Flavanoids
    const flavanoidsStats = calculateStatistics(
      wineData as any[],
      "Flavanoids"
    );
    setFlavanoidsStatistics(flavanoidsStats);

    // Calculate and add the "Gamma" property to the dataset
    const dataWithGamma = calculateGamma(wineData as any[]);

    // Calculate statistics for Gamma
    const gammaStats = calculateStatistics(dataWithGamma, "Gamma");
    setGammaStatistics(gammaStats);
  }, []);

  return (
    <div>
      <h1>Wine Statistics</h1>

      {/* Flavanoids Statistics */}
      <h2>Flavanoids Statistics</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Measure</th>
            {flavanoidsStatistics[0] &&
              Object.keys(flavanoidsStatistics[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {flavanoidsStatistics.map((stat, index) => (
            <tr key={index}>
              <td style={{padding: '10px' , width:'60px'}}>Flavanoids {stat.measure}</td>
              {Object.keys(stat).map((key) => (
                <td key={key} style={{padding: '10px' , width:'60px', textAlign:'center'}}>{stat[key].toFixed(2)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Gamma Statistics */}
      <h2>Gamma Statistics</h2>
      <table border={1}>
        <thead>
          <tr>
            <th style={{padding: '10px'}}>Measure</th>
            {gammaStatistics[0] &&
              Object.keys(gammaStatistics[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {gammaStatistics.map((stat, index) => (
            <tr key={index} >
              <td style={{padding: '10px'}}>Gamma {stat.measure}</td>
              {Object.keys(stat).map((key) => (
                <td key={key} style={{padding: '10px', width:'60px', textAlign:'center'}}>{stat[key].toFixed(2)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WineStatistics;
