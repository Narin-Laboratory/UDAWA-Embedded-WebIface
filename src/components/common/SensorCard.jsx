import { h } from 'preact';
import { useTranslation } from 'react-i18next';

const SensorCard = ({ name, data, unit }) => {
  const { t } = useTranslation();

  return (
    <article className="sensor-card">
      <header className="sensor-card-header">
        <h3>{t(name)}</h3>
      </header>
      <div className="sensor-card-body">
        <div className="current-value">
          <span>{data.current.toFixed(2)}</span>
          <span className="unit">{unit}</span>
        </div>
      </div>
      <footer>
      <div className="stats">
          <div className="stat-item">
            <span>{t('min')}</span>
            <span>{data.min.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span>{t('max')}</span>
            <span>{data.max.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span>{t('avg')}</span>
            <span>{data.avg.toFixed(2)}</span>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default SensorCard;
