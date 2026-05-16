// script.js
import { players, customMatches, tournamentPlayers, tournaments, userProfileStats} from './data.js'; // Імпортуємо нашу базу
import { mixMembers } from './tournament-mix.js';

const burger = document.getElementById('burger-menu');
const navLinks = document.querySelector('.nav-links');

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    
    const target = document.getElementById(sectionId);
    const header = document.querySelector('.main-header');

    if (target) target.classList.remove('hidden');

    // Показуємо хедер всюди, крім головного екрану
    if (sectionId === 'screen-hero') {
        header.classList.remove('show');
    } else {
        header.classList.add('show');
    }

    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        burger.classList.remove('is-open');
    }
}

// Навігація
document.getElementById('search-btn').onclick = () => showSection('team-finder');
document.querySelector('.logo').onclick = () => showSection('screen-hero');

document.querySelectorAll('.nav-links a').forEach(link => {
    link.onclick = (e) => {
        e.preventDefault();
        const id = link.getAttribute('href').replace('#', '');
        showSection(id);
    };
});

// ШАБЛОН КАРТКИ З ДИНАМІЧНИМ СЯЙВОМ
function createPlayerCard(p) {
    const smurfTag = p.isSmurf ? `<span class="smurf-tag" style="background:#fff;color:#000;padding:2px 6px;font-size:10px;margin-left:10px;border-radius:3px;">SMURF</span>` : '';

    return `
    <div class="player-card glow-${p.rankClass}">
         <div class="card-main" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
             <div>
                 <h3>${p.name} ${smurfTag}</h3>
                 <small>${p.agent} | ${p.rank}</small>
             </div>
             <button class="connect-btn request-player-btn">Request</button>
         </div>
         
         <div class="player-stats-dropdown" style="width: 100%;">
            <div style="display: flex; justify-content: space-around; width: 100%;">
                <div style="text-align: center;"><strong style="color:#fff; font-size:1.2rem;">${p.winrate}%</strong><br><small style="color:var(--text-sub); text-transform:uppercase; font-size:10px;">Winrate</small></div>
                <div style="text-align: center;"><strong style="color:#fff; font-size:1.2rem;">1.18</strong><br><small style="color:var(--text-sub); text-transform:uppercase; font-size:10px;">K/D</small></div>
                <div style="text-align: center;"><strong style="color:#fff; font-size:1.2rem;">24%</strong><br><small style="color:var(--text-sub); text-transform:uppercase; font-size:10px;">HS%</small></div>
                <div style="text-align: center;"><strong style="color:#fff; font-size:1.2rem;">145</strong><br><small style="color:var(--text-sub); text-transform:uppercase; font-size:10px;">ADR</small></div>
            </div>
         </div>
    </div>`;
}

function renderPlayers(data) {
    const list = document.getElementById('players-list');
    if (list) {
        list.innerHTML = data.map(player => createPlayerCard(player)).join('');
    }
}


function applyCustomMatchImages(data) {
    document.querySelectorAll('.player-card.customs').forEach((card, i) => {
        const match = data[i];
        const bg = card.querySelector('.customs-card-bg');
        if (bg && match?.mapImage) {
            bg.style.setProperty('--custom-match-map-image', `url("${match.mapImage}")`);
        }
    });
}

function renderCustoms(data) {
    const list = document.getElementById('custom-list');
    if (!list || !data) return;

    list.innerHTML = data.map(m => 
        `
            <div class="player-card customs">
                <div class="customs-card-bg" aria-hidden="true"></div>
                <div class="card-info">
                    <h3>${m.title}</h3>
                    <small>${m.map} | ${m.rank}</small>
                </div>
                <div class="slots-info">${m.players}</div>
                <div class="card-actions">
                    <button type="button" class="connect-btn">Join</button>
                </div>
            </div>
        `
    ).join('');

    applyCustomMatchImages(data);
}

function applyTournamentCardImages(sectionData) {
    document.querySelectorAll('.tournament-card').forEach((card) => {
        const image = card.dataset.image;
        if (image) {
            card.querySelector('.tournament-card__image')?.style.setProperty(
                '--tournament-card-image',
                `url("${image}")`
            );
        }
    });
}

