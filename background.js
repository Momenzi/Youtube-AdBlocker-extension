chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') console.log('[YTABE] Installed.');
  else if (reason === 'update') console.log('[YTABE] Updated.');
});