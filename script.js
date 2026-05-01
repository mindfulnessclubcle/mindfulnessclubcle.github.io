// ============================================================
//  EVENTS — Edit this array to update the calendar.
//  Each event: { date, title, time, location, description }
// ============================================================
const EVENTS = [
  {
    date: "2026-05-05",
    title: "Weekly Sit",
    time: "7:00 PM – 8:30 PM",
    location: "Harbor and Bridge Community Center",
    description: "Include a bit of stillness in your week. We gather for a 30-minute silent meditation followed by open sharing, lead by Tim. All levels welcome — no experience necessary. Just bring yourself."
  },
  {
    date: "2026-05-12",
    title: "Weekly Sit",
    time: "7:00 PM – 8:30 PM",
    location: "Harbor and Bridge Community Center",
    description: "Our regular weekly sit. This will be an Inspiration week, lead by Phena. Cushions and chairs available; bring a blanket if you like."
  },
  {
    date: "2026-05-19",
    title: "Weekly Sit",
    time: "7:00 PM – 8:30 PM",
    location: "Harbor and Bridge Community Center",
    description: "Include a bit of stillness in your week. We gather for a 30-minute silent meditation followed by open sharing, lead by Tim. All levels welcome — no experience necessary. Just bring yourself."
  },
  {
    date: "2026-05-26",
    title: "Weekly Sit",
    time: "7:00 PM – 8:30 PM",
    location: "Harbor and Bridge Community Center",
    description: "Include a bit of stillness in your week. We gather for a 30-minute silent meditation followed by open sharing, lead by Tim. All levels welcome — no experience necessary. Just bring yourself."
  },
  {
    date: "2026-06-02",
    title: "Weekly Sit",
    time: "7:00 PM – 8:30 PM",
    location: "Harbor and Bridge Community Center",
    description: "Include a bit of stillness in your week. We gather for a 30-minute silent meditation followed by open sharing, lead by Tim. All levels welcome — no experience necessary. Just bring yourself."
  },
  {
    date: "2026-06-09",
    title: "Weekly Sit",
    time: "7:00 PM – 8:30 PM",
    location: "Harbor and Bridge Community Center",
    description: "Our regular weekly sit. This session will focus on body-scan awareness. Cushions and chairs available; bring a blanket if you like."
  },
  {
    date: "2026-06-18",
    title: "Spring Retreat",
    time: "6:00 PM",
    location: "TBA",
    description: "6/18 - 6/21: Spend the weekend reconnecting with yourself amongst the warmth of community. We will engage in periods of sitting, walking, stretching, eating, and communing in silence over this week. This is an opportunity to explore the *quiet* and *space* that naturally arises once we eliminate distractions for our awareness."
  },
  {
    date: "2026-06-07",
    title: "Half-Day Retreat: Rooting & Renewal",
    time: "9:00 AM – 1:00 PM",
    location: "Squire's Castle, North Chagrin Reservation",
    description: "A half-day immersion in the Chagrin Reservation. We'll practice sitting and walking meditation, journaling, and close with a group circle. Light snacks provided. Space is limited — please RSVP by email."
  }
];

// ============================================================
//  Shared utilities
// ============================================================

function parseDate(dateStr) {
  // Parse YYYY-MM-DD as local date (avoids UTC offset issues)
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDisplayDate(dateStr) {
  const d = parseDate(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function getUpcomingEvents() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return EVENTS
    .filter(e => parseDate(e.date) >= today)
    .sort((a, b) => parseDate(a.date) - parseDate(b.date));
}

// ============================================================
//  Page: index.html — render next upcoming event
// ============================================================
function renderNextEvent() {
  const container = document.getElementById("next-event");
  if (!container) return;

  const upcoming = getUpcomingEvents();
  if (upcoming.length === 0) {
    container.innerHTML = `<p class="no-events">No upcoming events scheduled. Check back soon.</p>`;
    return;
  }

  const e = upcoming[0];
  container.innerHTML = `
    <div class="next-event-card">
      <span class="event-tag">Next Gathering</span>
      <h3>${e.title}</h3>
      <div class="event-meta">
        <span>📅 ${formatDisplayDate(e.date)}</span>
        <span>🕐 ${e.time}</span>
        <span>📍 ${e.location}</span>
      </div>
      <p>${e.description}</p>
      <a href="events.html" class="btn-link">See all events →</a>
    </div>
  `;
}

// ============================================================
//  Page: events.html — render full event list
// ============================================================
function renderAllEvents() {
  const container = document.getElementById("events-list");
  if (!container) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = EVENTS
    .filter(e => parseDate(e.date) >= today)
    .sort((a, b) => parseDate(a.date) - parseDate(b.date));

  const past = EVENTS
    .filter(e => parseDate(e.date) < today)
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));

  let html = "";

  if (upcoming.length === 0) {
    html += `<p class="no-events">No upcoming events at the moment. Check back soon.</p>`;
  } else {
    html += `<h2 class="section-label">Upcoming</h2>`;
    upcoming.forEach((e, i) => {
      html += `
        <article class="event-card" style="animation-delay: ${i * 0.1}s">
          <div class="event-date-block">
            <span class="event-month">${parseDate(e.date).toLocaleDateString("en-US", { month: "short" })}</span>
            <span class="event-day">${parseDate(e.date).getDate()}</span>
          </div>
          <div class="event-body">
            <h3>${e.title}</h3>
            <div class="event-meta">
              <span>🕐 ${e.time}</span>
              <span>📍 ${e.location}</span>
            </div>
            <p>${e.description}</p>
          </div>
        </article>`;
    });
  }

  if (past.length > 0) {
    html += `<h2 class="section-label past-label">Past Gatherings</h2>`;
    past.forEach(e => {
      html += `
        <article class="event-card past">
          <div class="event-date-block">
            <span class="event-month">${parseDate(e.date).toLocaleDateString("en-US", { month: "short" })}</span>
            <span class="event-day">${parseDate(e.date).getDate()}</span>
          </div>
          <div class="event-body">
            <h3>${e.title}</h3>
            <div class="event-meta">
              <span>${e.time}</span>
              <span>${e.location}</span>
            </div>
            <p>${e.description}</p>
          </div>
        </article>`;
    });
  }

  container.innerHTML = html;
}

// ============================================================
//  Nav: mark active page
// ============================================================
function markActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(link => {
    const href = link.getAttribute("href").split("/").pop();
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

// ============================================================
//  Mobile nav toggle
// ============================================================
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  if (!toggle || !navLinks) return;
  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", navLinks.classList.contains("open"));
  });
}

// ============================================================
//  Init on DOM ready
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  markActiveNav();
  initMobileNav();
  renderNextEvent();
  renderAllEvents();
});
