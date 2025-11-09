import { useState, useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';

import '../style.css';
import SettingsIcon from '../assets/settings.svg';
import ChannelSelector from '../components/gadadar/channelSelector';
import { useAppState } from '../AppStateContext';
import SetupForm from '../components/common/SetupForm';
import PowerSensor from '../components/gadadar/powerSensor';
import AlarmCard from '../components/common/AlarmCard';
import IndicatorBar from '../components/common/IndicatorBar';
import Footer from '../components/common/Footer';
import SetupCompletedPopup from '../components/common/SetupCompletedPopup';

function Gadadar() {
	const { t } = useTranslation();
	const { cfg, ws, authState, showSetupForm, setShowSetupForm, finishedSetup, setFinishedSetup, wsAddress } = useAppState();
	const [powerSensor, setPowerSensor] = useState({amp: 0, volt: 0, watt: 0, pf: 0, freq: 0, ener: 0});
	const [alarm, setAlarm] = useState({code: 0, time: ''});

	useEffect(() => {
		const handleMessage = (event) => {
			const data = JSON.parse(event.data);
			if (data.powerSensor) {
				setPowerSensor(data.powerSensor);
			} else if (data.alarm && data.alarm.code !== 0) {
				setAlarm(data.alarm);
			} else if (data.setFinishedSetup) {
				setFinishedSetup(data.setFinishedSetup.fInit);
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
	}, [cfg, ws, setFinishedSetup]);

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
		<SetupCompletedPopup />
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
		<Footer />
	  </div>
	);
  }

export default Gadadar;
