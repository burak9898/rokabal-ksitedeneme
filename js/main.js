/* ============================================
   ROKA BALIK — Main JavaScript
   © 2026 Osman Burak Özmen
   Tüm hakları saklıdır. İzinsiz kullanımı yasaktır.
   ============================================ */

// Copyright notice in console
console.log(
  '%c🐟 Roka Balık Ordu %c\n' +
  '%c© 2026 Osman Burak Özmen\n' +
  'Bu web sitesinin tüm hakları saklıdır.\n' +
  'İzinsiz kopyalanması, çoğaltılması veya kullanılması yasaktır\n' +
  've 5846 sayılı Fikir ve Sanat Eserleri Kanunu kapsamında\n' +
  'telif haklarına tabidir.',
  'font-size: 24px; font-weight: bold; color: #c9a96e;',
  '',
  'font-size: 12px; color: #1a2332; font-style: italic;'
);

// ============================================
// LOADER
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');

  setTimeout(() => {
    if (loader) {
      loader.classList.add('hidden');
    }
    // Trigger hero animation
    const hero = document.getElementById('hero');
    if (hero) {
      hero.classList.add('loaded');
    }
  }, 2200);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

function handleNavScroll() {
  if (!navbar) return;

  const currentScroll = window.pageYOffset;

  // Only add scrolled class on homepage (not subpages where it's always set)
  if (!navbar.classList.contains('scrolled') || document.querySelector('.hero')) {
    if (document.querySelector('.hero')) {
      if (currentScroll > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  lastScroll = currentScroll;
}

window.addEventListener('scroll', handleNavScroll, { passive: true });

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', setupScrollReveal);

// ============================================
// MENU TABS (Menu Page)
// ============================================
function setupMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const categories = document.querySelectorAll('.menu-category');

  if (!tabs.length || !categories.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      // Remove active from all tabs and categories
      tabs.forEach(t => t.classList.remove('active'));
      categories.forEach(c => c.classList.remove('active'));

      // Activate clicked tab and matching category
      tab.classList.add('active');
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.add('active');

        // Smooth scroll to menu content
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', setupMenuTabs);

// ============================================
// RESERVATION FORM
// ============================================
function handleReservation(event) {
  event.preventDefault();

  const form = document.getElementById('reservationForm');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !submitBtn) return false;

  // Get form data
  const formData = {
    name: document.getElementById('fullname').value,
    phone: document.getElementById('phone').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    guests: document.getElementById('guests').value,
    email: document.getElementById('email')?.value || '',
    notes: document.getElementById('notes')?.value || ''
  };

  // Validate
  if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.guests) {
    showToast('Lütfen tüm zorunlu alanları doldurunuz.', 'error');
    return false;
  }

  // Show loading state
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Gönderiliyor...';
  submitBtn.disabled = true;

  // Simulate submission (no backend)
  setTimeout(() => {
    // Format WhatsApp message
    const message = `🐟 *Roka Balık Rezervasyon*\n\n` +
      `👤 Ad Soyad: ${formData.name}\n` +
      `📱 Telefon: ${formData.phone}\n` +
      `📅 Tarih: ${formData.date}\n` +
      `🕐 Saat: ${formData.time}\n` +
      `👥 Kişi Sayısı: ${formData.guests}\n` +
      (formData.email ? `📧 E-posta: ${formData.email}\n` : '') +
      (formData.notes ? `📝 Not: ${formData.notes}\n` : '');

    showToast('Rezervasyonunuz alınmıştır! Onay için sizinle iletişime geçeceğiz. Teşekkür ederiz.', 'success');

    // Reset form
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);

  return false;
}

// Toast notification
function showToast(message, type = 'success') {
  // Remove existing toast
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    padding: 1rem 2rem;
    background: ${type === 'success' ? '#1a2332' : '#c0392b'};
    color: #faf8f5;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    border-radius: 2px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    z-index: 9999;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    max-width: 500px;
    text-align: center;
    line-height: 1.5;
    border-left: 3px solid ${type === 'success' ? '#c9a96e' : '#e74c3c'};
  `;
  toast.textContent = message;

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  // Auto remove
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

// ============================================
// PARALLAX EFFECT (Subtle)
// ============================================
function setupParallax() {
  const hero = document.querySelector('.hero-bg img');
  if (!hero) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        hero.style.transform = `scale(1.1) translateY(${rate}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', setupParallax);

// ============================================
// SMOOTH NUMBER COUNTER
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll('.chef-stat-number');

  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;

        // Only animate numeric values
        const numMatch = text.match(/^(\d+)/);
        if (numMatch) {
          const finalNum = parseInt(numMatch[1]);
          const suffix = text.replace(numMatch[1], '');
          let current = 0;
          const increment = Math.max(1, Math.floor(finalNum / 60));
          const duration = 1500;
          const stepTime = duration / (finalNum / increment);

          const timer = setInterval(() => {
            current += increment;
            if (current >= finalNum) {
              current = finalNum;
              clearInterval(timer);
            }
            target.textContent = current + suffix;
          }, stepTime);
        }

        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ============================================
// SET MIN DATE FOR RESERVATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
});

// ============================================
// CURSOR CUSTOM SUBTLE EFFECT
// ============================================
function setupCursorEffect() {
  // Only on desktop
  if (window.innerWidth < 768) return;

  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 1.5px solid rgba(201, 169, 110, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, transform 0.15s ease;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Grow on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .dish-card, .atmosphere-item, .menu-tab');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.borderColor = 'rgba(201, 169, 110, 0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.borderColor = 'rgba(201, 169, 110, 0.5)';
    });
  });
}

document.addEventListener('DOMContentLoaded', setupCursorEffect);

// ============================================
// IMAGE LAZY LOADING ENHANCEMENT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';

        if (img.complete) {
          img.style.opacity = '1';
        } else {
          img.addEventListener('load', () => {
            img.style.opacity = '1';
          });
        }

        imageObserver.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  images.forEach(img => imageObserver.observe(img));
});

// ============================================
// PREVENT RIGHT CLICK (Copyright Protection)
// ============================================
document.addEventListener('contextmenu', (e) => {
  // Allow right click on inputs and textareas
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  e.preventDefault();
  showToast('Bu içerik telif hakkıyla korunmaktadır. © Osman Burak Özmen', 'error');
});
