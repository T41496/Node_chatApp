export const register = () => {
  if (!navigator.serviceWorker) return;
  navigator.serviceWorker.register('./sw.js').then(registration => {
    console.log('registration successful', registration.scope);
  }).catch(err => {
    console.log('registration failed');
  });
};
