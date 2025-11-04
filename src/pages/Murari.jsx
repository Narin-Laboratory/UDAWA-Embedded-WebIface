import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { useAppState } from '../AppStateContext';
import SetupForm from '../components/common/SetupForm';
import SensorCard from '../components/common/SensorCard';
import SettingsIcon from '../assets/settings.svg';
import IndicatorBar from '../components/common/IndicatorBar';
import Footer from '../components/common/Footer';
import AlarmCard from '../components/common/AlarmCard';

const Murari = () => {
  const { t } = useTranslation();
  const { cfg, ws, showSetupForm, setShowSetupForm, finishedSetup, shtSensor, bhSensor, wsAddress } = useAppState();
  const [alarm, setAlarm] = useState({ code: 0, time: '' });

  useEffect(() => {
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.alarm && data.alarm.code !== 0) {
        setAlarm(data.alarm);
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
  }, [ws]);

  const handleShowSetupForm = () => {
    setShowSetupForm(!showSetupForm);
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a onClick={handleShowSetupForm} class="secondary" aria-label="Menu" data-discover="true" href="#">
              <img src={SettingsIcon} alt="Settings" />
            </a></li>
          </ul>
          <ul>
            <li><strong>{t('udawa_model', { model: cfg.model })}</strong></li>
          </ul>
        </nav>
        <IndicatorBar key={wsAddress} />
      </header>
      <main class="container">
        <dialog open={finishedSetup}>
          <article>
            <header>
              <p>
                <strong>{t('setup_completed_title')}</strong>
              </p>
            </header>
          </article>
        </dialog>
        {!cfg.fInit ? (
          <section>
            <SetupForm />
          </section>
        ) : (
          <div>
            <section>
              <AlarmCard alarm={alarm} />
              <div class="sensor-grid">
                <SensorCard name='temperature' data={shtSensor.temp} unit="°C" />
                <SensorCard name='humidity' data={shtSensor.rh} unit="%" />
                <SensorCard name='light_intensity' data={bhSensor.lux} unit="lux" />
              </div>
              <dialog open={showSetupForm && !finishedSetup}>
                <article>
                  <SetupForm></SetupForm>
                </article>
              </dialog>
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Murari;
