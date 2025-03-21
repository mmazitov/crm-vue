export const convertCurrency = (amount: string | number) => {
	return new Intl.NumberFormat('en-EN', {
		style: 'currency',
		currency: 'USD',
	}).format(+amount);
};
