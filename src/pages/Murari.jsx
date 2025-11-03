import { h } from 'preact';
import { useTranslation } from 'react-i18next';
import { useAppState } from '../AppStateContext';
import SetupForm from '../components/common/SetupForm';
import SensorCard from '../components/common/SensorCard';
import SettingsIcon from '../assets/settings.svg';
import IndicatorBar from '../components/common/IndicatorBar';
import Footer from '../components/common/Footer';

const Murari = () => {
  const { t } = useTranslation();
  const { cfg, showSetupForm, setShowSetupForm, finishedSetup, shtSensor, bhSensor, wsAddress } = useAppState();

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
