export interface ChartData {
  dates: string[];
  costData: number[];
  cpaData: number[];
  roiData: number[];
  conversionsData: number[];
  barVisualHeight: number[];
  yellowVisualHeight: number[];
  conversionsScaleMultiplier: number;
}

export const mockChartData: ChartData = {
  dates: ['10.06.2026', '11.06.2026', '12.06.2026', '13.06.2026', '14.06.2026'],
  costData: [2.04, 25.85, 44.36, 55.65, 63.75],  
  cpaData: [0.68, 0.86, 1.23, 0.79, 0.71],       
  roiData: [610.78, 180.50, 161.47, 56.33, 357.25], 
  conversionsData: [3, 30, 36, 70, 90],
  /*
    fake data for visualization
    in reality the graphs based on the actual numbers look different
  */                  
  barVisualHeight: [6, 6, 8, 6, 6],
  yellowVisualHeight: [0, 25, 50, 70, 90], 
  conversionsScaleMultiplier: 2
};