// GENERATED FILE — run npm run data:build.
// Primary results require exact-vintage ratings for vintage-dated products.

import type {
  AnimalRankingDatum,
  DatasetOverview,
  ExplorerWineDatum,
  ScoreAnalysisKey,
  ScoreBin,
  WineLabelDatum,
  WineTypeKey,
  AnimalKey,
} from "@/lib/data/contracts";

export const scoreDataNotice = "Preliminära resultat · Vivinos användarbetyg · saknade betyg räknas inte som noll.";
export const displayRule = { minimumScoreCount: 10, minimumCoverage: 0.3 } as const;
export const datasetOverview: DatasetOverview = {
  "sourceWineCount": 11383,
  "scoredWineCount": 1033,
  "primaryScoredWineCount": 598,
  "animalWineCount": 1349,
  "animalCategoryCount": 6,
  "isDemo": false,
  "snapshotLabel": "Systembolagets sortiment 8 augusti 2026"
};

export const animalRankingData: Record<ScoreAnalysisKey, AnimalRankingDatum[]> = {
  "primary": [
    {
      "animal": "lion",
      "values": {
        "all": {
          "animal": "lion",
          "cohortWineCount": 153,
          "wineCount": 73,
          "coverage": 0.4771,
          "eligible": true,
          "averageScore": 3.886,
          "medianScore": 3.9,
          "confidenceLow": 3.807,
          "confidenceHigh": 3.966
        },
        "red": {
          "animal": "lion",
          "cohortWineCount": 83,
          "wineCount": 36,
          "coverage": 0.4337,
          "eligible": true,
          "averageScore": 3.911,
          "medianScore": 4,
          "confidenceLow": 3.766,
          "confidenceHigh": 4.056
        },
        "white": {
          "animal": "lion",
          "cohortWineCount": 43,
          "wineCount": 18,
          "coverage": 0.4186,
          "eligible": true,
          "averageScore": 3.889,
          "medianScore": 3.9,
          "confidenceLow": 3.828,
          "confidenceHigh": 3.95
        },
        "rose": {
          "animal": "lion",
          "cohortWineCount": 5,
          "wineCount": 1,
          "coverage": 0.2,
          "eligible": false,
          "averageScore": 3.5,
          "medianScore": 3.5
        },
        "sparkling": {
          "animal": "lion",
          "cohortWineCount": 22,
          "wineCount": 18,
          "coverage": 0.8182,
          "eligible": true,
          "averageScore": 3.856,
          "medianScore": 3.85,
          "confidenceLow": 3.728,
          "confidenceHigh": 3.984
        }
      }
    },
    {
      "animal": "pig",
      "values": {
        "all": {
          "animal": "pig",
          "cohortWineCount": 18,
          "wineCount": 6,
          "coverage": 0.3333,
          "eligible": false,
          "averageScore": 3.933,
          "medianScore": 3.95,
          "confidenceLow": 3.644,
          "confidenceHigh": 4.223
        },
        "red": {
          "animal": "pig",
          "cohortWineCount": 12,
          "wineCount": 5,
          "coverage": 0.4167,
          "eligible": false,
          "averageScore": 3.94,
          "medianScore": 4,
          "confidenceLow": 3.586,
          "confidenceHigh": 4.294
        },
        "white": {
          "animal": "pig",
          "cohortWineCount": 4,
          "wineCount": 0,
          "coverage": 0,
          "eligible": false,
          "averageScore": null,
          "medianScore": null
        },
        "rose": {
          "animal": "pig",
          "cohortWineCount": 2,
          "wineCount": 1,
          "coverage": 0.5,
          "eligible": false,
          "averageScore": 3.9,
          "medianScore": 3.9
        },
        "sparkling": {
          "animal": "pig",
          "cohortWineCount": 0,
          "wineCount": 0,
          "coverage": 0,
          "eligible": false,
          "averageScore": null,
          "medianScore": null
        }
      }
    },
    {
      "animal": "deer",
      "values": {
        "all": {
          "animal": "deer",
          "cohortWineCount": 45,
          "wineCount": 20,
          "coverage": 0.4444,
          "eligible": true,
          "averageScore": 3.82,
          "medianScore": 3.8,
          "confidenceLow": 3.74,
          "confidenceHigh": 3.9
        },
        "red": {
          "animal": "deer",
          "cohortWineCount": 29,
          "wineCount": 13,
          "coverage": 0.4483,
          "eligible": true,
          "averageScore": 3.808,
          "medianScore": 3.8,
          "confidenceLow": 3.723,
          "confidenceHigh": 3.892
        },
        "white": {
          "animal": "deer",
          "cohortWineCount": 14,
          "wineCount": 6,
          "coverage": 0.4286,
          "eligible": false,
          "averageScore": 3.8,
          "medianScore": 3.75,
          "confidenceLow": 3.618,
          "confidenceHigh": 3.982
        },
        "rose": {
          "animal": "deer",
          "cohortWineCount": 1,
          "wineCount": 1,
          "coverage": 1,
          "eligible": false,
          "averageScore": 4.1,
          "medianScore": 4.1
        },
        "sparkling": {
          "animal": "deer",
          "cohortWineCount": 1,
          "wineCount": 0,
          "coverage": 0,
          "eligible": false,
          "averageScore": null,
          "medianScore": null
        }
      }
    },
    {
      "animal": "bird",
      "values": {
        "all": {
          "animal": "bird",
          "cohortWineCount": 434,
          "wineCount": 179,
          "coverage": 0.4124,
          "eligible": true,
          "averageScore": 3.827,
          "medianScore": 3.8,
          "confidenceLow": 3.781,
          "confidenceHigh": 3.874
        },
        "red": {
          "animal": "bird",
          "cohortWineCount": 230,
          "wineCount": 88,
          "coverage": 0.3826,
          "eligible": true,
          "averageScore": 3.893,
          "medianScore": 3.85,
          "confidenceLow": 3.828,
          "confidenceHigh": 3.958
        },
        "white": {
          "animal": "bird",
          "cohortWineCount": 148,
          "wineCount": 63,
          "coverage": 0.4257,
          "eligible": true,
          "averageScore": 3.802,
          "medianScore": 3.8,
          "confidenceLow": 3.735,
          "confidenceHigh": 3.868
        },
        "rose": {
          "animal": "bird",
          "cohortWineCount": 17,
          "wineCount": 9,
          "coverage": 0.5294,
          "eligible": false,
          "averageScore": 3.422,
          "medianScore": 3.4,
          "confidenceLow": 3.104,
          "confidenceHigh": 3.74
        },
        "sparkling": {
          "animal": "bird",
          "cohortWineCount": 39,
          "wineCount": 19,
          "coverage": 0.4872,
          "eligible": true,
          "averageScore": 3.8,
          "medianScore": 3.8,
          "confidenceLow": 3.688,
          "confidenceHigh": 3.912
        }
      }
    },
    {
      "animal": "horse",
      "values": {
        "all": {
          "animal": "horse",
          "cohortWineCount": 137,
          "wineCount": 57,
          "coverage": 0.4161,
          "eligible": true,
          "averageScore": 3.86,
          "medianScore": 3.8,
          "confidenceLow": 3.781,
          "confidenceHigh": 3.938
        },
        "red": {
          "animal": "horse",
          "cohortWineCount": 89,
          "wineCount": 38,
          "coverage": 0.427,
          "eligible": true,
          "averageScore": 3.887,
          "medianScore": 3.8,
          "confidenceLow": 3.792,
          "confidenceHigh": 3.982
        },
        "white": {
          "animal": "horse",
          "cohortWineCount": 23,
          "wineCount": 8,
          "coverage": 0.3478,
          "eligible": false,
          "averageScore": 3.725,
          "medianScore": 3.7,
          "confidenceLow": 3.548,
          "confidenceHigh": 3.902
        },
        "rose": {
          "animal": "horse",
          "cohortWineCount": 5,
          "wineCount": 2,
          "coverage": 0.4,
          "eligible": false,
          "averageScore": 3.45,
          "medianScore": 3.45,
          "confidenceLow": 3.156,
          "confidenceHigh": 3.744
        },
        "sparkling": {
          "animal": "horse",
          "cohortWineCount": 20,
          "wineCount": 9,
          "coverage": 0.45,
          "eligible": false,
          "averageScore": 3.956,
          "medianScore": 4.1,
          "confidenceLow": 3.754,
          "confidenceHigh": 4.157
        }
      }
    },
    {
      "animal": "fox",
      "values": {
        "all": {
          "animal": "fox",
          "cohortWineCount": 6,
          "wineCount": 4,
          "coverage": 0.6667,
          "eligible": false,
          "averageScore": 3.675,
          "medianScore": 3.6,
          "confidenceLow": 3.443,
          "confidenceHigh": 3.907
        },
        "red": {
          "animal": "fox",
          "cohortWineCount": 4,
          "wineCount": 2,
          "coverage": 0.5,
          "eligible": false,
          "averageScore": 3.5,
          "medianScore": 3.5,
          "confidenceLow": 3.5,
          "confidenceHigh": 3.5
        },
        "white": {
          "animal": "fox",
          "cohortWineCount": 1,
          "wineCount": 1,
          "coverage": 1,
          "eligible": false,
          "averageScore": 4,
          "medianScore": 4
        },
        "rose": {
          "animal": "fox",
          "cohortWineCount": 0,
          "wineCount": 0,
          "coverage": 0,
          "eligible": false,
          "averageScore": null,
          "medianScore": null
        },
        "sparkling": {
          "animal": "fox",
          "cohortWineCount": 1,
          "wineCount": 1,
          "coverage": 1,
          "eligible": false,
          "averageScore": 3.7,
          "medianScore": 3.7
        }
      }
    }
  ],
  "sensitivity": [
    {
      "animal": "lion",
      "values": {
        "all": {
          "animal": "lion",
          "cohortWineCount": 153,
          "wineCount": 127,
          "coverage": 0.8301,
          "eligible": true,
          "averageScore": 3.902,
          "medianScore": 3.9,
          "confidenceLow": 3.841,
          "confidenceHigh": 3.962
        },
        "red": {
          "animal": "lion",
          "cohortWineCount": 83,
          "wineCount": 72,
          "coverage": 0.8675,
          "eligible": true,
          "averageScore": 3.956,
          "medianScore": 3.95,
          "confidenceLow": 3.866,
          "confidenceHigh": 4.045
        },
        "white": {
          "animal": "lion",
          "cohortWineCount": 43,
          "wineCount": 30,
          "coverage": 0.6977,
          "eligible": true,
          "averageScore": 3.853,
          "medianScore": 3.9,
          "confidenceLow": 3.751,
          "confidenceHigh": 3.956
        },
        "rose": {
          "animal": "lion",
          "cohortWineCount": 5,
          "wineCount": 4,
          "coverage": 0.8,
          "eligible": false,
          "averageScore": 3.575,
          "medianScore": 3.55,
          "confidenceLow": 3.481,
          "confidenceHigh": 3.669
        },
        "sparkling": {
          "animal": "lion",
          "cohortWineCount": 22,
          "wineCount": 21,
          "coverage": 0.9545,
          "eligible": true,
          "averageScore": 3.848,
          "medianScore": 3.8,
          "confidenceLow": 3.728,
          "confidenceHigh": 3.967
        }
      }
    },
    {
      "animal": "pig",
      "values": {
        "all": {
          "animal": "pig",
          "cohortWineCount": 18,
          "wineCount": 11,
          "coverage": 0.6111,
          "eligible": true,
          "averageScore": 3.973,
          "medianScore": 4,
          "confidenceLow": 3.799,
          "confidenceHigh": 4.146
        },
        "red": {
          "animal": "pig",
          "cohortWineCount": 12,
          "wineCount": 9,
          "coverage": 0.75,
          "eligible": false,
          "averageScore": 4.011,
          "medianScore": 4,
          "confidenceLow": 3.809,
          "confidenceHigh": 4.214
        },
        "white": {
          "animal": "pig",
          "cohortWineCount": 4,
          "wineCount": 1,
          "coverage": 0.25,
          "eligible": false,
          "averageScore": 3.7,
          "medianScore": 3.7
        },
        "rose": {
          "animal": "pig",
          "cohortWineCount": 2,
          "wineCount": 1,
          "coverage": 0.5,
          "eligible": false,
          "averageScore": 3.9,
          "medianScore": 3.9
        },
        "sparkling": {
          "animal": "pig",
          "cohortWineCount": 0,
          "wineCount": 0,
          "coverage": 0,
          "eligible": false,
          "averageScore": null,
          "medianScore": null
        }
      }
    },
    {
      "animal": "deer",
      "values": {
        "all": {
          "animal": "deer",
          "cohortWineCount": 45,
          "wineCount": 31,
          "coverage": 0.6889,
          "eligible": true,
          "averageScore": 3.845,
          "medianScore": 3.9,
          "confidenceLow": 3.779,
          "confidenceHigh": 3.911
        },
        "red": {
          "animal": "deer",
          "cohortWineCount": 29,
          "wineCount": 21,
          "coverage": 0.7241,
          "eligible": true,
          "averageScore": 3.838,
          "medianScore": 3.9,
          "confidenceLow": 3.762,
          "confidenceHigh": 3.914
        },
        "white": {
          "animal": "deer",
          "cohortWineCount": 14,
          "wineCount": 9,
          "coverage": 0.6429,
          "eligible": false,
          "averageScore": 3.833,
          "medianScore": 3.8,
          "confidenceLow": 3.695,
          "confidenceHigh": 3.972
        },
        "rose": {
          "animal": "deer",
          "cohortWineCount": 1,
          "wineCount": 1,
          "coverage": 1,
          "eligible": false,
          "averageScore": 4.1,
          "medianScore": 4.1
        },
        "sparkling": {
          "animal": "deer",
          "cohortWineCount": 1,
          "wineCount": 0,
          "coverage": 0,
          "eligible": false,
          "averageScore": null,
          "medianScore": null
        }
      }
    },
    {
      "animal": "bird",
      "values": {
        "all": {
          "animal": "bird",
          "cohortWineCount": 434,
          "wineCount": 338,
          "coverage": 0.7788,
          "eligible": true,
          "averageScore": 3.872,
          "medianScore": 3.8,
          "confidenceLow": 3.838,
          "confidenceHigh": 3.906
        },
        "red": {
          "animal": "bird",
          "cohortWineCount": 230,
          "wineCount": 187,
          "coverage": 0.813,
          "eligible": true,
          "averageScore": 3.917,
          "medianScore": 3.9,
          "confidenceLow": 3.87,
          "confidenceHigh": 3.963
        },
        "white": {
          "animal": "bird",
          "cohortWineCount": 148,
          "wineCount": 113,
          "coverage": 0.7635,
          "eligible": true,
          "averageScore": 3.836,
          "medianScore": 3.8,
          "confidenceLow": 3.785,
          "confidenceHigh": 3.887
        },
        "rose": {
          "animal": "bird",
          "cohortWineCount": 17,
          "wineCount": 12,
          "coverage": 0.7059,
          "eligible": true,
          "averageScore": 3.533,
          "medianScore": 3.7,
          "confidenceLow": 3.271,
          "confidenceHigh": 3.796
        },
        "sparkling": {
          "animal": "bird",
          "cohortWineCount": 39,
          "wineCount": 26,
          "coverage": 0.6667,
          "eligible": true,
          "averageScore": 3.862,
          "medianScore": 3.8,
          "confidenceLow": 3.767,
          "confidenceHigh": 3.956
        }
      }
    },
    {
      "animal": "horse",
      "values": {
        "all": {
          "animal": "horse",
          "cohortWineCount": 137,
          "wineCount": 106,
          "coverage": 0.7737,
          "eligible": true,
          "averageScore": 3.854,
          "medianScore": 3.9,
          "confidenceLow": 3.793,
          "confidenceHigh": 3.915
        },
        "red": {
          "animal": "horse",
          "cohortWineCount": 89,
          "wineCount": 74,
          "coverage": 0.8315,
          "eligible": true,
          "averageScore": 3.881,
          "medianScore": 3.9,
          "confidenceLow": 3.808,
          "confidenceHigh": 3.955
        },
        "white": {
          "animal": "horse",
          "cohortWineCount": 23,
          "wineCount": 15,
          "coverage": 0.6522,
          "eligible": true,
          "averageScore": 3.727,
          "medianScore": 3.8,
          "confidenceLow": 3.574,
          "confidenceHigh": 3.879
        },
        "rose": {
          "animal": "horse",
          "cohortWineCount": 5,
          "wineCount": 3,
          "coverage": 0.6,
          "eligible": false,
          "averageScore": 3.633,
          "medianScore": 3.6,
          "confidenceLow": 3.236,
          "confidenceHigh": 4.031
        },
        "sparkling": {
          "animal": "horse",
          "cohortWineCount": 20,
          "wineCount": 14,
          "coverage": 0.7,
          "eligible": true,
          "averageScore": 3.893,
          "medianScore": 3.95,
          "confidenceLow": 3.733,
          "confidenceHigh": 4.053
        }
      }
    },
    {
      "animal": "fox",
      "values": {
        "all": {
          "animal": "fox",
          "cohortWineCount": 6,
          "wineCount": 5,
          "coverage": 0.8333,
          "eligible": false,
          "averageScore": 3.74,
          "medianScore": 3.7,
          "confidenceLow": 3.52,
          "confidenceHigh": 3.96
        },
        "red": {
          "animal": "fox",
          "cohortWineCount": 4,
          "wineCount": 3,
          "coverage": 0.75,
          "eligible": false,
          "averageScore": 3.667,
          "medianScore": 3.5,
          "confidenceLow": 3.34,
          "confidenceHigh": 3.993
        },
        "white": {
          "animal": "fox",
          "cohortWineCount": 1,
          "wineCount": 1,
          "coverage": 1,
          "eligible": false,
          "averageScore": 4,
          "medianScore": 4
        },
        "rose": {
          "animal": "fox",
          "cohortWineCount": 0,
          "wineCount": 0,
          "coverage": 0,
          "eligible": false,
          "averageScore": null,
          "medianScore": null
        },
        "sparkling": {
          "animal": "fox",
          "cohortWineCount": 1,
          "wineCount": 1,
          "coverage": 1,
          "eligible": false,
          "averageScore": 3.7,
          "medianScore": 3.7
        }
      }
    }
  ]
};

