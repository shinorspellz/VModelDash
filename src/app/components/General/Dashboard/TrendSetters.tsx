"use client";

import { AnalyticsSocialSources } from "../Widget/TrendChart";

const TrendSetters = () => {
  return (
    <div>
      <AnalyticsSocialSources
        chartSeries={[10, 10, 20, 5]}
        labels={[
          "Kwame Eugene",
          "Daniel Dabiri",
          "Tunji Dosumu",
          "Joseph Owusu",
        ]}
      />
    </div>
  );
};

export default TrendSetters;
