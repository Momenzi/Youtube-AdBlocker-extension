const toggle = document.getElementById('toggle-switch');
const statusText = document.getElementById('status-text');
const statusDot = document.getElementById('status-dot');

function updateUI(isActive) {
  toggle.checked = isActive;
  statusText.textContent = isActive ? "Active and blocking on YouTube" : "Disabled";
  statusDot.style.backgroundColor = isActive ? "#00b87a" : "#cc0000";
  statusDot.style.boxShadow = isActive ? "0 0 6px #00b87a" : "0 0 6px #cc0000";
}

chrome.storage.local.get(['ytabeEnabled'], (result) => {
  // Podrazumevano je uključeno (true)
  updateUI(result.ytabeEnabled !== false);
});

toggle.addEventListener('change', () => {
  const isEnabled = toggle.checked;
  chrome.storage.local.set({ ytabeEnabled: isEnabled });
  updateUI(isEnabled);
  
  // Automatski osveži YouTube tabove da bi se promene odmah videle
  chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
    tabs.forEach(tab => chrome.tabs.reload(tab.id));
  });
});