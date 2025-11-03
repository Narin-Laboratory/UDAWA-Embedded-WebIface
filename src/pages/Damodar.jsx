import { h } from 'preact';
import { useTranslation } from 'react-i18next';
import { useAppState } from '../AppStateContext';
import SetupForm from '../components/common/SetupForm';
import SettingsIcon from '../assets/settings.svg';
import IndicatorBar from '../components/common/IndicatorBar';
import Footer from '../components/common/Footer';

const Damodar = () => {
  const { t } = useTranslation();
  const { cfg, showSetupForm, setShowSetupForm, finishedSetup, wsAddress } = useAppState();

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
              <article>
                <h1>{t('damodar_dashboard_title')}</h1>
                <p>{t('damodar_dashboard_placeholder')}</p>
              </article>
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

export default Damodar;
