import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useAppState } from '../../AppStateContext';
import WiFiIcon from '../../assets/wifi.svg';
import databaseIcon from '../../assets/database.svg';
import watchIcon from '../../assets/watch.svg';
import batteryIcon from '../../assets/battery.svg';

const IndicatorBar = () => {
  const { ws } = useAppState();
  const [sysInfo, setSysInfo] = useState({ uptime: 0, heap: 0, datetime: 0, rssi: 0, batt: 0 });

  useEffect(() => {
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.sysInfo) {
        setSysInfo(data.sysInfo);
      }
    };

    const currentWs = ws.current;
    if (currentWs) {
      currentWs.addEventListener('message', handleMessage);
    }

    return () => {
      if (currentWs) {
        currentWs.removeEventListener('message', handleMessage);
      }
    };
  }, [ws.current]);

  const formatDateTime = (timestamp) => {
    if (!timestamp) {
      return { date: 'Loading...', time: '' };
    }
    const d = new Date(timestamp * 1000);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const weekday = weekdays[d.getDay()];

    const date = `${weekday}, ${month} ${day} ${year}`;
    const time = d.toLocaleTimeString('en-GB');
    return { date, time };
  };

  const { date, time } = formatDateTime(sysInfo.datetime);

  return (
    <div class="indicator-bar">
      <div class="indicator-group">
        <div class="indicator-item">
          <img src={WiFiIcon} alt="WiFi" />
          <span>{sysInfo.rssi}%</span>
        </div>
        <div class="indicator-item">
          <img src={batteryIcon} alt="Battery" />
          <span>{sysInfo.batt}%</span>
        </div>
        <div class="indicator-item">
          <img src={databaseIcon} alt="Heap" />
          <span>{(sysInfo.heap / 1024).toFixed(0)}Kb</span>
        </div>
        <div class="indicator-item">
          <img src={watchIcon} alt="Uptime" />
          <span>{(sysInfo.uptime / 1000).toFixed(0)}s</span>
        </div>
      </div>
      <div class="indicator-group date-group">
        <div class="date-time-wrapper">
          <span class="date-text">{date}</span>
          <span class="time-text">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default IndicatorBar;