function renderTournaments(data) {
    const wrapper = document.getElementById('tournaments-list');
    if (!wrapper || !data) return;

    wrapper.innerHTML = '';

    const statuses = [
        { key: 'ongoing', title: 'LIVE — Зараз тривають', class: 'ongoing-row' },
        { key: 'announced', title: 'Майбутні турніри', class: 'announced-row' },
        { key: 'finished', title: 'Минулі події', class: 'finished-row' }
    ];

    statuses.forEach(statusGroup => {
        const filtered = data.filter(t => t.status === statusGroup.key);
        if (filtered.length === 0) return;

        const sectionHTML = `
            <div class="status-section ${statusGroup.class}">
                <h2 class="status-title">${statusGroup.title}</h2>
                <div class="cards-grid">
                    ${filtered.map(t => `
                        <div class="tournament-card" data-image="${t.image || ''}">
                            <div class="tournament-card__image">
                                <div class="status-badge">${statusGroup.key}</div>
                            </div>
                            <div class="card-content">
                                <h2 class="tournament-title">${t.title}</h2>
                                <div class="tournament-info">
                                    <span>📅 ${t.date}</span>
                                    <span>💰 ${t.prizePool}</span>
                                </div>
                                <div class="card-footer">
                                    <span class="teams-count">Гравці: ${t.teams}</span>
                                    <button type="button" class="request-btn">Взяти участь</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        wrapper.innerHTML += sectionHTML;
    });

    applyTournamentCardImages(data);
}

// Імпортуй свої дані на самому початку файлу, якщо ще не зробив:
// import { players, customMatches, tournamentPlayers, tournaments, myValorantStats } from './data.js';

function applyProfileDynamicStyles(stats) {
    const root = document.getElementById('player-profile');
    if (!root || !stats) return;

    const banner = root.querySelector('.profile-banner');
    if (banner && stats.profile?.playerCard) {
        banner.style.setProperty('--profile-banner-image', `url("${stats.profile.playerCard}")`);
    }

    root.querySelectorAll('.profile-map-card').forEach((card, i) => {
        const map = (stats.topMaps || [])[i];
        if (map?.image) {
            card.style.setProperty('--profile-map-image', `url("${map.image}")`);
        }
    });

    if (stats.recentTrendRR?.length) {
        const maxRR = Math.max(...stats.recentTrendRR.map(Math.abs), 1);
        root.querySelectorAll('.profile-rr-bar').forEach((bar, i) => {
            const rr = stats.recentTrendRR[i];
            if (rr === undefined) return;
            bar.style.setProperty('--rr-fill-height', `${(Math.abs(rr) / maxRR) * 100}%`);
            bar.classList.add(rr > 0 ? 'profile-rr-bar--gain' : 'profile-rr-bar--loss');
        });
    }
}

