// script.js
import { players, customMatches, tournamentPlayers, tournaments } from './data.js'; // Імпортуємо нашу базу
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

// Запуск
window.onload = () => {
    showSection('screen-hero');
    renderPlayers(players);
    renderCustoms(customMatches);
    renderTournaments(tournaments);
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