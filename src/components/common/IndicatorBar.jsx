import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useAppState } from '../../AppStateContext';
import WiFiIcon from '../../assets/wifi.svg';
import databaseIcon from '../../assets/database.svg';
import clockIcon from '../../assets/clock.svg';
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

    if (ws.current) {
      ws.current.addEventListener('message', handleMessage);
    }

    return () => {
      if (ws.current) {
        ws.current.removeEventListener('message', handleMessage);
      }
    };
  }, [ws]);

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
      <div class="indicator-item">
        <img src={clockIcon} alt="Datetime" />
        <span>{sysInfo.datetime}</span>
      </div>
    </div>
  );
};

export default IndicatorBar;
