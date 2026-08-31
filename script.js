const progress = document.getElementById("progress");
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progress.style.width = `${(scrollTop / height) * 100}%`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* Local AI-style assistant: deterministic portfolio knowledge, zero API cost. */
const aiLauncher = document.getElementById("aiLauncher");
const aiPanel = document.getElementById("aiPanel");
const aiClose = document.getElementById("aiClose");
const aiMessages = document.getElementById("aiMessages");
const aiForm = document.getElementById("aiForm");
const aiInput = document.getElementById("aiInput");

function openAI() {
  aiPanel.classList.add("open");
  aiPanel.setAttribute("aria-hidden","false");
  setTimeout(() => aiInput.focus(), 120);
}
function closeAI() {
  aiPanel.classList.remove("open");
  aiPanel.setAttribute("aria-hidden","true");
}
aiLauncher.addEventListener("click", openAI);
aiClose.addEventListener("click", closeAI);

const answers = [
  {
    keys:["strong","skill","good at","expertise","technology","tech stack"],
    answer:"Ayush is strongest in modern frontend engineering — especially <b>React, TypeScript and JavaScript</b>. He also works comfortably with REST APIs, state management, performance optimization and full-stack development."
  },
  {
    keys:["vartai","language","ai project","language learning"],
    answer:"<b>VartAI</b> is Ayush's AI-powered language learning platform. It focuses on real conversation and speaking confidence, with AI tutoring, voice practice, pronunciation feedback, personalized learning and real-life scenario-based practice. The live deployment is coming soon."
  },
  {
    keys:["arrise","current","experience","job","work"],
    answer:"Ayush is currently an <b>Associate Software Developer at Arrise Solutions</b> (Apr 2025 — Present). His work includes React/TypeScript development, reusable UI, REST API integration, modernization of 22+ legacy components and frontend optimization that improved performance by about 20%."
  },
  {
    keys:["franconnect","backend","spring","intern"],
    answer:"At <b>FranConnect</b>, Ayush worked as a Software Development Engineer — Backend Intern (Jul 2024 — Nov 2024), building REST APIs with Spring Boot/Spring Data and improving backend processing efficiency by 26% through query optimization and modular restructuring."
  },
  {
    keys:["hire","why","fit","recruiter"],
    answer:"A strong reason to consider Ayush is the combination of <b>production frontend ownership + backend understanding + product-building initiative</b>. He has measurable performance work, experience modernizing legacy React code, 350+ DSA problems, and projects such as VartAI and DevConnect."
  },
  {
    keys:["project","projects","built","portfolio"],
    answer:"Featured work includes <b>VartAI</b> (AI language learning), <b>DevConnect</b> (MERN social platform), <b>CricketOS</b> (cricket scoring/analytics), and <b>Helmet Detection + ANPR</b> (computer vision). Live links will be added after deployment."
  },
  {
    keys:["education","degree","college"],
    answer:"Ayush is an Information Technology graduate. His portfolio also highlights AWS Cloud Foundations, full-stack web development, Generative AI learning, software engineering simulations and coding/problem-solving credentials."
  },
  {
    keys:["contact","email","linkedin","github","reach"],
    answer:"You can contact Ayush at <b>ayushverma02.in@gmail.com</b>. LinkedIn and GitHub are available directly in the portfolio navigation and hero section."
  },
  {
    keys:["achievement","award","hackathon","dsa"],
    answer:"Highlights include a <b>Rockstar Rookie Award</b>, Tech Pravah (Circuitron) win, Top 500 in Smart India Hackathon 2023, and <b>350+ DSA problems</b> solved."
  }
];

function getLocalAIResponse(question){
  const q = question.toLowerCase();
  let best = null, bestScore = 0;
  for (const item of answers) {
    const score = item.keys.reduce((n,k) => n + (q.includes(k) ? (k.length > 5 ? 2 : 1) : 0), 0);
    if(score > bestScore){bestScore = score; best = item.answer;}
  }
  if(best) return best;
  return "I can help with Ayush's <b>experience, skills, projects, VartAI, achievements or contact details</b>. Try asking: “What is Ayush strongest at?”";
}

function addAIMessage(text, type){
  const row = document.createElement("div");
  row.className = "ai-message " + type;
  if(type === "bot"){
    row.innerHTML = '<span class="ai-avatar">✦</span><div>' + text + '</div>';
  } else {
    row.innerHTML = '<div>' + text.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])) + '</div>';
  }
  aiMessages.appendChild(row);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

function askAI(question){
  const clean = question.trim();
  if(!clean) return;
  addAIMessage(clean, "user");
  aiInput.value = "";
  setTimeout(() => addAIMessage(getLocalAIResponse(clean), "bot"), 260);
}

aiForm.addEventListener("submit", e => {
  e.preventDefault();
  askAI(aiInput.value);
});
document.querySelectorAll(".ai-suggestions button").forEach(btn => {
  btn.addEventListener("click", () => askAI(btn.dataset.question));
});
document.addEventListener("keydown", e => {
  if(e.key === "Escape") closeAI();
});