export const referenceScores: Record<ScoreAnalysisKey, Record<WineTypeKey, number>> = {
  "primary": {
    "all": 3.791,
    "red": 3.828,
    "white": 3.756,
    "rose": 3.652,
    "sparkling": 3.774
  },
  "sensitivity": {
    "all": 3.835,
    "red": 3.879,
    "white": 3.781,
    "rose": 3.695,
    "sparkling": 3.795
  }
};

export const scoreDistributions: Record<ScoreAnalysisKey, Record<AnimalKey, Record<WineTypeKey, ScoreBin[]>>> = {
  "primary": {
    "lion": {
      "all": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 1
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 5
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 35
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 29
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 3
        }
      ],
      "red": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 1
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 4
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 13
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 15
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 3
        }
      ],
      "white": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 12
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 6
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "rose": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 1
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "sparkling": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 1
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 9
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 8
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ]
    },
    "pig": {
      "all": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 3
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 2
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 1
        }
      ],
      "red": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 2
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 2
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 1
        }
      ],
      "white": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 0
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "rose": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 1
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "sparkling": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 0
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ]
    },
    "deer": {
      "all": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 15
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 5
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "red": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 10
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 3
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "white": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 5
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 1
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "rose": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 0
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 1
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "sparkling": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 0
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ]
    },
    "bird": {
      "all": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 4
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 13
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 104
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 52
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 6
        }
      ],
      "red": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 5
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 46
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 32
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 5
        }
      ],
      "white": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 1
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 6
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 39
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 17
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "rose": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 3
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 2
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 2
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 2
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "sparkling": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 17
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 1
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 1
        }
      ]
    },
    "horse": {
      "all": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 4
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 32
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 19
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 2
        }
      ],
      "red": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 2
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 22
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 12
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 2
        }
      ],
      "white": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 1
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 6
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 1
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "rose": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 1
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 1
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "sparkling": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 3
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 6
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ]
    },
    "fox": {
      "all": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 3
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 1
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "red": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 2
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "white": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 0
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 1
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "rose": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 0
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "sparkling": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 1
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ]
    }
  },
  "sensitivity": {
    "lion": {
      "all": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 2
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 8
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 60
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 50
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 7
        }
      ],
      "red": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 1
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 6
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 29
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 29
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 7
        }
      ],
      "white": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 1
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 1
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 16
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 12
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "rose": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 4
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "sparkling": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 1
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 11
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 9
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ]
    },
    "pig": {
      "all": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 4
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 6
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 1
        }
      ],
      "red": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 2
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 6
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 1
        }
      ],
      "white": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 1
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "rose": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 1
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "sparkling": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 0
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ]
    },
    "deer": {
      "all": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 22
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 9
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "red": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 15
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 6
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "white": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 7
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 2
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "rose": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 0
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 1
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "sparkling": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 0
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ]
    },
    "bird": {
      "all": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 4
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 24
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 180
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 117
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 13
        }
      ],
      "red": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 15
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 86
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 76
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 10
        }
      ],
      "white": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 1
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 7
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 71
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 32
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 2
        }
      ],
      "rose": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 3
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 2
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 4
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 3
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "sparkling": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 19
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 6
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 1
        }
      ]
    },
    "horse": {
      "all": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 2
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 8
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 50
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 44
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 2
        }
      ],
      "red": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 2
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 4
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 34
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 32
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 2
        }
      ],
      "white": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 3
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 8
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 4
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "rose": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 1
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 1
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 1
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "sparkling": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 7
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 7
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ]
    },
    "fox": {
      "all": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 3
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 2
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "red": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 2
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 1
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "white": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 0
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 1
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "rose": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 0
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ],
      "sparkling": [
        {
          "x1": 2.5,
          "x2": 3,
          "count": 0
        },
        {
          "x1": 3,
          "x2": 3.5,
          "count": 0
        },
        {
          "x1": 3.5,
          "x2": 4,
          "count": 1
        },
        {
          "x1": 4,
          "x2": 4.5,
          "count": 0
        },
        {
          "x1": 4.5,
          "x2": 5,
          "count": 0
        }
      ]
    }
  }
};

