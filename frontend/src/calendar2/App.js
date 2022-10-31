import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';

import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from './sample-base';
import dataSource from './datasource-lite.json';
/**
 * Schedule views sample
 */
function App() {
    // React.useEffect(() => {
    //     updateSampleSection();
    // }, []);
    let scheduleObj;
    const data = extend([], dataSource.zooEventsData, null, true);
    const viewOptions = [
        { text: 'Day', value: 'Day' },
        { text: 'Week', value: 'Week' },
        { text: 'WorkWeek', value: 'WorkWeek' },
        { text: 'Month', value: 'Month' }
    ];
    const fields = { text: 'text', value: 'value' };
    function onViewChange(args) {
        scheduleObj.currentView = args.value;
        scheduleObj.dataBind();
    }
    // function onEventRendered(args) {
    //     applyCategoryColor(args, scheduleObj.currentView);
    // }
    return (<div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          {/* <ScheduleComponent width='100%' height='650px' ref={schedule => scheduleObj = schedule} selectedDate={new Date(2021, 1, 15)} eventSettings={{ dataSource: data }} eventRendered={onEventRendered.bind(this)}> */}
            <ScheduleComponent width='100%' height='650px' ref={schedule => scheduleObj = schedule} selectedDate={new Date(2021, 1, 15)} workHours={{
            highlight: true, start: '04:00', end: '04:00'}} eventSettings={{ dataSource: data }}>
            <ViewsDirective>
              <ViewDirective option='Day'/>
              <ViewDirective option='Week'/>
              <ViewDirective option='WorkWeek'/>
              <ViewDirective option='Month'/>
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]}/>
          </ScheduleComponent>
        </div>
      </div>
    </div>);
}
export default App;
