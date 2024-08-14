import {Text} from 'ink';
import React, {useEffect, useState} from 'react';
import {tuiConfig} from 'tui-config';
import ConfigForm, {Config} from './ConfigForm.js';

type Props = {
	name: string | undefined;
};

export default function App({name = 'Stranger'}: Props) {
	const [config, setConfig] = useState<Config>();

	useEffect(() => {
		const {config} = tuiConfig<Config>('mihomo-dashboard-tui');
		setConfig(config);
	}, []);

	if (!config?.apiBaseUrl) {
		return <ConfigForm></ConfigForm>;
	}

	return (
		<Text>
			Hello, <Text color="green">{name}sss</Text>
		</Text>
	);
}
