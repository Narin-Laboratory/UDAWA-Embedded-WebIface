import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useAppState } from '../../AppStateContext';
import WiFiIcon from '../../assets/wifi.svg';
import databaseIcon from '../../assets/database.svg';
import clockIcon from '../../assets/clock.svg';
import watchIcon from '../../assets/watch.svg';

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
    <div id="indicator-bar">
      <div className={"parent-3c"}>
        <div className={"indicater-item"}>
          <img src={WiFiIcon} alt="WiFi" /> {sysInfo.rssi}%
        </div>
        <div className={"indicater-item"}>
          {sysInfo.batt}%
        </div>
        <div className={"indicater-item"}>
          <img src={databaseIcon} alt="heap" /> {(sysInfo.heap / 1024).toFixed(0)}Kb
        </div>
        <div className={"indicater-item"}>
          <img src={watchIcon} alt="uptime" /> {(sysInfo.uptime / 1000).toFixed(0)}sec
        </div>
      </div>
      <div className={"indicater-item"}>
        <img src={clockIcon} alt="datetime" /> {sysInfo.datetime}
      </div>
    </div>
  );
};

export default IndicatorBar;
