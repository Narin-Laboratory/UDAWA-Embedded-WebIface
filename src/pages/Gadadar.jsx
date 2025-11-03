import { useState, useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';

import '../style.css';
import SettingsIcon from '../assets/settings.svg';
import heartIcon from '../assets/heart.svg';
import ChannelSelector from '../components/gadadar/channelSelector';
import { useAppState } from '../AppStateContext';
import SetupForm from '../components/common/SetupForm';
import PowerSensor from '../components/gadadar/powerSensor';
import AlarmCard from '../components/gadadar/alarm';
import IndicatorBar from '../components/common/IndicatorBar';

function Gadadar() {
	const { t } = useTranslation();
	const { cfg, ws, authState, showSetupForm, setShowSetupForm, finishedSetup, setFinishedSetup } = useAppState();
	const [latestCfg, setLatestCfg] = useState(cfg); // State to hold latest cfg
	const [powerSensor, setPowerSensor] = useState({amp: 0, volt: 0, watt: 0, pf: 0, freq: 0, ener: 0});
	const [alarm, setAlarm] = useState({code: 0, time: ''});

	useEffect(() => {
		const updateCfg = () => {
			setLatestCfg(cfg);
		};

		if (ws.current) {
			ws.current.addEventListener('message', (event) => {
				const data = JSON.parse(event.data);
				if (data.cfg) {
					updateCfg();
				} else if (data.powerSensor) {
					setPowerSensor(data.powerSensor);
				} else if (data.alarm && data.alarm.code !== 0) {
					setAlarm(data.alarm);
				} else if (data.setFinishedSetup) {
					setFinishedSetup(data.setFinishedSetup.fInit);
				}
			});
		}

		return () => {
			if (ws.current) {
				ws.current.removeEventListener('message', updateCfg);
			}
		};
	}, [cfg, ws]);

	const handleShowSetupForm = () => {
		setShowSetupForm(!showSetupForm);
	};
	return (
	  <div>
		<header>
			<article>
				<nav>
					<ul>
						<li><a onClick={handleShowSetupForm} class="secondary" aria-label="Menu" data-discover="true" href="#">
							<img src={SettingsIcon} alt="Settings" />
						</a></li></ul>
					<ul>
						<li><strong>{t('udawa_model', { model: cfg.model })}</strong></li>
					</ul>
				</nav>
			</article>
			<IndicatorBar />
		</header>
		<main class="container">
		<dialog open={finishedSetup}>
			<article>
				<header>
				<p>
					<strong>{t('setup_completed_title')}</strong>
				</p>
				</header>
				<p dangerouslySetInnerHTML={{ __html: t('setup_completed_body', { wssid: latestCfg.wssid, hname: latestCfg.hname }) }} />
			</article>
		</dialog>
			{!cfg.fInit ? (
				<section>
					<SetupForm />
				</section>
			) : (
				<div>
					{authState && (
					<section>
						<article>
							<PowerSensor powerSensor={powerSensor}></PowerSensor>
							<AlarmCard alarm={alarm}></AlarmCard>
						</article>
						<article>
							<ChannelSelector />
						</article>
						<dialog open={showSetupForm && !finishedSetup}>
							<article>
								<SetupForm></SetupForm>
							</article>
						</dialog>
					</section>
					)}
				</div>
			)}
		</main>
		<footer>
		  <section class="text-center mt-10">
			<hr />
			<div id="copyleft">
				<div class="copyleft-item">
					<a href="https://udawa.or.id" target="_blank"><img src={heartIcon} alt="heartIcon" /> {t('psti_undiknas')} <img src={heartIcon} alt="heartIcon" /></a>
				</div>
			</div>
		  </section>
		</footer>
	  </div>
	);
  }

export default Gadadar;
