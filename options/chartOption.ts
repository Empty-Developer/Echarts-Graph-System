import * as echarts from 'echarts';
import { ChartData, mockChartData } from '@/type/chartData';

/**
 * @description this function takes input data for charts
 * calculates visual scalable heights, and returns 
 * a complete configuration (option) for ECharts
 * @param {ChartData} data an object containing raw data, dates, and scaling factors
 * @returns {object} option for initializing an ECharts chart
 */
export const getChartOption = (data: ChartData) => {
  const conversionsVisualHeight = data.conversionsData.map(
    val => val * data.conversionsScaleMultiplier
  );

  return {
    backgroundColor: 'transparent', 
    animationDurationUpdate: 0,

    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'none' },
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: [12, 16],
      borderRadius: 8,
      textStyle: {
        color: '#000000',
        fontFamily: 'sans-serif',
        fontSize: 14
      },
      extraCssText: 'box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); min-width: 190px;',
      
      formatter: function (params: any) {
        const dataIndex = params[0].dataIndex;
        const date = data.dates[dataIndex];
        
        let html = `<div style="font-weight: 500; margin-bottom: 8px; color: #6b7280; font-size: 13px;">${date}</div>`;
        const order = ['Cost', 'CPA', 'ROI confirmed', 'Conversions'];
        
        const sortedParams = [...params].sort((a: any, b: any) => {
          return order.indexOf(a.seriesName) - order.indexOf(b.seriesName);
        });

        sortedParams.forEach((item: any) => {
          let val = item.value;
          let markerColor = item.color;
          let borderRadius = '50%'; 
          let clipPath = 'none';

          if (item.seriesName === 'Cost') {
            markerColor = '#F4D03F';
            val = data.costData[dataIndex].toFixed(2);
          }
          if (item.seriesName === 'Conversions') {
            markerColor = '#8E44AD';
            val = data.conversionsData[dataIndex]; 
            borderRadius = '2px'; 
          }
          if (item.seriesName === 'CPA') {
            markerColor = '#2563EB';
            val = data.cpaData[dataIndex].toFixed(2); 
          }
          if (item.seriesName === 'ROI confirmed') {
            markerColor = '#27AE60'; 
            borderRadius = '0%';
            clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
            if (typeof val === 'number') val = val.toFixed(2);
          }

          html += `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px; gap: 16px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 10px; height: 10px; border-radius: ${borderRadius}; clip-path: ${clipPath}; background-color: ${markerColor};"></span>
                <span style="color: #4b5563; font-size: 14px;">${item.seriesName}:</span>
              </div>
              <span style="font-weight: 700; color: #111827; font-size: 14px;">${val}</span>
            </div>
          `;
        });
        return html;
      }
    },

    grid: {
      left: 0,
      right: 0,
      top: 10,     
      bottom: 0,  
      containLabel: false
    },

    xAxis: {
      type: 'category',
      boundaryGap: false, 
      data: data.dates,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false }
    },

    yAxis: [
      {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false }
      },
      {
        type: 'value',
        min: 0,
        max: 100, 
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false }
      }
    ],

    series: [
      {
        name: 'CPA',
        type: 'bar',
        barWidth: 40, 
        data: data.barVisualHeight, 
        itemStyle: {
          color: '#2563EB', 
          borderRadius: [5, 5, 0, 0] 
        },
        emphasis: {
          itemStyle: {
            color: '#1D4ED8' 
          }
        },
        z: 10 
      },
      {
        name: 'Cost',
        type: 'line',
        yAxisIndex: 1, 
        data: data.yellowVisualHeight, 
        symbol: 'circle',
        symbolSize: 10,
        smooth: false, 
        showSymbol: false, 
        lineStyle: { width: 0 },
        areaStyle: {
          color: '#FCEB9C', 
          opacity: 1 
        },
        emphasis: {
          itemStyle: {
            color: '#F4D03F',
            borderColor: '#ffffff',
            borderWidth: 2,
            shadowBlur: 0
          }
        },
        z: 2
      },
      {
        name: 'Conversions',
        type: 'line',
        symbol: 'rect',
        symbolSize: 10,
        showSymbol: true, 
        data: conversionsVisualHeight, 
        itemStyle: {
          color: '#8E44AD'
        },
        lineStyle: {
          color: '#8E44AD',
          width: 3
        },
        emphasis: {
          itemStyle: {
            color: '#8E44AD',
            borderColor: '#ffffff',
            borderWidth: 2,
            shadowBlur: 12,
            shadowColor: 'rgba(142, 68, 173, 0.6)'
          }
        },
        z: 5 
      },
      {
        name: 'ROI confirmed',
        type: 'line',
        smooth: 0.4,
        symbol: 'diamond',
        symbolSize: 12,
        showSymbol: false, 
        data: data.roiData,
        lineStyle: {
          width: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#40851C' },    
            { offset: 0.95, color: '#40851C' }, 
            { offset: 0.95, color: '#54C424' }, 
            { offset: 1, color: '#54C424' }     
          ])
        },
        emphasis: {
          itemStyle: {
            color: '#27AE60',
            borderColor: '#ffffff',
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: 'rgba(39, 174, 96, 0.8)'
          }
        },
        z: 5
      }
    ]
  };
};

/*
  export the default configuration 
  with static data so that nothing 
  breaks right now
*/ 
const defaultOption = getChartOption(mockChartData);
export default defaultOption;