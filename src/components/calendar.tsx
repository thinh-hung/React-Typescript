import { Calendar } from 'antd';
import type { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import type { Moment } from 'moment';
import React from 'react';

const GetCalendar: React.FC = () => {
    const onPanelChange = (value: Moment, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    return <Calendar onPanelChange={onPanelChange} />;
};

export default GetCalendar;