import { h } from 'preact';

const SensorCard = ({ name, data, unit }) => {
  return (
    <div className="sensor-card">
      <h3>{name}</h3>
      <div className="sensor-data">
        <div className="current-value">
          <span>{data.current.toFixed(2)}</span>
          <span className="unit">{unit}</span>
        </div>
        <div className="stats">
          <div>
            <span>Min</span>
            <span>{data.min.toFixed(2)}</span>
          </div>
          <div>
            <span>Max</span>
            <span>{data.max.toFixed(2)}</span>
          </div>
          <div>
            <span>Avg</span>
            <span>{data.avg.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
