/**
 * EDUXCEL — Main Client Application Logic
 * Interactive Dynamic Island, Logo Video Slot, Live Leaderboard & Talent Simulator
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  initDynamicIsland();
  initVideoPlayer();
  initAmbientMusic();
  initLeaderboard();
  initSimulator();
});

/* ==========================================================================
   1. DYNAMIC ISLAND LOGIC
   ========================================================================== */
function initDynamicIsland() {
  const island = document.getElementById('dynamicIsland');
  const taskbarLinks = document.querySelectorAll('.taskbar-item');

  if (!island) return;

  // On touch devices, allow tapping to toggle the island
  island.addEventListener('click', (e) => {
    // If clicking a link, don't just toggle
    if (e.target.closest('.taskbar-item')) return;
    island.classList.toggle('expanded');
  });

  // Handle taskbar links with blank href
  taskbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const actionName = link.querySelector('span')?.textContent || 'Page';
      showToast(`⚡ <strong>${actionName}</strong>: Blank href ready for routing integration.`, 'info');
    });
  });

  // Close island when clicking outside
  document.addEventListener('click', (e) => {
    if (!island.contains(e.target)) {
      island.classList.remove('expanded');
    }
  });
}

/* ==========================================================================
   2. VIDEO PLAYER WITH FULLSCREEN & DEFAULT MUTE
   ========================================================================== */
function initVideoPlayer() {
  const video = document.getElementById('userLogoAnimation');
  const btnFullscreen = document.getElementById('btnVideoFullscreen');

  if (!video) return;

  // Ensure video is muted by default as requested
  video.muted = true;
  video.defaultMuted = true;

  // Trigger autoplay (browsers permit muted autoplay)
  video.play().catch(err => {
    console.log('Video autoplay initiated with user gesture policy:', err);
  });

  // Fullscreen option handler
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleVideoFullscreen(video);
    });
  }

  // Also support double-click on the video to trigger fullscreen
  video.addEventListener('dblclick', () => {
    toggleVideoFullscreen(video);
  });

  // Synchronize fullscreen icon state
  const fullscreenChangeHandler = () => {
    const isFullscreen = document.fullscreenElement === video || 
                         document.webkitFullscreenElement === video;
    const icon = document.getElementById('videoFullscreenIcon');
    if (icon) {
      if (isFullscreen) {
        icon.setAttribute('data-lucide', 'minimize');
      } else {
        icon.setAttribute('data-lucide', 'maximize');
      }
      if (window.lucide) lucide.createIcons();
    }
  };

  document.addEventListener('fullscreenchange', fullscreenChangeHandler);
  document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
}

function toggleVideoFullscreen(element) {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen().catch(err => {
        showToast('Fullscreen mode was blocked by browser permissions.', 'info');
      });
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/* ==========================================================================
   3. AMBIENT MUSIC PLAYER (BESIDE DYNAMIC ISLAND)
   ========================================================================== */
function initAmbientMusic() {
  const musicBtn = document.getElementById('musicToggleBtn');
  const audio = document.getElementById('ambientAudio');
  const musicLabel = document.getElementById('musicLabel');

  if (!musicBtn || !audio) return;

  // Set comfortable default volume
  audio.volume = 0.65;

  musicBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        musicBtn.classList.add('playing');
        if (musicLabel) musicLabel.textContent = 'Playing Lo-Fi';
        showToast('🎵 <strong>Ambient Music</strong>: Playing lo-fi background audio.', 'success');
      }).catch(err => {
        console.warn('Audio play request error:', err);
        showToast('Click anywhere on the page to permit audio playback.', 'info');
      });
    } else {
      audio.pause();
      musicBtn.classList.remove('playing');
      if (musicLabel) musicLabel.textContent = 'Ambient Lo-Fi';
      showToast('⏸️ <strong>Ambient Music</strong>: Audio paused.', 'info');
    }
  });

  // When audio ends (if loop fails for any reason), reset button state
  audio.addEventListener('pause', () => {
    musicBtn.classList.remove('playing');
    if (musicLabel) musicLabel.textContent = 'Ambient Lo-Fi';
  });

  audio.addEventListener('play', () => {
    musicBtn.classList.add('playing');
    if (musicLabel) musicLabel.textContent = 'Playing Lo-Fi';
  });
}

