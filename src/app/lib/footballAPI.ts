const API_KEY = process.env.API_FOOTBALL_KEY!;
const BASE_URL = 'https://v3.football.api-sports.io';


export async function fetchTodayMatches(){
    const today = new Date().toISOString().split('T')[0];
    const res = await fetch(`${BASE_URL}/fixtures?dat=${today}`,{
        headers:{'x-apisports-key':API_KEY}
    })
    const data = await res.json();
    return data.response;
}

export async function fetchLineups(matchId: string) {
    const res = await fetch(`${BASE_URL}/lineups?fixture=${matchId}`, {
        headers: { 'x-apisports-key': API_KEY }
    });
    const data = await res.json();
    return data.response;
}

export async function fetchStats(matchId: string) {
    const res = await fetch(`${BASE_URL}/fixtures/statistics?fixture=${matchId}`, {
        headers: { 'x-apisports-key': API_KEY },
    })
    const data = await res.json();
    return data.response;
}