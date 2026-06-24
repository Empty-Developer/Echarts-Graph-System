"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import option from '@/options/chartOption';

const ReactECharts = dynamic(() => import('echarts-for-react'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 rounded-xl animate-pulse" />
});

export default function CustomChart() {
  /**
   * @description ECharts event registration object
   * intercepts mouse movement on the canvas force the pointer cursor
   */
  const onEvents = {
    mousemove: (params: any, echartsInstance: any) => {
      const zr = echartsInstance.getZr();
      zr.setCursorStyle('pointer');
    }
  };

  return (
    <div className="w-full h-[320px] overflow-hidden border-2 border-[#D5CACB] bg-[#F9EBEA] cursor-pointer [&_canvas]:cursor-pointer">
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }} 
        onEvents={onEvents} 
        notMerge={true}
        lazyUpdate={true}
        className='cursor-pointer'
      />
    </div>
  );
}