/* ==========================================================================
   4. LIVE LEADERBOARD ARCHITECTURE
   ========================================================================== */
const COLLEGES_DATA = [
  {
    id: 1,
    name: 'Bennett University',
    city: 'Greater Noida, Uttar Pradesh',
    dominantArena: 'Coding & Tech',
    arenaCategory: 'coding',
    momentum: '👑 National Champion #1',
    contributors: '4,280 Active',
    score: 106450,
    crest: 'BU'
  },
  {
    id: 2,
    name: 'IIT Bombay',
    city: 'Powai, Mumbai',
    dominantArena: 'Coding & Tech',
    arenaCategory: 'coding',
    momentum: '+2 Ranks this week',
    contributors: '2,420 Active',
    score: 98450,
    crest: 'IITB'
  },
  {
    id: 3,
    name: 'BITS Pilani',
    city: 'Pilani, Rajasthan',
    dominantArena: 'Coding & Tech',
    arenaCategory: 'coding',
    momentum: 'Surging fast (+1)',
    contributors: '1,980 Active',
    score: 95820,
    crest: 'BITS'
  },
  {
    id: 4,
    name: 'NIT Trichy',
    city: 'Tiruchirappalli, TN',
    dominantArena: 'Sports & Athletics',
    arenaCategory: 'sports',
    momentum: 'Holding steady',
    contributors: '1,640 Active',
    score: 91400,
    crest: 'NITT'
  },
  {
    id: 5,
    name: 'Delhi University (SRCC/Hansraj)',
    city: 'New Delhi',
    dominantArena: 'Extracurriculars & Arts',
    arenaCategory: 'extra',
    momentum: '+4 Ranks surge',
    contributors: '3,100 Active',
    score: 89650,
    crest: 'DU'
  },
  {
    id: 6,
    name: 'IIT Delhi',
    city: 'Hauz Khas, New Delhi',
    dominantArena: 'Academics & Research',
    arenaCategory: 'academics',
    momentum: '+1 Rank shift',
    contributors: '1,890 Active',
    score: 87900,
    crest: 'IITD'
  },
  {
    id: 7,
    name: 'IIIT Hyderabad',
    city: 'Gachibowli, Telangana',
    dominantArena: 'Coding & Tech',
    arenaCategory: 'coding',
    momentum: 'High ICPC Velocity',
    contributors: '1,320 Active',
    score: 86450,
    crest: 'IIITH'
  },
  {
    id: 8,
    name: 'VIT Vellore',
    city: 'Vellore, Tamil Nadu',
    dominantArena: 'Sports & Athletics',
    arenaCategory: 'sports',
    momentum: '+3 Ranks this month',
    contributors: '3,840 Active',
    score: 84120,
    crest: 'VIT'
  },
  {
    id: 9,
    name: 'MIT Manipal',
    city: 'Manipal, Karnataka',
    dominantArena: 'Extracurriculars & Arts',
    arenaCategory: 'extra',
    momentum: 'Trending nationwide',
    contributors: '1,750 Active',
    score: 81900,
    crest: 'MIT'
  }
];

let currentFilter = 'all';
let searchQuery = '';

function initLeaderboard() {
  const filterButtons = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('collegeSearchInput');

  renderLeaderboardTable();

  // Category Filter Pills
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-cat') || 'all';
      renderLeaderboardTable();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderLeaderboardTable();
    });
  }
}

