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

// Нова функція для кастомок
function renderCustoms(data) {
    const list = document.getElementById('custom-list');
    if (list) {
        list.innerHTML = data.map(m => `
            <div class="player-card customs">
            <div class="customs-card-bg" style="background-image: url('${m.mapImage}');"></div>
                 <div class="card-info">
                     <h3>${m.title}</h3>
                     <small>${m.map} | ${m.rank}</small>
                 </div>
                 
                 <div class="slots-info">${m.players}</div>
                 
                 <div class="card-actions">
                    <button class="connect-btn">Join</button>
                 </div>
            </div>`).join('');
    }
}

function renderTournaments(data) {
    const wrapper = document.getElementById('tournaments-list');
    if (!wrapper || !data) return;

    wrapper.innerHTML = ''; // Чистимо все

    // Ггрупуємо статуси в потрібному тобі порядку
    const statuses = [
        { key: 'ongoing', title: 'LIVE — Зараз тривають', class: 'ongoing-row' },
        { key: 'announced', title: 'Майбутні турніри', class: 'announced-row' },
        { key: 'finished', title: 'Минулі події', class: 'finished-row' }
    ];

    statuses.forEach(statusGroup => {
        // Фільтруємо туріки під конкретний статус
        const filtered = data.filter(t => t.status === statusGroup.key);

        // ПРИКОЛ: Якщо туріків цього статусу нема — пропускаємо ітерацію
        if (filtered.length === 0) return;

        // Створюємо розмітку секції
        const sectionHTML = `
            <div class="status-section ${statusGroup.class}">
                <h2 class="status-title">${statusGroup.title}</h2>
                <div class="cards-grid">
                    ${filtered.map(t => `
                        <div class="tournament-card">
                            <div class="card-image" style="background-image: url('${t.image || ''}')">
                                <div class="status-badge">${statusGroup.key}</div>
                            </div>
                            <div class="card-content">
                                <h2 class="tournament-title">${t.title}</h2>
                                <div class="tournament-info">
                                    <span>📅 ${t.date}</span>
                                    <span>💰 ${t.prizePool}</span>
                                </div>
                                <div class="card-footer">
                                    <span>Гравці: ${t.teams}</span>
                                    <button class="request-btn">Взяти участь</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        wrapper.innerHTML += sectionHTML;
    });
}

// Імпортуй свої дані на самому початку файлу, якщо ще не зробив:
// import { players, customMatches, tournamentPlayers, tournaments, myValorantStats } from './data.js';

