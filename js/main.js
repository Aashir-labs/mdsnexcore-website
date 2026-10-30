/**
 * MDS NEXCORE — Official Corporate Profile & Business Presence
 * Script Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initCorporateInquiryForm();
});

/* ===================================================================
   1. NAVBAR & STICKY BEHAVIOR
   =================================================================== */
function initNavbar() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ===================================================================
   2. MOBILE NAVIGATION DRAWER
   =================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.remove('hidden-menu');
    mobileMenu.classList.add('active-menu');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('active-menu');
    mobileMenu.classList.add('hidden-menu');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ===================================================================
   3. SCROLL REVEAL ANIMATIONS
   =================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

/* ===================================================================
   4. CORPORATE INQUIRY FORM
   =================================================================== */
function initCorporateInquiryForm() {
  const form = document.getElementById('corporate-inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#inquiry-name')?.value.trim();
    const email = form.querySelector('#inquiry-email')?.value.trim();
    const phone = form.querySelector('#inquiry-phone')?.value.trim();
    const purpose = form.querySelector('#inquiry-purpose')?.value;
    const message = form.querySelector('#inquiry-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in your Name, Email, and Official Message.', 'warning');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Logging Official Inquiry...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      const randomRef = 'MDS-FBR-' + Math.floor(10000 + Math.random() * 90000);
      const successNotice = document.getElementById('form-success-notice');
      const refPlaceholder = document.getElementById('inquiry-ref-id');
      
      if (refPlaceholder) {
        refPlaceholder.textContent = randomRef;
      }
      if (successNotice) {
        successNotice.classList.remove('hidden');
      }

      form.reset();
      showToast(`Inquiry Logged. Reference: ${randomRef}`, 'success');
    }, 700);
  });
}

/* ===================================================================
   5. CLIPBOARD HELPER
   =================================================================== */
window.copyToClipboard = function(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} copied to clipboard!`, 'success');
  }).catch(() => {
    showToast(`${label}: ${text}`, 'info');
  });
};

/* ===================================================================
   6. TOAST NOTIFICATIONS
   =================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let iconSvg = '';
  if (type === 'success') {
    toast.style.borderLeftColor = '#10B981';
    iconSvg = `<svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
  } else if (type === 'warning') {
    toast.style.borderLeftColor = '#F59E0B';
    iconSvg = `<svg class="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
  } else {
    toast.style.borderLeftColor = '#38BDF8';
    iconSvg = `<svg class="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <div class="text-xs md:text-sm font-medium text-slate-100">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