function renderLeaderboardTable() {
  const tbody = document.getElementById('leaderboardBody');
  const matchCount = document.getElementById('collegeMatchCount');
  if (!tbody) return;

  // Filter & Search
  let filtered = COLLEGES_DATA.filter(col => {
    const matchesFilter = (currentFilter === 'all') || (col.arenaCategory === currentFilter);
    const matchesSearch = col.name.toLowerCase().includes(searchQuery) || 
                          col.city.toLowerCase().includes(searchQuery) ||
                          col.dominantArena.toLowerCase().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  // Sort by score descending
  filtered.sort((a, b) => b.score - a.score);

  if (matchCount) {
    matchCount.textContent = `Showing ${filtered.length} College${filtered.length === 1 ? '' : 's'}`;
  }

  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 40px; color: #94a3b8;">
          No collegiate entries match your search criteria. Try a different query or reset filters.
        </td>
      </tr>
    `;
    return;
  }

  filtered.forEach((item, index) => {
    const rank = index + 1;
    let rankBadgeClass = 'rank-standard';
    if (rank === 1) rankBadgeClass = 'rank-1';
    else if (rank === 2) rankBadgeClass = 'rank-2';
    else if (rank === 3) rankBadgeClass = 'rank-3';

    let arenaClass = 'code';
    if (item.arenaCategory === 'sports') arenaClass = 'sports';
    else if (item.arenaCategory === 'academics') arenaClass = 'academics';
    else if (item.arenaCategory === 'extra') arenaClass = 'extra';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="col-rank">
        <span class="rank-badge-cell ${rankBadgeClass}">${rank}</span>
      </td>
      <td class="col-college">
        <div class="college-info-cell">
          <div class="college-crest-icon">${item.crest}</div>
          <div>
            <div class="college-name-text">${item.name}</div>
            <div class="college-location-text">${item.city}</div>
          </div>
        </div>
      </td>
      <td class="col-dominant">
        <span class="arena-badge-pill ${arenaClass}">
          ${item.dominantArena}
        </span>
      </td>
      <td class="col-momentum">
        <span class="momentum-tag">
          <i data-lucide="trending-up"></i>
          <span>${item.momentum}</span>
        </span>
      </td>
      <td class="col-contributors">
        <span style="color: #475569; font-weight: 600;">${item.contributors}</span>
      </td>
      <td class="col-score">
        <span class="score-display-cell">${item.score.toLocaleString()} pts</span>
      </td>
      <td class="col-action">
        <button class="btn-uplift-small" onclick="selectCollegeForSimulator('${item.name}')">
          <i data-lucide="zap"></i>
          <span>Uplift</span>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Re-run Lucide icons for table
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Global helper to link table to simulator
window.selectCollegeForSimulator = function(collegeName) {
  const select = document.getElementById('simCollegeSelect');
  if (select) {
    select.value = collegeName;
    updateSimulatorDisplay();
    const simSection = document.getElementById('boostSimulator');
    if (simSection) {
      simSection.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`🎯 Selected <strong>${collegeName}</strong> for the Talent Boost simulator!`, 'info');
  }
};

/* ==========================================================================
   5. TALENT BOOST SIMULATOR
   ========================================================================== */
function initSimulator() {
  const selectCollege = document.getElementById('simCollegeSelect');
  const btnBoost = document.getElementById('btnBoostCampus');

  if (selectCollege) {
    selectCollege.addEventListener('change', updateSimulatorDisplay);
  }

  if (btnBoost) {
    btnBoost.addEventListener('click', handleSimulateBoost);
  }

  updateSimulatorDisplay();
}

function updateSimulatorDisplay() {
  const selectCollege = document.getElementById('simCollegeSelect');
  const simRank = document.getElementById('simCurrentRank');
  const simName = document.getElementById('simDisplayCollege');
  const simSub = document.getElementById('simDisplayCategory');
  const simScore = document.getElementById('simDisplayScore');
  const simBar = document.getElementById('simScoreBar');
  const simGap = document.getElementById('simGapText');

  if (!selectCollege) return;

  const currentName = selectCollege.value;
  // Sort colleges copy to find rank
  const sorted = [...COLLEGES_DATA].sort((a, b) => b.score - a.score);
  const collegeObj = sorted.find(c => c.name.toLowerCase().includes(currentName.toLowerCase())) || sorted[0];
  const rankIndex = sorted.findIndex(c => c.name === collegeObj.name) + 1;
  const topScore = sorted[0].score;

  if (simRank) simRank.textContent = `#${rankIndex}`;
  if (simName) simName.textContent = collegeObj.name;
  if (simSub) simSub.textContent = `Dominant Arena: ${collegeObj.dominantArena}`;
  if (simScore) simScore.textContent = `${collegeObj.score.toLocaleString()} pts`;

  // Percentage bar relative to Rank 1 + 5000 pts
  const maxRef = Math.max(topScore + 1000, 100000);
  const percent = Math.min(Math.round((collegeObj.score / maxRef) * 100), 100);
  if (simBar) simBar.style.width = `${percent}%`;

  if (simGap) {
    if (rankIndex === 1) {
      simGap.textContent = `👑 Currently holding Rank #1 national title! (+${(collegeObj.score - (sorted[1]?.score || 0)).toLocaleString()} pts lead)`;
      simGap.style.color = '#f59e0b';
    } else {
      const diff = topScore - collegeObj.score;
      simGap.textContent = `${diff.toLocaleString()} pts needed to overtake Rank #1 (${sorted[0].name})`;
      simGap.style.color = '#10b981';
    }
  }
}

function handleSimulateBoost() {
  const selectCollege = document.getElementById('simCollegeSelect');
  const selectCategory = document.getElementById('simCategorySelect');
  const studentNameInput = document.getElementById('simStudentName');
  const feedBox = document.getElementById('simLogFeed');

  const collegeName = selectCollege ? selectCollege.value : 'BITS Pilani';
  const categoryVal = selectCategory ? selectCategory.value : 'coding';
  const studentName = (studentNameInput && studentNameInput.value.trim()) || 'Champion Student';

  let pointsEarned = 500;
  let eventText = 'Talent Contribution';

  if (categoryVal === 'coding') {
    pointsEarned = 650;
    eventText = 'Won National Hackathon Grand Prize';
  } else if (categoryVal === 'sports') {
    pointsEarned = 520;
    eventText = 'Won Inter-State Athletic Gold';
  } else if (categoryVal === 'academics') {
    pointsEarned = 480;
    eventText = 'Published IEEE Research Paper';
  } else if (categoryVal === 'extra') {
    pointsEarned = 410;
    eventText = 'National Debate Championship Laurels';
  }

  // Find college in master data and add points
  const targetCollege = COLLEGES_DATA.find(c => c.name.toLowerCase().includes(collegeName.toLowerCase()));
  if (targetCollege) {
    targetCollege.score += pointsEarned;
  }

  // Update simulator telemetry & leaderboard table
  updateSimulatorDisplay();
  renderLeaderboardTable();

  // Add entry into live simulation feed
  if (feedBox) {
    const entry = document.createElement('div');
    entry.className = 'feed-entry';
    entry.style.animation = 'slideInToast 0.3s ease';
    entry.innerHTML = `
      <i data-lucide="zap" style="color: #f59e0b; width: 14px; height: 14px; flex-shrink: 0; margin-top: 2px;"></i>
      <span><strong>${studentName}</strong> injected <strong>+${pointsEarned} pts</strong> for <strong>${collegeName}</strong> (${eventText})!</span>
    `;
    feedBox.prepend(entry);
    if (window.lucide) lucide.createIcons();
  }

  showToast(`🚀 +${pointsEarned} pts verified! ${collegeName} surged upward in the national ranking!`, 'success');
}

/* ==========================================================================
   6. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg';

  let iconName = 'bell';
  let iconColor = '#818cf8';

  if (type === 'success') {
    iconName = 'check-circle-2';
    iconColor = '#10b981';
  } else if (type === 'info') {
    iconName = 'sparkles';
    iconColor = '#6366f1';
  }

  toast.innerHTML = `
    <i data-lucide="${iconName}" style="color: ${iconColor}; width: 18px; height: 18px; flex-shrink: 0;"></i>
    <div>${message}</div>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4200);
}