function renderMyProfile(stats) {
    const container = document.getElementById('player-profile');
    if (!container || !stats) return;

    // 1. Агенти: додали кількість матчів (matches) і захист від undefined
    const agentsHTML = stats.topAgents.map(agent => `
        <div class="vlr-agent-row" style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px; background-color: rgba(0, 0, 0, 0.3); border-radius: 12px; padding: 15px; box-shadow: inset 3px 3px 6px rgba(0,0,0,0.6), inset -3px -3px 6px rgba(255,255,255,0.03);">
           <img src="${agent.image}" alt="${agent.name}" style="width: 40px; height: 40px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); object-fit: cover; background-color: #222;">
            <div style="font-weight: 800; flex-grow: 1; color: #fff;">
                ${agent.name}
                <div style="font-size: 10px; color: var(--text-sub); font-weight: 600;">${agent.matches} MATCHES</div>
            </div>
            <div style="text-align: right; color: var(--text-sub); font-size: 12px; font-weight: 700;">
                WR: ${agent.winRate}<br>K/D: ${agent.kd || agent.kdRatio || '0.00'}
            </div>
        </div>
    `).join('');

    // 2. Історія ігор (Графік стовпчиками)
    let historyHTML = '';
    if (stats.recentTrendRR && stats.recentTrendRR.length > 0) {
        // Знаходимо максимальне значення по модулю, щоб найвищий стовпчик був 100% висоти
        const maxRR = Math.max(...stats.recentTrendRR.map(Math.abs)); 

        const barsHTML = stats.recentTrendRR.map(rr => {
            const height = (Math.abs(rr) / maxRR) * 100; // Висота стовпчика
            const color = rr > 0 ? '#48A07A' : '#ff4655'; // Зелений або червоний
            const sign = rr > 0 ? '+' : '';
            
            return `
                <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center; height: 100%; width: 25px;">
                    <div style="font-size: 10px; color: ${color}; font-weight: 800; margin-bottom: 5px;">${sign}${rr}</div>
                    <div style="width: 8px; height: ${height}%; background-color: ${color}; border-radius: 4px; box-shadow: 0 0 8px ${color}60;"></div>
                </div>
            `;
        }).join('');

        historyHTML = `<div style="display: flex; align-items: flex-end; gap: 8px; height: 60px;">${barsHTML}</div>`;
    }
    const mapsHTML = (stats.topMaps || []).map(map => `
        <div style="flex: 1; min-height: 110px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 4px 10px rgba(0,0,0,0.3); position: relative; overflow: hidden; background-color: #121216;">
            
            <div style="position: absolute; inset: 0; background: url('${map.image}') center/cover no-repeat; z-index: 1; transform: scale(1.02);"></div>
            
            <div style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(18,18,22, 1) 0%, rgba(18,18,22, 0.9) 20%, rgba(18,18,22, 0.5) 100%); z-index: 2; padding: 15px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="font-weight: 800; color: #fff; font-size: 1.1rem; text-transform: uppercase;">${map.name}</div>
                    <div style="color: var(--text-sub); font-size: 10px; font-weight: 700; letter-spacing: 1px;">${map.matches} MATCHES</div>
                </div>
                <div style="color: #E2B34E; font-weight: 800; font-size: 1.2rem;">${map.winRate}</div>
            </div>

        </div>
    `).join('');
    const rolesHTML = (stats.topRoles || []).map(role => `
        <div style="display: flex; justify-content: space-between; align-items: center; background-color: rgba(0, 0, 0, 0.3); border-radius: 12px; padding: 12px 15px; box-shadow: inset 3px 3px 6px rgba(0,0,0,0.6), inset -3px -3px 6px rgba(255,255,255,0.03); margin-bottom: 10px;">
            <div style="font-weight: 800; color: #fff; text-transform: uppercase; font-size: 0.9rem;">${role.name}</div>
            <div style="text-align: right;">
                <div style="color: #fff; font-weight: 800; font-size: 1rem;">${role.winRate}</div>
                <div style="color: var(--text-sub); font-size: 10px; font-weight: 600;">${role.matches} MATCHES</div>
            </div>
        </div>
    `).join('');
   // 3. Збираємо все до купи
   container.innerHTML = `
   <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; max-width: 1100px; margin: 0 auto; padding: 20px;">
       
       <div style="grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; background: linear-gradient(to right, rgba(18,18,22, 0.95) 30%, rgba(18,18,22, 0.4)), url('${stats.profile.playerCard || ''}') center/cover no-repeat; border-radius: 20px; padding: 35px 30px; border-left: 4px solid #E2B34E; border: 1px solid rgba(255,255,255,0.05); min-height: 120px;">
           <div>
               <h1 style="margin: 0; color: #fff; font-size: 2.2rem; letter-spacing: 1px;">
                   ${stats.profile.nickname}<span style="color: var(--text-sub); font-size: 1.4rem;">${stats.profile.tag}</span>
               </h1>
           </div>
           <div style="display: flex; align-items: center; gap: 20px;">
               <div style="text-align: right;">
                   <div style="color: #E2B34E; font-weight: 800; font-size: 1.6rem; text-transform: uppercase;">${stats.profile.currentRank}</div>
                   <div style="color: var(--text-sub); font-weight: 600; font-size: 0.9rem; margin-top: 4px;">
                       ${stats.profile.rr} RR <span style="margin: 0 5px;">|</span> Peak: ${stats.profile.peakRank}
                   </div>
               </div>
               <div style="width: 70px; height: 70px; display: flex; justify-content: center; align-items: center;">
                   <img src="${stats.profile.rankImage || ''}" alt="Rank" style="max-width: 100%; max-height: 100%; object-fit: contain;">
               </div>
           </div>
       </div>

       <div style="display: flex; flex-direction: column; gap: 20px;">
           <div style="background: var(--bg-card); border-radius: 20px; padding: 25px; border: 1px solid rgba(255,255,255,0.05);">
               <h2 style="font-size: 1.1rem; color: var(--text-sub); margin-bottom: 15px;">PERFORMANCE</h2>
               
               <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                   <div style="background-color: rgba(0, 0, 0, 0.3); border-radius: 12px; padding: 15px; text-align: center; box-shadow: inset 3px 3px 6px rgba(0,0,0,0.6), inset -3px -3px 6px rgba(255,255,255,0.03);">
                       <div style="font-size: 10px; color: var(--text-sub); margin-bottom: 5px; font-weight: 700; letter-spacing: 1px;">WINRATE</div>
                       <div style="font-size: 1.4rem; color: #fff; font-weight: 800;">${stats.performance.winRate}</div>
                   </div>
                   <div style="background-color: rgba(0, 0, 0, 0.3); border-radius: 12px; padding: 15px; text-align: center; box-shadow: inset 3px 3px 6px rgba(0,0,0,0.6), inset -3px -3px 6px rgba(255,255,255,0.03);">
                       <div style="font-size: 10px; color: var(--text-sub); margin-bottom: 5px; font-weight: 700; letter-spacing: 1px;">K/D RATIO</div>
                       <div style="font-size: 1.4rem; color: #fff; font-weight: 800;">${stats.performance.kdRatio}</div>
                   </div>
                   <div style="background-color: rgba(0, 0, 0, 0.3); border-radius: 12px; padding: 15px; text-align: center; box-shadow: inset 3px 3px 6px rgba(0,0,0,0.6), inset -3px -3px 6px rgba(255,255,255,0.03);">
                       <div style="font-size: 10px; color: var(--text-sub); margin-bottom: 5px; font-weight: 700; letter-spacing: 1px;">ACS</div>
                       <div style="font-size: 1.4rem; color: #fff; font-weight: 800;">${stats.performance.acs}</div>
                   </div>
                   <div style="background-color: rgba(0, 0, 0, 0.3); border-radius: 12px; padding: 15px; text-align: center; box-shadow: inset 3px 3px 6px rgba(0,0,0,0.6), inset -3px -3px 6px rgba(255,255,255,0.03);">
                       <div style="font-size: 10px; color: var(--text-sub); margin-bottom: 5px; font-weight: 700; letter-spacing: 1px;">HEADSHOT %</div>
                       <div style="font-size: 1.4rem; color: #fff; font-weight: 800;">${stats.performance.headshotPercentage}</div>
                   </div>
                   <div style="background-color: rgba(0, 0, 0, 0.3); border-radius: 12px; padding: 15px; text-align: center; box-shadow: inset 3px 3px 6px rgba(0,0,0,0.6), inset -3px -3px 6px rgba(255,255,255,0.03);">
                       <div style="font-size: 10px; color: var(--text-sub); margin-bottom: 5px; font-weight: 700; letter-spacing: 1px;">ADR</div>
                       <div style="font-size: 1.4rem; color: #fff; font-weight: 800;">${stats.performance.adr}</div>
                   </div>
                   <div style="background-color: rgba(0, 0, 0, 0.3); border-radius: 12px; padding: 15px; text-align: center; box-shadow: inset 3px 3px 6px rgba(0,0,0,0.6), inset -3px -3px 6px rgba(255,255,255,0.03);">
                       <div style="font-size: 10px; color: var(--text-sub); margin-bottom: 5px; font-weight: 700; letter-spacing: 1px;">FIRST BLOODS</div>
                       <div style="font-size: 1.4rem; color: #fff; font-weight: 800;">${stats.performance.firstBloods}</div>
                   </div>
               </div>
           </div>

           <div style="background: var(--bg-card); border-radius: 20px; padding: 25px; border: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center;">
               <div>
                   <h2 style="font-size: 10px; color: var(--text-sub); margin-bottom: 15px; font-weight: 700; letter-spacing: 1px;">RECENT MATCHES (RR)</h2>
                   ${historyHTML}
               </div>
               <div style="text-align: right; border-left: 1px solid rgba(255,255,255,0.1); padding-left: 20px;">
                   <h2 style="font-size: 10px; color: var(--text-sub); margin-bottom: 5px; font-weight: 700; letter-spacing: 1px;">FAVOURITE WEAPON</h2>
                   <div style="font-size: 1.2rem; color: #fff; font-weight: 800; text-transform: uppercase;">${stats.favoriteWeapon || 'VANDAL'}</div>
               </div>
           </div>
       </div>

       <div style="background: var(--bg-card); border-radius: 20px; padding: 25px; border: 1px solid rgba(255,255,255,0.05);">
           <h2 style="font-size: 1.1rem; color: var(--text-sub); margin-bottom: 15px;">TOP AGENTS</h2>
           <div class="vlr-agents-list">
               ${agentsHTML}
           </div>
       </div>
       <div style="background: var(--bg-card); border-radius: 20px; padding: 25px; border: 1px solid rgba(255,255,255,0.05);">
                <h2 style="font-size: 1.1rem; color: var(--text-sub); margin-bottom: 15px;">TOP MAPS</h2>
                <div style="display: flex; gap: 15px;">
                    ${mapsHTML}
                </div>
            </div>

            <div style="background: var(--bg-card); border-radius: 20px; padding: 25px; border: 1px solid rgba(255,255,255,0.05);">
                <h2 style="font-size: 1.1rem; color: var(--text-sub); margin-bottom: 15px;">TOP ROLES</h2>
                <div>
                    ${rolesHTML}
                </div>
            </div>
   </div>
`;
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