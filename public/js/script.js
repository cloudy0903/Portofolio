// toggle icon navbar

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Scroll Sections Active Links

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  // Sticky navbar

  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  //    remove toggle icon and navbar when click navbar link

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// scroll reveal

ScrollReveal({
//   reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});
ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .services-container, .portfolio-box, .contact form", { origin: "bottom" });
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

// typed js

const typed = new Typed('.multiple-text', {
    strings: ['Web Developer', 'UI/UX Designer', 'IT Support Specialist'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Form Submission & Toast Notification
const contactForm = document.querySelector('.contact form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const phoneInput = contactForm.querySelector('input[name="phone"]');
    const subjectInput = contactForm.querySelector('input[name="subject"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
    
    // Simple Validation
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showToast('Mohon lengkapi Nama, Email, dan Pesan Anda!', 'error');
      return;
    }
    
    showToast('Sedang mengirim pesan...', 'info');
    
    const accessKey = accessKeyInput ? accessKeyInput.value : '';
    
    // Jika masih menggunakan key bawaan/placeholder, lakukan simulasi sukses
    if (accessKey === 'YOUR_ACCESS_KEY_HERE' || !accessKey) {
      setTimeout(() => {
        showToast('Pesan dikirim! (Simulasi: Mohon konfigurasi access_key di HTML)', 'success');
        contactForm.reset();
      }, 1500);
      return;
    }
    
    // Kirim data ke API Web3Forms
    try {
      const formData = new FormData(contactForm);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });
      const data = await response.json();
      
      if (response.status === 200 && data.success) {
        showToast('Pesan Anda berhasil terkirim!', 'success');
        contactForm.reset();
      } else {
        showToast('Gagal mengirim: ' + (data.message || 'Error tidak dikenal'), 'error');
      }
    } catch (error) {
      showToast('Terjadi kesalahan koneksi atau jaringan!', 'error');
    }
  });
}

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'bx-info-circle';
  if (type === 'success') icon = 'bx-check-circle';
  if (type === 'error') icon = 'bx-error-circle';
  
  toast.innerHTML = `
    <i class="bx ${icon}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Triger animasi masuk
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Sembunyikan & hapus toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4000);
}


