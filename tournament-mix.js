import { tournamentPlayers } from './data.js';

export function mixMembers(members) {
    const teamsCount = 8;

    const sorted = [...members].sort((a, b) => b.rr - a.rr);
    
    const teams = Array.from({ length: teamsCount }, (_, i) => ({
        id: i+1,
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

const result = mixMembers(tournamentPlayers);
console.log(result);