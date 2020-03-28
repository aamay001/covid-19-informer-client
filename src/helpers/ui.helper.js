import theme from '../config/theme';

const shaddowBase = theme.palette.darkTheme
  ? '100, 100, 100'
  : '0, 0, 0';

export const boxShadow = {
  noRaise: `0 1px 3px rgba(${shaddowBase},0.12), 0 1px 2px rgba(${shaddowBase},0.20)`,
  slighterRais: `1px 1px 4px rgba(${shaddowBase},0.16), 1px 1px 4px rgba(${shaddowBase},0.23)`,
  slightRais: `0 3px 6px rgba(${shaddowBase},0.16), 0 3px 6px rgba(${shaddowBase},0.23)`,
  midRais: `0 10px 20px rgba(${shaddowBase},0.19), 0 6px 6px rgba(${shaddowBase},0.23)`,
  raised: `0 14px 28px rgba(${shaddowBase},0.25), 0 10px 10px rgba(${shaddowBase},0.22)`,
  highRais: `0 19px 38px rgba(${shaddowBase},0.30), 0 15px 12px rgba(${shaddowBase},0.22)`,
  alert: '0 10px 20px rgba(150, 6, 6, 0.452), 0 6px 6px rgba(150, 6, 6, 0.452)',
};

export const textEllipsis = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

export const messageBarStyles = { root: { marginTop: 10 } };
