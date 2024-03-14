const US = new Map();

US.set('Alabama', {
  code: 'AL',
});

US.set('Alaska', {
  code: 'AK',
});
US.set('Arizona', {
  code: 'AZ',
});
US.set('Arkansas', {
  code: 'AR',
});
US.set('California', {
  code: 'CA',
});
US.set('Colorado', {
  code: 'CO',
});
US.set('Connecticut', {
  code: 'CT',
});
US.set('Delaware', {
  code: 'DE',
});
US.set('Florida', {
  code: 'FL',
});
US.set('Georgia', {
  code: 'GA',
});
US.set('Hawaii', {
  code: 'HI',
});
US.set('Idaho', {
  code: 'ID',
});
US.set('Illinois', {
  code: 'IL',
});
US.set('Indiana', {
  code: 'IN',
});
US.set('Iowa', {
  code: 'IA',
});
US.set('Kansas', {
  code: 'KS',
});
US.set('Kentucky', {
  code: 'KY',
});
US.set('Louisiana', {
  code: 'LA',
});
US.set('Maine', {
  code: 'ME',
});
US.set('Maryland', {
  code: 'MD',
});
US.set('Massachusetts', {
  code: 'MA',
});
US.set('Michigan', {
  code: 'MI',
});
US.set('Minnesota', {
  code: 'MN',
});
US.set('Mississippi', {
  code: 'MS',
});
US.set('Missouri', {
  code: 'MO',
});
US.set('Montana', {
  code: 'MT',
});
US.set('Nebraska', {
  code: 'NE',
});
US.set('Nevada', {
  code: 'NV',
});
US.set('New Hampshire', {
  code: 'NH',
});
US.set('New Jersey', {
  code: 'NJ',
});
US.set('New Mexico', {
  code: 'NM',
});
US.set('New York', {
  code: 'NY',
});
US.set('North Carolina', {
  code: 'NC',
});
US.set('North Dakota', {
  code: 'ND',
});
US.set('Ohio', {
  code: 'OH',
});
US.set('Oklahoma', {
  code: 'OK',
});
US.set('Oregon', {
  code: 'OR',
});
US.set('Pennsylvania', {
  code: 'PA',
});
US.set('Rhode Island', {
  code: 'RI',
});
US.set('South Carolina', {
  code: 'SC',
});
US.set('South Dakota', {
  code: 'SD',
});
US.set('Tennessee', {
  code: 'TN',
});
US.set('Texas', {
  code: 'TX',
});
US.set('Utah', {
  code: 'UT',
});
US.set('Vermont', {
  code: 'VT',
});
US.set('Virginia', {
  code: 'VA',
});
US.set('Washington', {
  code: 'WA',
});
US.set('West Virginia', {
  code: 'WV',
});
US.set('Wisconsin', {
  code: 'WI',
});
US.set('Wyoming', {
  code: 'WY',
});

const getUSStateFlagUrl = state => `https://flagcdn.com/40x30/us-${US.get(state).code.toLowerCase()}.webp`;

export default {
  getUSStateFlagUrl,
};
