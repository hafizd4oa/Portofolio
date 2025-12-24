// Mobile menu toggle
document.getElementById("menu-btn").addEventListener("click", function () {
  document.getElementById("mobile-menu").classList.toggle("hidden");
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Form submission
document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = {
      name: this.name.value,
      email: this.email.value,
      subject: this.subject.value,
      message: this.message.value,
    };
    try {
      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Pesan berhasil dikirim!");
        this.reset();
      } else {
        alert("Gagal mengirim pesan.");
      }
    } catch {
      alert("Gagal mengirim pesan.");
    }
  });

// Animate skill bars on scroll into view
const skillBars = document.querySelectorAll(".skill-bar");

const animateSkillBars = () => {
  skillBars.forEach((bar) => {
    const barWidth = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = barWidth;
    }, 100);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll("#skills").forEach((section) => {
  observer.observe(section);
});

// Function to manage download queue
const downloadQueue = [];

function addToDownloadQueue(filePath) {
  downloadQueue.push(filePath);
  processDownloadQueue();
}

function processDownloadQueue() {
  if (downloadQueue.length === 0) return;

  const fileToDownload = downloadQueue.shift();
  const link = document.createElement("a");
  link.href = fileToDownload;
  link.download = fileToDownload.split("/").pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Process the next file in the queue after a short delay
  setTimeout(processDownloadQueue, 1000);
}
