import { tournamentPlayers } from './data.js';

export function mixMembers(members) {
    const teamsCount = 8;
    const sorted = [...members].sort((a, b) => b.rr - a.rr);
    
    const teams = Array.from({ length: teamsCount }, (_, i) => ({
        id: i + 1,
        members: [],
        totalRR: 0
    }));

    sorted.forEach(member => {
        const weakestTeam = teams.reduce((min, current) =>
            current.totalRR < min.totalRR ? current : min
        );
        weakestTeam.members.push(member);
        weakestTeam.totalRR += member.rr;
    });

    return teams;
}

// ОСЬ ЦЯ ЧАСТИНА МАЄ ВСЕ ОЖИВИТИ:
window.generateTournamentBracket = function() {
    const teams = mixMembers(tournamentPlayers);
    // Шукаємо той самий контейнер, що на твоєму другому скріні
    const container = document.getElementById('teams-container');
    
    if (container) {
        container.innerHTML = teams.map(team => `
            <div class="team-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <strong style="color: var(--text-main); font-size: 1rem;">TEAM ${team.id}</strong>
                    <span style="color: #ff4655; font-weight: bold; font-size: 0.8rem;">
                        AVG RR: ${Math.round(team.totalRR / (team.members.length || 1))}
                    </span>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${team.members.map(m => `
                        <div class="player-tag">
                            ${m.riotId} <small style="opacity: 0.6;">(${m.rr})</small>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
};
window.generateTournamentBracket = function() {
    // 1. Отримуємо команди від твого алгоритму
    const teams = mixMembers(tournamentPlayers); 
    
    // 2. Малюємо список команд (верхня плашка)
    const teamsContainer = document.getElementById('teams-container');
    if (teamsContainer) {
        teamsContainer.innerHTML = teams.map(team => `
            <div class="team-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <strong>TEAM ${team.id}</strong>
                    <span>AVG RR: ${Math.round(team.totalRR / (team.members.length || 1))}</span>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${team.members.map(m => `
                        <div class="player-tag">${m.riotId} <small>(${m.rr})</small></div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    // 3. Малюємо графічну сітку (нижня плашка)
    // Шукаємо контейнер для сітки
const bracketContainer = document.getElementById('bracket-container');

if (bracketContainer && teams.length >= 8) {
    bracketContainer.innerHTML = `
        <div class="bracket-wrapper">
            <div class="bracket-round">
                ${[0, 2, 4, 6].map(i => `
                    <div class="bracket-match">
                        <div class="bracket-team win">Team ${teams[i].id} <span>${Math.round(teams[i].totalRR / teams[i].members.length)}</span></div>
                        <div class="bracket-team">Team ${teams[i+1].id} <span>${Math.round(teams[i+1].totalRR / teams[i+1].members.length)}</span></div>
                    </div>
                `).join('')}
            </div>
            
            <div class="bracket-round">
                <div class="bracket-match">
                    <div class="bracket-team win">Team ${teams[0].id} <span>2</span></div>
                    <div class="bracket-team">Team ${teams[2].id} <span>1</span></div>
                </div>
                <div class="bracket-match">
                    <div class="bracket-team">Team ${teams[4].id} <span>0</span></div>
                    <div class="bracket-team win">Team ${teams[6].id} <span>2</span></div>
                </div>
            </div>
            
            <div class="bracket-round">
                <div class="bracket-match final">
                    <div class="bracket-team">Team ${teams[0].id} <span>-</span></div>
                    <div class="bracket-team">Team ${teams[6].id} <span>-</span></div>
                </div>
            </div>
        </div>
    `;
}
}