const base = 'http://localhost:';

export default {
  controld: (path) => {
    return `${base}3001/api${path}`;
  },
  guardian: (path) => {
    return `${base}7791${path}`;
  }
}
