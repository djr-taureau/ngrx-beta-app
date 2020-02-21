/**
 * Returns a Config Error Object
 */
export const getConfigError = (url: string) =>
	Error(`Unable to load application configuration at ${url}.`);

export const getInvalidConfigError = () =>
	Error(`Invalid application configuration.`);