function renderMyProfile(stats) {
    const container = document.getElementById('player-profile');
    if (!container || !stats) return;

    const agentsHTML = stats.topAgents.map(agent => `
        <div class="vlr-agent-row profile-agent-row">
            <img src="${agent.image}" alt="${agent.name}" class="profile-agent-row__avatar">
            <div class="profile-agent-row__main">
                ${agent.name}
                <div class="profile-agent-row__meta">${agent.matches} MATCHES</div>
            </div>
            <div class="profile-agent-row__stats">
                WR: ${agent.winRate}<br>K/D: ${agent.kd || agent.kdRatio || '0.00'}
            </div>
        </div>
    `).join('');

    let historyHTML = '';
    if (stats.recentTrendRR && stats.recentTrendRR.length > 0) {
        historyHTML = `<div class="profile-rr-chart">${stats.recentTrendRR.map(rr => {
            const sign = rr > 0 ? '+' : '';
            return `<div class="profile-rr-bar">
                <div class="profile-rr-bar__label">${sign}${rr}</div>
                <div class="profile-rr-bar__fill"></div>
            </div>`;
        }).join('')}</div>`;
    }

    const mapsHTML = (stats.topMaps || []).map(map => `
        <div class="profile-map-card">
            <div class="profile-map-card__bg" aria-hidden="true"></div>
            <div class="profile-map-card__overlay">
                <div>
                    <div class="profile-map-card__name">${map.name}</div>
                    <div class="profile-map-card__matches">${map.matches} MATCHES</div>
                </div>
                <div class="profile-map-card__winrate">${map.winRate}</div>
            </div>
        </div>
    `).join('');

    const rolesHTML = (stats.topRoles || []).map(role => `
        <div class="profile-role-row">
            <div class="profile-role-row__name">${role.name}</div>
            <div class="profile-role-row__stats">
                <div class="profile-role-row__wr">${role.winRate}</div>
                <div class="profile-role-row__matches">${role.matches} MATCHES</div>
            </div>
        </div>
    `).join('');

    const perf = stats.performance;
    container.innerHTML = `
    <div class="profile-bento-grid">
        <div class="profile-banner">
            <div class="profile-banner__identity">
                <h1 class="profile-banner__title">${stats.profile.nickname}<span class="profile-banner__tag">${stats.profile.tag}</span></h1>
            </div>
            <div class="profile-banner__aside">
                <div class="profile-banner__rank-meta">
                    <div class="profile-banner__rank-name">${stats.profile.currentRank}</div>
                    <div class="profile-banner__rr-line">${stats.profile.rr} RR <span class="profile-banner__sep">|</span> Peak: ${stats.profile.peakRank}</div>
                </div>
                <div class="profile-banner__rank-icon">
                    <img src="${stats.profile.rankImage || ''}" alt="Rank" class="profile-banner__rank-img">
                </div>
            </div>
        </div>

        <div class="profile-bento-column">
            <div class="profile-bento-card">
                <h2 class="profile-section-title">PERFORMANCE</h2>
                <div class="profile-performance-grid">
                    <div class="profile-stat-cell">
                        <div class="profile-stat-cell__label">WINRATE</div>
                        <div class="profile-stat-cell__value">${perf.winRate}</div>
                    </div>
                    <div class="profile-stat-cell">
                        <div class="profile-stat-cell__label">K/D RATIO</div>
                        <div class="profile-stat-cell__value">${perf.kdRatio}</div>
                    </div>
                    <div class="profile-stat-cell">
                        <div class="profile-stat-cell__label">ACS</div>
                        <div class="profile-stat-cell__value">${perf.acs}</div>
                    </div>
                    <div class="profile-stat-cell">
                        <div class="profile-stat-cell__label">HEADSHOT %</div>
                        <div class="profile-stat-cell__value">${perf.headshotPercentage}</div>
                    </div>
                    <div class="profile-stat-cell">
                        <div class="profile-stat-cell__label">ADR</div>
                        <div class="profile-stat-cell__value">${perf.adr}</div>
                    </div>
                    <div class="profile-stat-cell">
                        <div class="profile-stat-cell__label">FIRST BLOODS</div>
                        <div class="profile-stat-cell__value">${perf.firstBloods}</div>
                    </div>
                </div>
            </div>
            <div class="profile-bento-card profile-recent-weapon">
                <div class="profile-recent-block">
                    <h2 class="profile-section-title profile-section-title--compact">RECENT MATCHES (RR)</h2>
                    ${historyHTML}
                </div>
                <div class="profile-weapon-block">
                    <h2 class="profile-section-title profile-section-title--compact">FAVOURITE WEAPON</h2>
                    <div class="profile-weapon-block__name">${stats.favoriteWeapon || 'VANDAL'}</div>
                </div>
            </div>
        </div>

        <div class="profile-bento-card">
            <h2 class="profile-section-title">TOP AGENTS</h2>
            <div class="vlr-agents-list">${agentsHTML}</div>
        </div>

        <div class="profile-bento-card">
            <h2 class="profile-section-title">TOP MAPS</h2>
            <div class="profile-maps-wrapper">${mapsHTML}</div>
        </div>

        <div class="profile-bento-card">
            <h2 class="profile-section-title">TOP ROLES</h2>
            <div class="profile-roles-list">${rolesHTML}</div>
        </div>
    </div>
    `;

    applyProfileDynamicStyles(stats);
}

// Запуск
window.onload = () => {
    showSection('screen-hero');
    renderPlayers(players);
    renderCustoms(customMatches);
    renderTournaments(tournaments);
    renderMyProfile(userProfileStats);
};

if (burger && navLinks) { // Маленька перевірка "на всякий випадок"
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('is-open'); // Для анімації хрестика
    });
}


// Розкриття статуа по кліку на картку
document.body.addEventListener('click', (e) => {
    const card = e.target.closest('.player-card');
    
    // Перевіряємо, чи клікнули по картці, але НЕ по кнопці Request
    if (card && !e.target.classList.contains('connect-btn')) {
        card.classList.toggle('expanded');
    }
});