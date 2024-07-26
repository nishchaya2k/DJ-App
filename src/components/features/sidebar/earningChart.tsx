import { Sparklines, SparklinesLine } from "react-sparklines";

const transactionData = [
  500,
  50,
  100,
  500,
  1000,
  800,
  1200,
  1500,
  2000,
  1800, // Days 1-10
  1700,
  1600,
  1400,
  1300,
  1100,
  1000,
  950,
  900,
  850,
  800, // Days 11-20
  750,
  700,
  650,
  600,
  550,
  500,
  450,
  400,
  350,
  300, // Days 21-30
  250,
  200,
  150,
  100,
  50,
  0, // Days 31-35 (assume 0 earnings for days beyond 30)
];

const EarningChart = () => {
  const cumulativeSum = transactionData.reduce((acc: number[], val: number) => {
    const lastSum = acc.length > 0 ? acc[acc.length - 1] : 0;
    acc.push(lastSum + val);
    return acc;
  }, []);

  // Get the cumulative sum of the last 30 days
  const recentCumulativeSum = cumulativeSum.slice(-30);

  return (
    <Sparklines data={recentCumulativeSum} height={100}>
      <SparklinesLine
        color="green"
        style={{ strokeWidth: 4, strokeLinecap: "round" }}
        // smooth={false}
      />
    </Sparklines>
  );
};

export default EarningChart;
