import { WineData } from "../components/WineStatisticsTable";


interface ResultData {
  classname:string,
  mean:number,
  median:number
  mode:number

}



// Utility function to calculate the mean of an array of numbers
const calculateMean = (arr: number[]) => {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
};

// Utility function to calculate the median of an array of numbers
const calculateMedian = (arr: number[]) => {
  if (arr.length === 0) return 0;
  const sortedArr = arr.sort((a, b) => a - b);
  const middleIndex = Math.floor(arr.length / 2);
  if (arr.length % 2 === 0) {
    return (sortedArr[middleIndex - 1] + sortedArr[middleIndex]) / 2;
  } else {
    return sortedArr[middleIndex];
  }
};

// Utility function to calculate the mode of an array of numbers
const calculateMode = (arr: number[]) => {
  if (arr.length === 0) return 0;
  const counts: { [key: number]: number } = {};
  let maxCount = 0;
  let modeValue = arr[0];

  arr.forEach((value) => {
    if (!counts[value]) {
      counts[value] = 1;
    } else {
      counts[value]++;
    }

    if (counts[value] > maxCount) {
      maxCount = counts[value];
      modeValue = value;
    }
  });

  return modeValue;
};
const caliculateStatForClass = (data:[]) => {
  
}

// Function to calculate class-wise statistics for a given property
export const calculateStatistics = (
  data: any[],
  propertyName: string
) => {
  let statData: ResultData []= []
  const keysFromArray: string [] = Object.keys(data[0])

  keysFromArray.map( (keyValue:string) => {
    const valuesForClass = data
      .map((wine) => parseFloat(wine[keyValue]));
    const statsForClass: any = {
      mean: calculateMean(valuesForClass),
      median: calculateMedian(valuesForClass),
      mode: calculateMode(valuesForClass),
    };
    statData.push({className:keyValue,...statsForClass})
    return null
  })
   console.log(statData, 'hello')
  const uniqueClasses = [...new Set(data.map((wine) => wine.Alcohol))];
  const statistics: any[] = [];

  uniqueClasses.forEach((wineClass: number) => {
    const valuesForClass = data
      .filter((wine) => wine.Alcohol === wineClass)
      .map((wine) => parseFloat(wine[propertyName]));


      const statsForClass: any = {
        mean: calculateMean(valuesForClass),
        median: calculateMedian(valuesForClass),
        mode: calculateMode(valuesForClass),
      };

    statistics.push(statsForClass);
  });

  return statistics;
};

// Function to calculate the "Gamma" property for each data point
export const calculateGamma = (data: any[]) => {
  return data.map((wine: any) => ({
    ...wine,
    Gamma: (parseFloat(wine.Ash) * parseFloat(wine.Hue)) / parseFloat(wine.Magnesium),
  }));
};
