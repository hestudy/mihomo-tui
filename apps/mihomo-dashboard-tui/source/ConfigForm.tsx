import {Alert, ConfirmInput, TextInput} from '@inkjs/ui';
import {Box, useFocusManager} from 'ink';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {tuiConfig} from 'tui-config';

export type Config = {
	apiBaseUrl?: string;
};

const ConfigForm = () => {
	const form = useForm<Config>({
		defaultValues: {
			...tuiConfig<Config>('mihomo-dashboard-tui').config,
		},
	});

	return (
		<Box flexDirection="column">
			<Controller
				control={form.control}
				name="apiBaseUrl"
				rules={{
					required: 'clash api地址不能为空',
					pattern: {
						value: /^http(s)?:\/\/.*$/,
						message: '请输入正确的url地址',
					},
				}}
				render={({field, fieldState}) => {
					return (
						<Box flexDirection="column">
							<TextInput
								placeholder="请输入clash api地址"
								defaultValue={field.value}
								onChange={v => {
									field.onChange(v);
								}}
								onSubmit={() => {}}
							></TextInput>
							{fieldState.error && (
								<Alert variant="error">{fieldState.error.message}</Alert>
							)}
						</Box>
					);
				}}
			></Controller>
			<ConfirmInput onConfirm={() => {}} onCancel={() => {}}></ConfirmInput>
		</Box>
	);
};

export default ConfigForm;
