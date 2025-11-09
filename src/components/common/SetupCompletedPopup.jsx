import { h } from 'preact';
import { useTranslation } from 'react-i18next';
import { useAppState } from '../../AppStateContext';

const SetupCompletedPopup = () => {
  const { t } = useTranslation();
  const { cfg, finishedSetup } = useAppState();

  return (
    <dialog open={finishedSetup}>
      <article>
        <header>
          <p>
            <strong>{t('setup_completed_title')}</strong>
          </p>
        </header>
        <p dangerouslySetInnerHTML={{ __html: t('setup_completed_body', { hname: cfg.hname, hwid: cfg.hwid }) }} />
      </article>
    </dialog>
  );
};

export default SetupCompletedPopup;
