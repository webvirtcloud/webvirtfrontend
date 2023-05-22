import type { ChartOptions, DeepPartial } from 'lightweight-charts';

const dark: DeepPartial<ChartOptions> = {
  layout: {
    background: {
      color: '#171717',
    },
    textColor: 'white',
  },
  grid: {
    horzLines: {
      color: '#404040',
    },
  },
  timeScale: {
    borderColor: '#404040',
  },
  rightPriceScale: {
    borderColor: '#404040',
  },
};

const light: DeepPartial<ChartOptions> = {
  layout: {
    background: {
      color: 'white',
    },
    textColor: 'black',
  },
  grid: {
    horzLines: {
      color: '#f0f3fa',
    },
  },
  timeScale: {
    borderColor: '#f0f3fa',
  },
  rightPriceScale: {
    borderColor: '#f0f3fa',
  },
};

export const theme = {
  dark,
  light,
};