export const explorerWines: ExplorerWineDatum[] = [
  {
    "id": "59268026",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "10331",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "red deer"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "12602",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "55625407",
    "wineType": "red",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24667007",
    "wineType": "red",
    "priceSek": 139,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "butterfly"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "426283",
    "wineType": "red",
    "priceSek": 79,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.1,
    "sensitivityScore": 3.1
  },
  {
    "id": "5737353",
    "wineType": "red",
    "priceSek": 97,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "zebra"
    ],
    "primaryScore": 3.3,
    "sensitivityScore": 3.3
  },
  {
    "id": "24555292",
    "wineType": "red",
    "priceSek": 89,
    "animalCategories": [
      "fox"
    ],
    "specificAnimals": [
      "fox"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "64087522",
    "wineType": "red",
    "priceSek": 89,
    "animalCategories": [
      "fox"
    ],
    "specificAnimals": [
      "fox"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "724689",
    "wineType": "red",
    "priceSek": 269,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "59657591",
    "wineType": "red",
    "priceSek": 89,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "793373",
    "wineType": "red",
    "priceSek": 77,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "584124",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "14024",
    "wineType": "red",
    "priceSek": 59,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "41559114",
    "wineType": "red",
    "priceSek": 209,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "7995",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "54414918",
    "wineType": "red",
    "priceSek": 109,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "elephant",
      "lion"
    ],
    "primaryScore": 2.7,
    "sensitivityScore": 2.7
  },
  {
    "id": "819205",
    "wineType": "red",
    "priceSek": 109,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "wild boar"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "24427019",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "33545904",
    "wineType": "red",
    "priceSek": 59,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "donkey"
    ],
    "primaryScore": null,
    "sensitivityScore": 2.8
  },
  {
    "id": "14224441",
    "wineType": "red",
    "priceSek": 37,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.4
  },
  {
    "id": "63196301",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "chick",
      "chicken"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "56637747",
    "wineType": "red",
    "priceSek": 239,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "27910162",
    "wineType": "red",
    "priceSek": 129,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.4
  },
  {
    "id": "29050024",
    "wineType": "red",
    "priceSek": 209,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "63402262",
    "wineType": "red",
    "priceSek": 126,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.4
  },
  {
    "id": "24493489",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "swan"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "25244702",
    "wineType": "red",
    "priceSek": 79,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "57944202",
    "wineType": "red",
    "priceSek": 89,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "cat"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "54961878",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "56377616",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "barn swallow"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "24440772",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "63914602",
    "wineType": "red",
    "priceSek": 79,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.3
  },
  {
    "id": "35561901",
    "wineType": "red",
    "priceSek": 215,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.4,
    "sensitivityScore": 3.4
  },
  {
    "id": "165264",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "537258",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "butterfly"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.5
  },
  {
    "id": "12413612",
    "wineType": "red",
    "priceSek": 169,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "pig"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "49614150",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bee",
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.5
  },
  {
    "id": "53865638",
    "wineType": "red",
    "priceSek": 139,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.5
  },
  {
    "id": "45332938",
    "wineType": "red",
    "priceSek": 309,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bee",
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "61402787",
    "wineType": "red",
    "priceSek": 120,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "670404",
    "wineType": "red",
    "priceSek": 109,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "807497",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "chicken"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "975717",
    "wineType": "red",
    "priceSek": 389,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4.3,
    "sensitivityScore": 4.3
  },
  {
    "id": "44818901",
    "wineType": "red",
    "priceSek": 79,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.3
  },
  {
    "id": "24656721",
    "wineType": "red",
    "priceSek": 159,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "24437804",
    "wineType": "red",
    "priceSek": 139,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "24528944",
    "wineType": "red",
    "priceSek": 120,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.1,
    "sensitivityScore": 3.1
  },
  {
    "id": "24623187",
    "wineType": "red",
    "priceSek": 124,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.2
  },
  {
    "id": "884325",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "25889988",
    "wineType": "red",
    "priceSek": 120,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "56578407",
    "wineType": "red",
    "priceSek": 89,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "35310842",
    "wineType": "red",
    "priceSek": 169,
    "animalCategories": [
      "bird",
      "lion"
    ],
    "specificAnimals": [
      "lion",
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.4
  },
  {
    "id": "16757940",
    "wineType": "red",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "duck"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "992180",
    "wineType": "red",
    "priceSek": 199,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "47907559",
    "wineType": "red",
    "priceSek": 89,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "49770967",
    "wineType": "red",
    "priceSek": 85,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.1,
    "sensitivityScore": 3.1
  },
  {
    "id": "64055717",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "62870410",
    "wineType": "red",
    "priceSek": 100,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "flamingo"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "1195001",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "24652523",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "pig"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "825755",
    "wineType": "red",
    "priceSek": 109,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "36728",
    "wineType": "red",
    "priceSek": 236,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.2
  },
  {
    "id": "24562262",
    "wineType": "red",
    "priceSek": 289,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "33192693",
    "wineType": "red",
    "priceSek": 95,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "872511",
    "wineType": "red",
    "priceSek": 289,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "41559333",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "53213434",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bee",
      "bird",
      "dog",
      "rabbit"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "44044197",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "butterfly",
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "63047377",
    "wineType": "red",
    "priceSek": 89,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "crane"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "55315106",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "40995138",
    "wineType": "red",
    "priceSek": 189,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "4603",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "10104546",
    "wineType": "red",
    "priceSek": 89,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "27205962",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "flamingo"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "48816441",
    "wineType": "red",
    "priceSek": 129,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "swallow"
    ],
    "primaryScore": 3.4,
    "sensitivityScore": 3.4
  },
  {
    "id": "57774312",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "42929388",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "24489832",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "zebra"
    ],
    "primaryScore": 3.4,
    "sensitivityScore": 3.4
  },
  {
    "id": "24625126",
    "wineType": "red",
    "priceSek": 179,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse",
      "human"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.5
  },
  {
    "id": "1869",
    "wineType": "red",
    "priceSek": 199,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "223331",
    "wineType": "red",
    "priceSek": 95,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "57754239",
    "wineType": "red",
    "priceSek": 169,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "53281305",
    "wineType": "red",
    "priceSek": 129,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "47124341",
    "wineType": "red",
    "priceSek": 249,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "24465337",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "21955617",
    "wineType": "red",
    "priceSek": 115,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "goose"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.2
  },
  {
    "id": "58720548",
    "wineType": "red",
    "priceSek": 199,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "24465442",
    "wineType": "red",
    "priceSek": 699,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "501905",
    "wineType": "red",
    "priceSek": 165,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "22789652",
    "wineType": "red",
    "priceSek": 90,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "9186911",
    "wineType": "red",
    "priceSek": 299,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "40034728",
    "wineType": "red",
    "priceSek": 159,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "57754193",
    "wineType": "red",
    "priceSek": 299,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "7331",
    "wineType": "red",
    "priceSek": 500,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "852707",
    "wineType": "red",
    "priceSek": 269,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "40090713",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "26296776",
    "wineType": "red",
    "priceSek": 89,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "crane"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "25491",
    "wineType": "red",
    "priceSek": 150,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "54313803",
    "wineType": "red",
    "priceSek": 179,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.2,
    "sensitivityScore": 3.2
  },
  {
    "id": "26382717",
    "wineType": "red",
    "priceSek": 89,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bullfinch"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.4
  },
  {
    "id": "60857915",
    "wineType": "red",
    "priceSek": 150,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "210851",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "fish"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "30148",
    "wineType": "red",
    "priceSek": 139,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird of prey"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "58526485",
    "wineType": "red",
    "priceSek": 249,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "64795749",
    "wineType": "red",
    "priceSek": 259,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "51879345",
    "wineType": "red",
    "priceSek": 129,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "chicken"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "25406398",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "chicken"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "874444",
    "wineType": "red",
    "priceSek": 89,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.2,
    "sensitivityScore": 3.2
  },
  {
    "id": "18221342",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "29777346",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "37415611",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24605705",
    "wineType": "red",
    "priceSek": 89,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "cat"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "44027717",
    "wineType": "red",
    "priceSek": 519,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "59993058",
    "wineType": "red",
    "priceSek": 329,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "326380",
    "wineType": "red",
    "priceSek": 229,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "17778",
    "wineType": "red",
    "priceSek": 129,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "26473",
    "wineType": "red",
    "priceSek": 279,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "54345028",
    "wineType": "red",
    "priceSek": 259,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "60796689",
    "wineType": "red",
    "priceSek": 249,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "35562363",
    "wineType": "red",
    "priceSek": 219,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "26294257",
    "wineType": "red",
    "priceSek": 249,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "60181735",
    "wineType": "red",
    "priceSek": 189,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "57079901",
    "wineType": "red",
    "priceSek": 289,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "64087984",
    "wineType": "red",
    "priceSek": 729,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "duck"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "58095017",
    "wineType": "red",
    "priceSek": 269,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "53387238",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster",
      "turtle"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "891225",
    "wineType": "red",
    "priceSek": 791,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4.6,
    "sensitivityScore": 4.6
  },
  {
    "id": "44988935",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "46558512",
    "wineType": "red",
    "priceSek": 2076,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "61835475",
    "wineType": "red",
    "priceSek": 159,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "42065072",
    "wineType": "red",
    "priceSek": 135,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "51117087",
    "wineType": "red",
    "priceSek": 789,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "38916082",
    "wineType": "red",
    "priceSek": 190,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "55315053",
    "wineType": "red",
    "priceSek": 999,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "duck"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.4
  },
  {
    "id": "58373376",
    "wineType": "red",
    "priceSek": 270,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "59993063",
    "wineType": "red",
    "priceSek": 695,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 4.4,
    "sensitivityScore": 4.4
  },
  {
    "id": "60583148",
    "wineType": "red",
    "priceSek": 259,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "51755364",
    "wineType": "red",
    "priceSek": 319,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "cat",
      "owl"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "54587933",
    "wineType": "red",
    "priceSek": 259,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "54587947",
    "wineType": "red",
    "priceSek": 1425,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.4
  },
  {
    "id": "56383362",
    "wineType": "red",
    "priceSek": 350,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "48504788",
    "wineType": "red",
    "priceSek": 1590,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.5
  },
  {
    "id": "54346584",
    "wineType": "red",
    "priceSek": 699,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "63899956",
    "wineType": "red",
    "priceSek": 242,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 2.9
  },
  {
    "id": "59733410",
    "wineType": "red",
    "priceSek": 265,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "60796727",
    "wineType": "red",
    "priceSek": 399,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "63545420",
    "wineType": "red",
    "priceSek": 499,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "boar"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "60794514",
    "wineType": "red",
    "priceSek": 289,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "54166396",
    "wineType": "red",
    "priceSek": 300,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer",
      "dragon"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "55926559",
    "wineType": "red",
    "priceSek": 179,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "zebra"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "52495265",
    "wineType": "red",
    "priceSek": 2749,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.5,
    "sensitivityScore": 4.5
  },
  {
    "id": "52718528",
    "wineType": "red",
    "priceSek": 399,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "37094304",
    "wineType": "red",
    "priceSek": 9401,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "46660635",
    "wineType": "red",
    "priceSek": 439,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "58094987",
    "wineType": "red",
    "priceSek": 250,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "55905628",
    "wineType": "red",
    "priceSek": 10999,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": 4.6,
    "sensitivityScore": 4.6
  },
  {
    "id": "58094917",
    "wineType": "red",
    "priceSek": 2349,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "peacock"
    ],
    "primaryScore": 4.5,
    "sensitivityScore": 4.5
  },
  {
    "id": "59733465",
    "wineType": "red",
    "priceSek": 2559,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 4.4,
    "sensitivityScore": 4.4
  },
  {
    "id": "24623601",
    "wineType": "red",
    "priceSek": 3799,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.4,
    "sensitivityScore": 4.4
  },
  {
    "id": "46660631",
    "wineType": "red",
    "priceSek": 549,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "49613790",
    "wineType": "red",
    "priceSek": 139,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "59993091",
    "wineType": "red",
    "priceSek": 159,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "51095458",
    "wineType": "red",
    "priceSek": 2559,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.4
  },
  {
    "id": "53663711",
    "wineType": "red",
    "priceSek": 949,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.4
  },
  {
    "id": "54453722",
    "wineType": "red",
    "priceSek": 849,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.3,
    "sensitivityScore": 4.3
  },
  {
    "id": "40316807",
    "wineType": "red",
    "priceSek": 21499,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.5
  },
  {
    "id": "41724044",
    "wineType": "red",
    "priceSek": 799,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "collared dove"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "55583216",
    "wineType": "red",
    "priceSek": 9199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.5
  },
  {
    "id": "55617825",
    "wineType": "red",
    "priceSek": 7599,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.5
  },
  {
    "id": "58066353",
    "wineType": "red",
    "priceSek": 849,
    "animalCategories": [
      "bird",
      "horse",
      "pig"
    ],
    "specificAnimals": [
      "dog",
      "elephant",
      "fish",
      "horse",
      "pig",
      "rabbit",
      "rooster"
    ],
    "primaryScore": 4.5,
    "sensitivityScore": 4.5
  },
  {
    "id": "58511874",
    "wineType": "red",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "29988600",
    "wineType": "red",
    "priceSek": 18628,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.5
  },
  {
    "id": "59260559",
    "wineType": "red",
    "priceSek": 849,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "pheasant"
    ],
    "primaryScore": 4.4,
    "sensitivityScore": 4.4
  },
  {
    "id": "61555646",
    "wineType": "red",
    "priceSek": 569,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "35910502",
    "wineType": "red",
    "priceSek": 829,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "35910505",
    "wineType": "red",
    "priceSek": 829,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "35910511",
    "wineType": "red",
    "priceSek": 829,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "35910518",
    "wineType": "red",
    "priceSek": 959,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "52495268",
    "wineType": "red",
    "priceSek": 5999,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.6,
    "sensitivityScore": 4.6
  },
  {
    "id": "54457443",
    "wineType": "red",
    "priceSek": 1299,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "43872348",
    "wineType": "red",
    "priceSek": 2669,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "31353437",
    "wineType": "red",
    "priceSek": 5699,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.6
  },
  {
    "id": "32193355",
    "wineType": "red",
    "priceSek": 499,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "39642903",
    "wineType": "red",
    "priceSek": 155,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "44996315",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "47345546",
    "wineType": "red",
    "priceSek": 249,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "54344621",
    "wineType": "red",
    "priceSek": 189,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "54346919",
    "wineType": "red",
    "priceSek": 729,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "54346999",
    "wineType": "red",
    "priceSek": 259,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "donkey"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "54588030",
    "wineType": "red",
    "priceSek": 1099,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "boar"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "54946282",
    "wineType": "red",
    "priceSek": 649,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "61445929",
    "wineType": "red",
    "priceSek": 239,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "61835372",
    "wineType": "red",
    "priceSek": 249,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "56088700",
    "wineType": "red",
    "priceSek": 279,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "vulture"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "56357735",
    "wineType": "red",
    "priceSek": 489,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "56416022",
    "wineType": "red",
    "priceSek": 499,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "duck"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "56583532",
    "wineType": "red",
    "priceSek": 225,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "62243060",
    "wineType": "red",
    "priceSek": 362,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "swan"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "38581309",
    "wineType": "red",
    "priceSek": 831,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "40315698",
    "wineType": "red",
    "priceSek": 1699,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "40316952",
    "wineType": "red",
    "priceSek": 2799,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "40600141",
    "wineType": "red",
    "priceSek": 1439,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.6
  },
  {
    "id": "40760163",
    "wineType": "red",
    "priceSek": 2599,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.3,
    "sensitivityScore": 4.3
  },
  {
    "id": "40760213",
    "wineType": "red",
    "priceSek": 899,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "56638278",
    "wineType": "red",
    "priceSek": 299,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "dragon",
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "58066188",
    "wineType": "red",
    "priceSek": 399,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "58373011",
    "wineType": "red",
    "priceSek": 689,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "58373016",
    "wineType": "red",
    "priceSek": 689,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "58373381",
    "wineType": "red",
    "priceSek": 689,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "58373396",
    "wineType": "red",
    "priceSek": 689,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse",
      "snake"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "58373513",
    "wineType": "red",
    "priceSek": 1389,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "65010116",
    "wineType": "red",
    "priceSek": 652,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "65010122",
    "wineType": "red",
    "priceSek": 652,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "65010123",
    "wineType": "red",
    "priceSek": 549,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "winged lion"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "65010140",
    "wineType": "red",
    "priceSek": 599,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "65010148",
    "wineType": "red",
    "priceSek": 489,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "59733046",
    "wineType": "red",
    "priceSek": 519,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "59733049",
    "wineType": "red",
    "priceSek": 169,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "59733057",
    "wineType": "red",
    "priceSek": 379,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "59733444",
    "wineType": "red",
    "priceSek": 3879,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": 4.5,
    "sensitivityScore": 4.5
  },
  {
    "id": "59993113",
    "wineType": "red",
    "priceSek": 299,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "60796081",
    "wineType": "red",
    "priceSek": 5999,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.6,
    "sensitivityScore": 4.6
  },
  {
    "id": "60796660",
    "wineType": "red",
    "priceSek": 599,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "24393999",
    "wineType": "red",
    "priceSek": 499,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "pheasant"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "47213082",
    "wineType": "red",
    "priceSek": 599,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4.3,
    "sensitivityScore": 4.3
  },
  {
    "id": "47397347",
    "wineType": "red",
    "priceSek": 1599,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.5
  },
  {
    "id": "48080621",
    "wineType": "red",
    "priceSek": 239,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "56637178",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "59273323",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "61446080",
    "wineType": "red",
    "priceSek": 94,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "60624105",
    "wineType": "red",
    "priceSek": 199,
    "animalCategories": [
      "fox"
    ],
    "specificAnimals": [
      "fox"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "48646916",
    "wineType": "red",
    "priceSek": 59,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "35917092",
    "wineType": "red",
    "priceSek": 179,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "59497956",
    "wineType": "red",
    "priceSek": 269,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "58088919",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "snake"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "52979769",
    "wineType": "red",
    "priceSek": 59,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "crane"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "59268230",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "51344877",
    "wineType": "red",
    "priceSek": 179,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": 3.2,
    "sensitivityScore": 3.2
  },
  {
    "id": "55624965",
    "wineType": "red",
    "priceSek": 215,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "42061932",
    "wineType": "red",
    "priceSek": 69,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "56080403",
    "wineType": "red",
    "priceSek": 299,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "52979645",
    "wineType": "red",
    "priceSek": 249,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "55930214",
    "wineType": "red",
    "priceSek": 199,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "40996408",
    "wineType": "red",
    "priceSek": 179,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.5
  },
  {
    "id": "46669576",
    "wineType": "red",
    "priceSek": 249,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "62112247",
    "wineType": "red",
    "priceSek": 79,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "donkey"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "35917214",
    "wineType": "red",
    "priceSek": 299,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "64887195",
    "wineType": "red",
    "priceSek": 179,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "56004076",
    "wineType": "red",
    "priceSek": 200,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "20898440",
    "wineType": "red",
    "priceSek": 759,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "30492048",
    "wineType": "red",
    "priceSek": 339,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "7378210",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "duck"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "770678",
    "wineType": "red",
    "priceSek": 139,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "donkey"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "60625714",
    "wineType": "red",
    "priceSek": 169,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "red deer"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "51101932",
    "wineType": "red",
    "priceSek": 549,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "dove"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "51463749",
    "wineType": "red",
    "priceSek": 799,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "517435",
    "wineType": "red",
    "priceSek": 159,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "goose"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "5305614",
    "wineType": "red",
    "priceSek": 239,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "53527284",
    "wineType": "red",
    "priceSek": 189,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "donkey",
      "human"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "14276702",
    "wineType": "red",
    "priceSek": 409,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "1147355",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "1150157",
    "wineType": "red",
    "priceSek": 191,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "1150160",
    "wineType": "red",
    "priceSek": 191,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "49877934",
    "wineType": "red",
    "priceSek": 189,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "snail"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "50122445",
    "wineType": "red",
    "priceSek": 139,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "50315975",
    "wineType": "red",
    "priceSek": 209,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "pigeon"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "34362400",
    "wineType": "red",
    "priceSek": 170,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "34996141",
    "wineType": "red",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "35898817",
    "wineType": "red",
    "priceSek": 156,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "24516566",
    "wineType": "red",
    "priceSek": 240,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "24526462",
    "wineType": "red",
    "priceSek": 199,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "donkey",
      "horse"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "24552478",
    "wineType": "red",
    "priceSek": 169,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "boar"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "65996129",
    "wineType": "red",
    "priceSek": 219,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "crane"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "65996170",
    "wineType": "red",
    "priceSek": 179,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24658734",
    "wineType": "red",
    "priceSek": 179,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "9190496",
    "wineType": "red",
    "priceSek": 139,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "36798070",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "37259537",
    "wineType": "red",
    "priceSek": 164,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "737780",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "64885562",
    "wineType": "red",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.4,
    "sensitivityScore": 3.4
  },
  {
    "id": "46648448",
    "wineType": "red",
    "priceSek": 139,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "frog"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "32998354",
    "wineType": "red",
    "priceSek": 339,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "33024701",
    "wineType": "red",
    "priceSek": 194,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "24627286",
    "wineType": "red",
    "priceSek": 150,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "24650666",
    "wineType": "red",
    "priceSek": 141,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24675813",
    "wineType": "red",
    "priceSek": 309,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "dove"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "24680614",
    "wineType": "red",
    "priceSek": 129,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "24396899",
    "wineType": "red",
    "priceSek": 129,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24411489",
    "wineType": "red",
    "priceSek": 349,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "pig"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "50275561",
    "wineType": "red",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "1017325",
    "wineType": "red",
    "priceSek": 159,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "498385",
    "wineType": "red",
    "priceSek": 369,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "boar"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "41770304",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "55617824",
    "wineType": "red",
    "priceSek": 4399,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.4
  },
  {
    "id": "56622242",
    "wineType": "red",
    "priceSek": 129,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "butterfly"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.4
  },
  {
    "id": "42136",
    "wineType": "red",
    "priceSek": 229,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "43082966",
    "wineType": "red",
    "priceSek": 105,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "44044050",
    "wineType": "red",
    "priceSek": 519,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "810367",
    "wineType": "red",
    "priceSek": 139,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "850372",
    "wineType": "red",
    "priceSek": 189,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "857333",
    "wineType": "red",
    "priceSek": 399,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "8624272",
    "wineType": "red",
    "priceSek": 309,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "cherub",
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24354703",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "24692041",
    "wineType": "red",
    "priceSek": 199,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "47906853",
    "wineType": "red",
    "priceSek": 179,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "pigeon"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "1028601",
    "wineType": "red",
    "priceSek": 699,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "51335093",
    "wineType": "red",
    "priceSek": 799,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "1156141",
    "wineType": "red",
    "priceSek": 219,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "12107499",
    "wineType": "red",
    "priceSek": 129,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "45851958",
    "wineType": "red",
    "priceSek": 1849,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.5
  },
  {
    "id": "16803873",
    "wineType": "red",
    "priceSek": 801,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "58851380",
    "wineType": "red",
    "priceSek": 300,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "great tit"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "58880109",
    "wineType": "red",
    "priceSek": 1099,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "58880474",
    "wineType": "red",
    "priceSek": 497,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer",
      "rabbit"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "59268164",
    "wineType": "red",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "593145",
    "wineType": "red",
    "priceSek": 289,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "59430142",
    "wineType": "red",
    "priceSek": 445,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "48081009",
    "wineType": "red",
    "priceSek": 126,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "48129",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "chicken",
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "55085461",
    "wineType": "red",
    "priceSek": 1299,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.4
  },
  {
    "id": "55617823",
    "wineType": "red",
    "priceSek": 2999,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "55621974",
    "wineType": "red",
    "priceSek": 479,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "61258412",
    "wineType": "red",
    "priceSek": 249,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "61259804",
    "wineType": "red",
    "priceSek": 389,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "50088504",
    "wineType": "red",
    "priceSek": 179,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "502941",
    "wineType": "red",
    "priceSek": 1799,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "50376430",
    "wineType": "red",
    "priceSek": 196,
    "animalCategories": [
      "bird",
      "fox",
      "pig"
    ],
    "specificAnimals": [
      "dragon",
      "fox",
      "owl",
      "rabbit",
      "wild boar"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "50376439",
    "wineType": "red",
    "priceSek": 262,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "50554068",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "50778531",
    "wineType": "red",
    "priceSek": 365,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "52173575",
    "wineType": "red",
    "priceSek": 449,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "52493160",
    "wineType": "red",
    "priceSek": 291,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "35543111",
    "wineType": "red",
    "priceSek": 295,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "35713990",
    "wineType": "red",
    "priceSek": 259,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "35898796",
    "wineType": "red",
    "priceSek": 156,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "35910926",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "rabbit"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "36513968",
    "wineType": "red",
    "priceSek": 209,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "54456792",
    "wineType": "red",
    "priceSek": 679,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "37516205",
    "wineType": "red",
    "priceSek": 179,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "37516795",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "34716884",
    "wineType": "red",
    "priceSek": 329,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "swan"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "34733294",
    "wineType": "red",
    "priceSek": 189,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "butterfly",
      "fish",
      "rooster"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "35308098",
    "wineType": "red",
    "priceSek": 339,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "58088788",
    "wineType": "red",
    "priceSek": 229,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "58088797",
    "wineType": "red",
    "priceSek": 229,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "38404",
    "wineType": "red",
    "priceSek": 419,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "38744821",
    "wineType": "red",
    "priceSek": 499,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "25754838",
    "wineType": "red",
    "priceSek": 795,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "25882610",
    "wineType": "red",
    "priceSek": 269,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "26130002",
    "wineType": "red",
    "priceSek": 236,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "27045248",
    "wineType": "red",
    "priceSek": 240,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "59732338",
    "wineType": "red",
    "priceSek": 499,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "28408099",
    "wineType": "red",
    "priceSek": 344,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "28647299",
    "wineType": "red",
    "priceSek": 649,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "24490502",
    "wineType": "red",
    "priceSek": 599,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 4.3,
    "sensitivityScore": 4.3
  },
  {
    "id": "24500835",
    "wineType": "red",
    "priceSek": 12499,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": 4.5,
    "sensitivityScore": 4.5
  },
  {
    "id": "41559148",
    "wineType": "red",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "peacock"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "24521518",
    "wineType": "red",
    "priceSek": 239,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "donkey"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "31968135",
    "wineType": "red",
    "priceSek": 159,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "32676642",
    "wineType": "red",
    "priceSek": 449,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "3316840",
    "wineType": "red",
    "priceSek": 316,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "24563918",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "24564222",
    "wineType": "red",
    "priceSek": 219,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "24564224",
    "wineType": "red",
    "priceSek": 199,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "23475477",
    "wineType": "red",
    "priceSek": 199,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "24386944",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "24581186",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "24583092",
    "wineType": "red",
    "priceSek": 529,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "boar"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "24583093",
    "wineType": "red",
    "priceSek": 329,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "wild boar"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "24594134",
    "wineType": "red",
    "priceSek": 159,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "24594135",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "57585609",
    "wineType": "red",
    "priceSek": 399,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "57585631",
    "wineType": "red",
    "priceSek": 519,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "24450383",
    "wineType": "red",
    "priceSek": 269,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "24452894",
    "wineType": "red",
    "priceSek": 269,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "62690660",
    "wineType": "red",
    "priceSek": 239,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "62754606",
    "wineType": "red",
    "priceSek": 495,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "62754622",
    "wineType": "red",
    "priceSek": 249,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "40945",
    "wineType": "red",
    "priceSek": 200,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "4102308",
    "wineType": "red",
    "priceSek": 110,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "63290427",
    "wineType": "red",
    "priceSek": 129,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.4
  },
  {
    "id": "64087590",
    "wineType": "red",
    "priceSek": 649,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.3,
    "sensitivityScore": 4.3
  },
  {
    "id": "64605422",
    "wineType": "red",
    "priceSek": 279,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "65002676",
    "wineType": "red",
    "priceSek": 269,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "65010207",
    "wineType": "red",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "65345020",
    "wineType": "red",
    "priceSek": 395,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.3
  },
  {
    "id": "732331",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "cat",
      "dog",
      "fish"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "740010",
    "wineType": "red",
    "priceSek": 229,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "duck"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "740251",
    "wineType": "red",
    "priceSek": 712,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4.3,
    "sensitivityScore": 4.3
  },
  {
    "id": "809276",
    "wineType": "red",
    "priceSek": 229,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "834036",
    "wineType": "red",
    "priceSek": 305,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "659175",
    "wineType": "red",
    "priceSek": 119,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "66494561",
    "wineType": "red",
    "priceSek": 248,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "344009",
    "wineType": "red",
    "priceSek": 219,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "761183",
    "wineType": "red",
    "priceSek": 235,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "46243378",
    "wineType": "red",
    "priceSek": 139,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "46243431",
    "wineType": "red",
    "priceSek": 219,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "duck"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "46449901",
    "wineType": "red",
    "priceSek": 689,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "54643743",
    "wineType": "red",
    "priceSek": 215,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "54661637",
    "wineType": "red",
    "priceSek": 109,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "54661794",
    "wineType": "red",
    "priceSek": 299,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "dog"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "28897950",
    "wineType": "red",
    "priceSek": 131,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "10616294",
    "wineType": "red",
    "priceSek": 499,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "duck"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "24654227",
    "wineType": "red",
    "priceSek": 172,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "swan"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "31380694",
    "wineType": "red",
    "priceSek": 649,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "24513481",
    "wineType": "red",
    "priceSek": 350,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "24513482",
    "wineType": "red",
    "priceSek": 599,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "24533062",
    "wineType": "red",
    "priceSek": 819,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.3,
    "sensitivityScore": 4.3
  },
  {
    "id": "24427040",
    "wineType": "red",
    "priceSek": 319,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "24428194",
    "wineType": "red",
    "priceSek": 309,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "24576365",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "45674397",
    "wineType": "red",
    "priceSek": 139,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24665803",
    "wineType": "red",
    "priceSek": 1709,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "gull"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "24666722",
    "wineType": "red",
    "priceSek": 452,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "chicken",
      "cow"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "24667562",
    "wineType": "red",
    "priceSek": 396,
    "animalCategories": [
      "bird",
      "lion"
    ],
    "specificAnimals": [
      "eagle",
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "24669309",
    "wineType": "red",
    "priceSek": 279,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "crane"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "24672098",
    "wineType": "red",
    "priceSek": 353,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24672105",
    "wineType": "red",
    "priceSek": 259,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24675817",
    "wineType": "red",
    "priceSek": 159,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "24627526",
    "wineType": "red",
    "priceSek": 159,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "24635108",
    "wineType": "red",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "48968054",
    "wineType": "red",
    "priceSek": 99,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "27738641",
    "wineType": "red",
    "priceSek": 299,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "688647",
    "wineType": "red",
    "priceSek": 209,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "690904",
    "wineType": "red",
    "priceSek": 799,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "715883",
    "wineType": "red",
    "priceSek": 289,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "30641421",
    "wineType": "red",
    "priceSek": 269,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "30641664",
    "wineType": "red",
    "priceSek": 145,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "goose"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "58719914",
    "wineType": "red",
    "priceSek": 199,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "987803",
    "wineType": "red",
    "priceSek": 499,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "992214",
    "wineType": "red",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "16912819",
    "wineType": "red",
    "priceSek": 400,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "18651938",
    "wineType": "red",
    "priceSek": 679,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "5305606",
    "wineType": "red",
    "priceSek": 125,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "53386783",
    "wineType": "red",
    "priceSek": 233,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "53386805",
    "wineType": "red",
    "priceSek": 294,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.3,
    "sensitivityScore": 4.3
  },
  {
    "id": "54148405",
    "wineType": "red",
    "priceSek": 959,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "903619",
    "wineType": "red",
    "priceSek": 339,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "915387",
    "wineType": "red",
    "priceSek": 219,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "vulture"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24598167",
    "wineType": "red",
    "priceSek": 249,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "magpie"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "59273326",
    "wineType": "white",
    "priceSek": 249,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.5
  },
  {
    "id": "426293",
    "wineType": "white",
    "priceSek": 79,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 2.7
  },
  {
    "id": "49260068",
    "wineType": "white",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "213922",
    "wineType": "white",
    "priceSek": 87,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 2.8,
    "sensitivityScore": 2.8
  },
  {
    "id": "37146",
    "wineType": "white",
    "priceSek": 49,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.2
  },
  {
    "id": "635382",
    "wineType": "white",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "7433",
    "wineType": "white",
    "priceSek": 79,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "hummingbird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "1168752",
    "wineType": "white",
    "priceSek": 135,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "kingfisher"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "58879956",
    "wineType": "white",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "58088934",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "8174",
    "wineType": "white",
    "priceSek": 95,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "38953743",
    "wineType": "white",
    "priceSek": 159,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "chicken",
      "hummingbird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.5
  },
  {
    "id": "199247",
    "wineType": "white",
    "priceSek": 129,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "dog"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "59718650",
    "wineType": "white",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "675392",
    "wineType": "white",
    "priceSek": 79,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "34362454",
    "wineType": "white",
    "priceSek": 209,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "14025",
    "wineType": "white",
    "priceSek": 59,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "621268",
    "wineType": "white",
    "priceSek": 82,
    "animalCategories": [
      "bird",
      "deer"
    ],
    "specificAnimals": [
      "deer",
      "goose"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "49439594",
    "wineType": "white",
    "priceSek": 69,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24574461",
    "wineType": "white",
    "priceSek": 195,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "butterfly",
      "dog",
      "fish"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "20338362",
    "wineType": "white",
    "priceSek": 249,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.4
  },
  {
    "id": "56416009",
    "wineType": "white",
    "priceSek": 300,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "626234",
    "wineType": "white",
    "priceSek": 99,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "62230516",
    "wineType": "white",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "64087613",
    "wineType": "white",
    "priceSek": 94,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "31986597",
    "wineType": "white",
    "priceSek": 99,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.4
  },
  {
    "id": "24504507",
    "wineType": "white",
    "priceSek": 139,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "51878164",
    "wineType": "white",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "penguin"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "434548",
    "wineType": "white",
    "priceSek": 79,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.4
  },
  {
    "id": "61937824",
    "wineType": "white",
    "priceSek": 139,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "24693800",
    "wineType": "white",
    "priceSek": 179,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "33566470",
    "wineType": "white",
    "priceSek": 214,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "1101069",
    "wineType": "white",
    "priceSek": 85,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "24717",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "penguin"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "64083454",
    "wineType": "white",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "48962781",
    "wineType": "white",
    "priceSek": 94,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "35714454",
    "wineType": "white",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.4,
    "sensitivityScore": 3.4
  },
  {
    "id": "14719",
    "wineType": "white",
    "priceSek": 219,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "butterfly",
      "hummingbird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "4263261",
    "wineType": "white",
    "priceSek": 129,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "1147430",
    "wineType": "white",
    "priceSek": 139,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "40377952",
    "wineType": "white",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "blue tit"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "3201",
    "wineType": "white",
    "priceSek": 99,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "27485",
    "wineType": "white",
    "priceSek": 119,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "35720",
    "wineType": "white",
    "priceSek": 75,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.4,
    "sensitivityScore": 3.4
  },
  {
    "id": "731307",
    "wineType": "white",
    "priceSek": 129,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "7682127",
    "wineType": "white",
    "priceSek": 115,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "899181",
    "wineType": "white",
    "priceSek": 79,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "giraffe",
      "monkey",
      "warthog"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "53496832",
    "wineType": "white",
    "priceSek": 120,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "24457282",
    "wineType": "white",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "697035",
    "wineType": "white",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "15671",
    "wineType": "white",
    "priceSek": 69,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "869029",
    "wineType": "white",
    "priceSek": 799,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "15007776",
    "wineType": "white",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "1099900",
    "wineType": "white",
    "priceSek": 159,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "1028718",
    "wineType": "white",
    "priceSek": 319,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "48616920",
    "wineType": "white",
    "priceSek": 79,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "42610322",
    "wineType": "white",
    "priceSek": 49,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "741805",
    "wineType": "white",
    "priceSek": 79,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "peacock"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "60857918",
    "wineType": "white",
    "priceSek": 249,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "56148508",
    "wineType": "white",
    "priceSek": 200,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "37313203",
    "wineType": "white",
    "priceSek": 259,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "duck"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "61445952",
    "wineType": "white",
    "priceSek": 269,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "39224614",
    "wineType": "white",
    "priceSek": 179,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "49770958",
    "wineType": "white",
    "priceSek": 159,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "1053859",
    "wineType": "white",
    "priceSek": 129,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "62418685",
    "wineType": "white",
    "priceSek": 269,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "63402286",
    "wineType": "white",
    "priceSek": 300,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "20465611",
    "wineType": "white",
    "priceSek": 159,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "pig"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "60188439",
    "wineType": "white",
    "priceSek": 329,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bee",
      "quail",
      "squid"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "60796722",
    "wineType": "white",
    "priceSek": 330,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "60796682",
    "wineType": "white",
    "priceSek": 229,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "parrot"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "55926550",
    "wineType": "white",
    "priceSek": 249,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "56383863",
    "wineType": "white",
    "priceSek": 249,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "49380996",
    "wineType": "white",
    "priceSek": 469,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "49878039",
    "wineType": "white",
    "priceSek": 754,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "60625380",
    "wineType": "white",
    "priceSek": 499,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "40087221",
    "wineType": "white",
    "priceSek": 579,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "56416028",
    "wineType": "white",
    "priceSek": 189,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "56821599",
    "wineType": "white",
    "priceSek": 649,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "56821600",
    "wineType": "white",
    "priceSek": 799,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "56829637",
    "wineType": "white",
    "priceSek": 899,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "47345571",
    "wineType": "white",
    "priceSek": 799,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "62239769",
    "wineType": "white",
    "priceSek": 352,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "red deer"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "61397236",
    "wineType": "white",
    "priceSek": 349,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "61937697",
    "wineType": "white",
    "priceSek": 369,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "62030706",
    "wineType": "white",
    "priceSek": 219,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "24421999",
    "wineType": "white",
    "priceSek": 179,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "60583295",
    "wineType": "white",
    "priceSek": 599,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "53527438",
    "wineType": "white",
    "priceSek": 350,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "53533198",
    "wineType": "white",
    "priceSek": 391,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "54166382",
    "wineType": "white",
    "priceSek": 232,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.4,
    "sensitivityScore": 3.4
  },
  {
    "id": "54346611",
    "wineType": "white",
    "priceSek": 399,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "46660678",
    "wineType": "white",
    "priceSek": 769,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "55617834",
    "wineType": "white",
    "priceSek": 11999,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.6
  },
  {
    "id": "56148717",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "59260569",
    "wineType": "white",
    "priceSek": 299,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "59718565",
    "wineType": "white",
    "priceSek": 299,
    "animalCategories": [
      "fox"
    ],
    "specificAnimals": [
      "fox"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "59732972",
    "wineType": "white",
    "priceSek": 159,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "62202469",
    "wineType": "white",
    "priceSek": 1099,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "53883066",
    "wineType": "white",
    "priceSek": 419,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "37415575",
    "wineType": "white",
    "priceSek": 1499,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "swan"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "37661190",
    "wineType": "white",
    "priceSek": 450,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 4.4,
    "sensitivityScore": 4.4
  },
  {
    "id": "58094990",
    "wineType": "white",
    "priceSek": 189,
    "animalCategories": [
      "bird",
      "deer"
    ],
    "specificAnimals": [
      "bird",
      "deer"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "62239842",
    "wineType": "white",
    "priceSek": 125,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "64088691",
    "wineType": "white",
    "priceSek": 697,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "31835390",
    "wineType": "white",
    "priceSek": 179,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "24405939",
    "wineType": "white",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "61066718",
    "wineType": "white",
    "priceSek": 88,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "64267761",
    "wineType": "white",
    "priceSek": 89,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "moose"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "54962426",
    "wineType": "white",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "51336606",
    "wineType": "white",
    "priceSek": 139,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "24625484",
    "wineType": "white",
    "priceSek": 115,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "butterfly"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "440891",
    "wineType": "white",
    "priceSek": 149,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "10362786",
    "wineType": "white",
    "priceSek": 219,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "11418795",
    "wineType": "white",
    "priceSek": 219,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "52979758",
    "wineType": "white",
    "priceSek": 59,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "ibis"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "27400785",
    "wineType": "white",
    "priceSek": 76,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "36442336",
    "wineType": "white",
    "priceSek": 219,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "ostrich"
    ],
    "primaryScore": 3,
    "sensitivityScore": 3
  },
  {
    "id": "34419738",
    "wineType": "white",
    "priceSek": 79,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "crow",
      "spider"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "49882440",
    "wineType": "white",
    "priceSek": 159,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "49882445",
    "wineType": "white",
    "priceSek": 109,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "35713967",
    "wineType": "white",
    "priceSek": 379,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "crane"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "44089854",
    "wineType": "white",
    "priceSek": 150,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.4,
    "sensitivityScore": 3.4
  },
  {
    "id": "1154680",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "24658737",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "45674478",
    "wineType": "white",
    "priceSek": 129,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "hummingbird"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "46284610",
    "wineType": "white",
    "priceSek": 270,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "butterfly",
      "owl"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "46648465",
    "wineType": "white",
    "priceSek": 139,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "frog"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "558430",
    "wineType": "white",
    "priceSek": 219,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "52066573",
    "wineType": "white",
    "priceSek": 149,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.5
  },
  {
    "id": "53665802",
    "wineType": "white",
    "priceSek": 179,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "54456851",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "frog",
      "hummingbird"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "34707465",
    "wineType": "white",
    "priceSek": 243,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "34857221",
    "wineType": "white",
    "priceSek": 180,
    "animalCategories": [
      "bird",
      "horse"
    ],
    "specificAnimals": [
      "eagle",
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "35542846",
    "wineType": "white",
    "priceSek": 159,
    "animalCategories": [
      "bird",
      "horse"
    ],
    "specificAnimals": [
      "chicken",
      "donkey"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "43596804",
    "wineType": "white",
    "priceSek": 109,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "57723767",
    "wineType": "white",
    "priceSek": 159,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "63291611",
    "wineType": "white",
    "priceSek": 169,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "64267324",
    "wineType": "white",
    "priceSek": 239,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "64885553",
    "wineType": "white",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "760891",
    "wineType": "white",
    "priceSek": 165,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "24703665",
    "wineType": "white",
    "priceSek": 229,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "donkey",
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "27817843",
    "wineType": "white",
    "priceSek": 629,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.3,
    "sensitivityScore": 4.3
  },
  {
    "id": "3066213",
    "wineType": "white",
    "priceSek": 259,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "313296",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24518949",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "47397218",
    "wineType": "white",
    "priceSek": 219,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "47545739",
    "wineType": "white",
    "priceSek": 209,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "frog"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "50315976",
    "wineType": "white",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "52281526",
    "wineType": "white",
    "priceSek": 49,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "zebra"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "58880460",
    "wineType": "white",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "14847286",
    "wineType": "white",
    "priceSek": 130,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "58880004",
    "wineType": "white",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "38894",
    "wineType": "white",
    "priceSek": 115,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "62690669",
    "wineType": "white",
    "priceSek": 259,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "9055878",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "24594663",
    "wineType": "white",
    "priceSek": 79,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": 3.4,
    "sensitivityScore": 3.4
  },
  {
    "id": "64795770",
    "wineType": "white",
    "priceSek": 189,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "44673801",
    "wineType": "white",
    "priceSek": 109,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "wild boar"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "51879348",
    "wineType": "white",
    "priceSek": 252,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "53883167",
    "wineType": "white",
    "priceSek": 115,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "54344590",
    "wineType": "white",
    "priceSek": 149,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "60976218",
    "wineType": "white",
    "priceSek": 159,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "butterfly"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "61258404",
    "wineType": "white",
    "priceSek": 249,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "56125456",
    "wineType": "white",
    "priceSek": 175,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "56524979",
    "wineType": "white",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "49878018",
    "wineType": "white",
    "priceSek": 1999,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.4
  },
  {
    "id": "49878030",
    "wineType": "white",
    "priceSek": 969,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.4
  },
  {
    "id": "49878031",
    "wineType": "white",
    "priceSek": 1049,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.4
  },
  {
    "id": "49878040",
    "wineType": "white",
    "priceSek": 319,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "1187884",
    "wineType": "white",
    "priceSek": 189,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "36781401",
    "wineType": "white",
    "priceSek": 502,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "36798084",
    "wineType": "white",
    "priceSek": 399,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "189573",
    "wineType": "white",
    "priceSek": 129,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "20321353",
    "wineType": "white",
    "priceSek": 269,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "20975703",
    "wineType": "white",
    "priceSek": 129,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "34733115",
    "wineType": "white",
    "priceSek": 276,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "3485799",
    "wineType": "white",
    "priceSek": 229,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "39204137",
    "wineType": "white",
    "priceSek": 160,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "35898799",
    "wineType": "white",
    "priceSek": 156,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": 3.4,
    "sensitivityScore": 3.4
  },
  {
    "id": "35911519",
    "wineType": "white",
    "priceSek": 189,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "35917241",
    "wineType": "white",
    "priceSek": 289,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "58715238",
    "wineType": "white",
    "priceSek": 89,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "37878792",
    "wineType": "white",
    "priceSek": 159,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "pig"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "59732353",
    "wineType": "white",
    "priceSek": 479,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "38632323",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "28897594",
    "wineType": "white",
    "priceSek": 275,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "291939",
    "wineType": "white",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "chicken",
      "rooster"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "24571912",
    "wineType": "white",
    "priceSek": 239,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "318042",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "fish"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "32682234",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.5
  },
  {
    "id": "33191271",
    "wineType": "white",
    "priceSek": 69,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "swallow"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "56014635",
    "wineType": "white",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "40087278",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "40316934",
    "wineType": "white",
    "priceSek": 11499,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.6
  },
  {
    "id": "56634658",
    "wineType": "white",
    "priceSek": 249,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "57317468",
    "wineType": "white",
    "priceSek": 399,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "66014873",
    "wineType": "white",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "66630955",
    "wineType": "white",
    "priceSek": 139,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "dragon"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "65773346",
    "wineType": "white",
    "priceSek": 89,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "ninja",
      "penguin",
      "raccoon"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "65773426",
    "wineType": "white",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "66735387",
    "wineType": "white",
    "priceSek": 198,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "swan"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "642866",
    "wineType": "white",
    "priceSek": 439,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.3
  },
  {
    "id": "63430398",
    "wineType": "white",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "54644153",
    "wineType": "white",
    "priceSek": 109,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "46625367",
    "wineType": "white",
    "priceSek": 309,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "48080998",
    "wineType": "white",
    "priceSek": 126,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "48793786",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "duck"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "24635109",
    "wineType": "white",
    "priceSek": 209,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "24645391",
    "wineType": "white",
    "priceSek": 139,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "penguin"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "27387182",
    "wineType": "white",
    "priceSek": 240,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "27400790",
    "wineType": "white",
    "priceSek": 389,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "27705225",
    "wineType": "white",
    "priceSek": 159,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "27907824",
    "wineType": "white",
    "priceSek": 499,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "316564",
    "wineType": "white",
    "priceSek": 189,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "stag"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "24500886",
    "wineType": "white",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "24507337",
    "wineType": "white",
    "priceSek": 251,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "oystercatcher"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "24447933",
    "wineType": "white",
    "priceSek": 559,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "24452636",
    "wineType": "white",
    "priceSek": 345,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "47329570",
    "wineType": "white",
    "priceSek": 199,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "24578317",
    "wineType": "white",
    "priceSek": 350,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "24578320",
    "wineType": "white",
    "priceSek": 331,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "24588407",
    "wineType": "white",
    "priceSek": 219,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "25406370",
    "wineType": "white",
    "priceSek": 210,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "26262641",
    "wineType": "white",
    "priceSek": 159,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "26401454",
    "wineType": "white",
    "priceSek": 179,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "24668675",
    "wineType": "white",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "peacock"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "21955654",
    "wineType": "white",
    "priceSek": 189,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "raptor"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "24436765",
    "wineType": "white",
    "priceSek": 581,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "sparrow"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "56583039",
    "wineType": "rose",
    "priceSek": 229,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "1058583",
    "wineType": "rose",
    "priceSek": 99,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "pig"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "213937",
    "wineType": "rose",
    "priceSek": 84,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "flamingo"
    ],
    "primaryScore": 2.8,
    "sensitivityScore": 2.8
  },
  {
    "id": "640322",
    "wineType": "rose",
    "priceSek": 89,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "flamingo"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24438757",
    "wineType": "rose",
    "priceSek": 109,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "64989038",
    "wineType": "rose",
    "priceSek": 79,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "flamingo"
    ],
    "primaryScore": 2.9,
    "sensitivityScore": 2.9
  },
  {
    "id": "806979",
    "wineType": "rose",
    "priceSek": 79,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "rooster"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "434623",
    "wineType": "rose",
    "priceSek": 79,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "flamingo"
    ],
    "primaryScore": 2.9,
    "sensitivityScore": 2.9
  },
  {
    "id": "60794491",
    "wineType": "rose",
    "priceSek": 129,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "donkey"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "24448077",
    "wineType": "rose",
    "priceSek": 175,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "61833702",
    "wineType": "rose",
    "priceSek": 189,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "59993077",
    "wineType": "rose",
    "priceSek": 379,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "44641043",
    "wineType": "rose",
    "priceSek": 199,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.3,
    "sensitivityScore": 3.3
  },
  {
    "id": "61834907",
    "wineType": "rose",
    "priceSek": 299,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24676487",
    "wineType": "rose",
    "priceSek": 139,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "duck"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "58361069",
    "wineType": "rose",
    "priceSek": 399,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.7
  },
  {
    "id": "41633707",
    "wineType": "rose",
    "priceSek": 199,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "44988906",
    "wineType": "rose",
    "priceSek": 230,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "deer"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "63290553",
    "wineType": "rose",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "43110161",
    "wineType": "rose",
    "priceSek": 109,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.4,
    "sensitivityScore": 3.4
  },
  {
    "id": "38632322",
    "wineType": "rose",
    "priceSek": 239,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "588467",
    "wineType": "rose",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "chicken",
      "rooster"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "53655581",
    "wineType": "rose",
    "priceSek": 159,
    "animalCategories": [
      "pig"
    ],
    "specificAnimals": [
      "boar"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "38181013",
    "wineType": "rose",
    "priceSek": 145,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "hoopoe"
    ],
    "primaryScore": 3.3,
    "sensitivityScore": 3.3
  },
  {
    "id": "38495207",
    "wineType": "rose",
    "priceSek": 170,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "24588333",
    "wineType": "rose",
    "priceSek": 139,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "45335308",
    "wineType": "rose",
    "priceSek": 169,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "45545278",
    "wineType": "rose",
    "priceSek": 79,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "partridge"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "45671730",
    "wineType": "rose",
    "priceSek": 97,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.5
  },
  {
    "id": "66630932",
    "wineType": "rose",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "dragon"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "1058518",
    "wineType": "sparkling",
    "priceSek": 109,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "4033",
    "wineType": "sparkling",
    "priceSek": 109,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "246080",
    "wineType": "sparkling",
    "priceSek": 95,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "316779",
    "wineType": "sparkling",
    "priceSek": 47,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "24697210",
    "wineType": "sparkling",
    "priceSek": 99,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "24697196",
    "wineType": "sparkling",
    "priceSek": 115,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "62856047",
    "wineType": "sparkling",
    "priceSek": 39,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "52572330",
    "wineType": "sparkling",
    "priceSek": 109,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "36515559",
    "wineType": "sparkling",
    "priceSek": 79,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "1148559",
    "wineType": "sparkling",
    "priceSek": 369,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "owl"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "4027",
    "wineType": "sparkling",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "9349",
    "wineType": "sparkling",
    "priceSek": 139,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.5
  },
  {
    "id": "215586",
    "wineType": "sparkling",
    "priceSek": 139,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "674379",
    "wineType": "sparkling",
    "priceSek": 139,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "1132990",
    "wineType": "sparkling",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "920235",
    "wineType": "sparkling",
    "priceSek": 95,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.3,
    "sensitivityScore": 3.3
  },
  {
    "id": "24694379",
    "wineType": "sparkling",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "242922",
    "wineType": "sparkling",
    "priceSek": 299,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.5
  },
  {
    "id": "43375312",
    "wineType": "sparkling",
    "priceSek": 39,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "64606099",
    "wineType": "sparkling",
    "priceSek": 199,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "59409495",
    "wineType": "sparkling",
    "priceSek": 199,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "parrot"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "36696795",
    "wineType": "sparkling",
    "priceSek": 239,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24697568",
    "wineType": "sparkling",
    "priceSek": 299,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "840613",
    "wineType": "sparkling",
    "priceSek": 159,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "61555649",
    "wineType": "sparkling",
    "priceSek": 249,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "61189074",
    "wineType": "sparkling",
    "priceSek": 229,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "dog"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "54661807",
    "wineType": "sparkling",
    "priceSek": 229,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird",
      "dog"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "37500749",
    "wineType": "sparkling",
    "priceSek": 9999,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 4.6,
    "sensitivityScore": 4.6
  },
  {
    "id": "40028",
    "wineType": "sparkling",
    "priceSek": 2199,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.4,
    "sensitivityScore": 4.4
  },
  {
    "id": "50275598",
    "wineType": "sparkling",
    "priceSek": 289,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4
  },
  {
    "id": "59732860",
    "wineType": "sparkling",
    "priceSek": 701,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "39841597",
    "wineType": "sparkling",
    "priceSek": 199,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24628956",
    "wineType": "sparkling",
    "priceSek": 235,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "56148198",
    "wineType": "sparkling",
    "priceSek": 659,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "64055711",
    "wineType": "sparkling",
    "priceSek": 87,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "1087665",
    "wineType": "sparkling",
    "priceSek": 234,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.9
  },
  {
    "id": "22414558",
    "wineType": "sparkling",
    "priceSek": 180,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "24695556",
    "wineType": "sparkling",
    "priceSek": 149,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "goose"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "2635344",
    "wineType": "sparkling",
    "priceSek": 115,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "44027831",
    "wineType": "sparkling",
    "priceSek": 49,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "45435585",
    "wineType": "sparkling",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "28408031",
    "wineType": "sparkling",
    "priceSek": 169,
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "moose"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "16434",
    "wineType": "sparkling",
    "priceSek": 299,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "50088565",
    "wineType": "sparkling",
    "priceSek": 879,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "37661051",
    "wineType": "sparkling",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "3972",
    "wineType": "sparkling",
    "priceSek": 799,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "40085733",
    "wineType": "sparkling",
    "priceSek": 699,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "415308",
    "wineType": "sparkling",
    "priceSek": 299,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "46453325",
    "wineType": "sparkling",
    "priceSek": 399,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "966137",
    "wineType": "sparkling",
    "priceSek": 698,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.8
  },
  {
    "id": "24686368",
    "wineType": "sparkling",
    "priceSek": 779,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "46453314",
    "wineType": "sparkling",
    "priceSek": 399,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "46453319",
    "wineType": "sparkling",
    "priceSek": 399,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.6,
    "sensitivityScore": 3.6
  },
  {
    "id": "49218",
    "wineType": "sparkling",
    "priceSek": 159,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 3.6
  },
  {
    "id": "36746809",
    "wineType": "sparkling",
    "priceSek": 99,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "38138653",
    "wineType": "sparkling",
    "priceSek": 403,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "58065986",
    "wineType": "sparkling",
    "priceSek": 549,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "3585312",
    "wineType": "sparkling",
    "priceSek": 559,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "3973",
    "wineType": "sparkling",
    "priceSek": 479,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "40760262",
    "wineType": "sparkling",
    "priceSek": 181,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 3.5,
    "sensitivityScore": 3.5
  },
  {
    "id": "40994949",
    "wineType": "sparkling",
    "priceSek": 650,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "63024918",
    "wineType": "sparkling",
    "priceSek": 435,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "44298",
    "wineType": "sparkling",
    "priceSek": 2900,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "24552483",
    "wineType": "sparkling",
    "priceSek": 529,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "swan"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.1
  },
  {
    "id": "34422324",
    "wineType": "sparkling",
    "priceSek": 2499,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4.3,
    "sensitivityScore": 4.3
  },
  {
    "id": "350915",
    "wineType": "sparkling",
    "priceSek": 1199,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "55482956",
    "wineType": "sparkling",
    "priceSek": 269,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "31088479",
    "wineType": "sparkling",
    "priceSek": 301,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "313041",
    "wineType": "sparkling",
    "priceSek": 899,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  },
  {
    "id": "32676639",
    "wineType": "sparkling",
    "priceSek": 379,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "32869203",
    "wineType": "sparkling",
    "priceSek": 530,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.9,
    "sensitivityScore": 3.9
  },
  {
    "id": "20176",
    "wineType": "sparkling",
    "priceSek": 19995,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4.2,
    "sensitivityScore": 4.2
  },
  {
    "id": "24563146",
    "wineType": "sparkling",
    "priceSek": 285,
    "animalCategories": [
      "lion"
    ],
    "specificAnimals": [
      "lion"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "24465735",
    "wineType": "sparkling",
    "priceSek": 439,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "24667646",
    "wineType": "sparkling",
    "priceSek": 365,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "24670257",
    "wineType": "sparkling",
    "priceSek": 596,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4.1,
    "sensitivityScore": 4.1
  },
  {
    "id": "24675183",
    "wineType": "sparkling",
    "priceSek": 190,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "bird"
    ],
    "primaryScore": null,
    "sensitivityScore": null
  },
  {
    "id": "27913469",
    "wineType": "sparkling",
    "priceSek": 339,
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ],
    "primaryScore": 4,
    "sensitivityScore": 4
  },
  {
    "id": "28406639",
    "wineType": "sparkling",
    "priceSek": 401,
    "animalCategories": [
      "fox"
    ],
    "specificAnimals": [
      "red fox"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "16912834",
    "wineType": "sparkling",
    "priceSek": 459,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "17066022",
    "wineType": "sparkling",
    "priceSek": 169,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "owl"
    ],
    "primaryScore": 3.8,
    "sensitivityScore": 3.8
  },
  {
    "id": "9186969",
    "wineType": "sparkling",
    "priceSek": 119,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": 3.7,
    "sensitivityScore": 3.7
  },
  {
    "id": "9547206",
    "wineType": "sparkling",
    "priceSek": 1109,
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ],
    "primaryScore": null,
    "sensitivityScore": 4.2
  }
];

export const wineLabels: WineLabelDatum[] = [
  {
    "id": "10331",
    "name": "El Coto",
    "subtitle": "Crianza",
    "imageSrc": "/labels/el-coto.webp",
    "imageAlt": "Flaska El Coto med en tecknad hjort på etiketten.",
    "country": "Spanien",
    "wineType": "red",
    "priceSek": 99,
    "volumeMl": 750,
    "animalLabel": "Hjort",
    "animalCategories": [
      "deer"
    ],
    "specificAnimals": [
      "red deer"
    ]
  },
  {
    "id": "24555292",
    "name": "The Fox and the grapes",
    "imageSrc": "/labels/the-fox.webp",
    "imageAlt": "Flaska The Fox and the Grapes med en räv på etiketten.",
    "country": "Australien",
    "wineType": "red",
    "priceSek": 89,
    "volumeMl": 750,
    "animalLabel": "Räv",
    "animalCategories": [
      "fox"
    ],
    "specificAnimals": [
      "fox"
    ]
  },
  {
    "id": "58697741",
    "name": "LAB",
    "subtitle": "Reserva",
    "imageSrc": "/labels/lab.webp",
    "imageAlt": "Flaska LAB Reserva med ett svart djurmotiv på etiketten.",
    "country": "Portugal",
    "wineType": "red",
    "priceSek": 87,
    "volumeMl": 750,
    "animalLabel": "Hund",
    "animalCategories": [],
    "specificAnimals": [
      "dog"
    ]
  },
  {
    "id": "35720",
    "name": "Wolf Blass Eaglehawk",
    "subtitle": "Chardonnay",
    "imageSrc": "/labels/eaglehawk-white.webp",
    "imageAlt": "Flaska Wolf Blass Eaglehawk med en flygande örn på etiketten.",
    "country": "Australien",
    "wineType": "white",
    "priceSek": 75,
    "volumeMl": 750,
    "animalLabel": "Örn",
    "animalCategories": [
      "bird"
    ],
    "specificAnimals": [
      "eagle"
    ]
  },
  {
    "id": "31986597",
    "name": "Dark Horse",
    "subtitle": "Buttery Chardonnay",
    "imageSrc": "/labels/dark-horse-white.webp",
    "imageAlt": "Förpackning Dark Horse Chardonnay med ett stiliserat hästhuvud.",
    "country": "USA",
    "wineType": "white",
    "priceSek": 99,
    "volumeMl": 750,
    "animalLabel": "Häst",
    "animalCategories": [
      "horse"
    ],
    "specificAnimals": [
      "horse"
    ]
  },
  {
    "id": "63914626",
    "name": "Gato Negro",
    "subtitle": "Sauvignon Blanc",
    "imageSrc": "/labels/gato-negro-white.webp",
    "imageAlt": "Flaska Gato Negro Sauvignon Blanc med en svart katt på etiketten.",
    "country": "Chile",
    "wineType": "white",
    "priceSek": 37,
    "volumeMl": 250,
    "animalLabel": "Katt",
    "animalCategories": [],
    "specificAnimals": [
      "cat"
    ]
  }
];
