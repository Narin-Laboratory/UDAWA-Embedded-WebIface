import { h } from 'preact';
import { useTranslation } from 'react-i18next';
import heartIcon from '../../assets/heart.svg';

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer>
      <article class="footer-container">
        <div class="brand">
          <a href="https://udawa.or.id" target="_blank">
            <img src={heartIcon} alt="heartIcon" /> {t('psti_undiknas')} <img src={heartIcon} alt="heartIcon" />
          </a>
        </div>
      </article>
    </footer>
  );
};

export default Footer;
