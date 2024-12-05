interface DataPoint {
  type: string;
  value: string;
  unit: string;
  startDateTime: string;
}

interface ScoreData {
  type: string;
  score: number;
  state: string;
  scoreDateTime: string;
}

export function processHealthData(data: DataPoint[]) {
  const processedData = data.reduce((acc, item) => {
    const date = new Date(item.startDateTime).toISOString().split('T')[0];
    if (!acc[item.type]) {
      acc[item.type] = {};
    }
    acc[item.type][date] = parseFloat(item.value);
    return acc;
  }, {} as Record<string, Record<string, number>>);

  return Object.entries(processedData).map(([type, values]) => ({
    type,
    data: Object.entries(values).map(([date, value]) => ({ date, value })),
  }));
}

export function processScoreData(data: ScoreData[]) {
  return data.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push({
      date: new Date(item.scoreDateTime).toISOString().split('T')[0],
      score: item.score,
      state: item.state,
    });
    return acc;
  }, {} as Record<string, { date: string; score: number; state: string }[]>);
}
