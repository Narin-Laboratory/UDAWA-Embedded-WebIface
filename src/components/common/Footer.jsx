import { h } from 'preact';
import { useTranslation } from 'react-i18next';
import heartIcon from '../../assets/heart.svg';

const Footer = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer>
      <div class="footer-container">
        <div class="brand">
          <a href="https://udawa.or.id" target="_blank">
            <img src={heartIcon} alt="heartIcon" /> {t('psti_undiknas')} <img src={heartIcon} alt="heartIcon" />
          </a>
        </div>
        <div class="language-switcher">
          <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>EN</button>
          <button onClick={() => changeLanguage('id')} disabled={i18n.language === 'id'}>ID</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
