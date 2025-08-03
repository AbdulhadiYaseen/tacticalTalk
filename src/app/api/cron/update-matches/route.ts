import { NextResponse, NextRequest } from "next/server";
import dbConnect from '@/app/lib/mongoose';
import Match from "@/app/models/Match";
import { fetchTodayMatches, fetchLineups, fetchStats } from "@/app/lib/footballAPI";

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const matches = await fetchTodayMatches();
        for(const match of matches){
            const fixtureId = match.fixture.id;
            const [lineups, stats] = await Promise.all([
                fetchLineups(fixtureId),
                fetchStats(fixtureId)
            ]);

            await Match.findOneAndUpdate(
                {fixtureId},
                {
                    fixtureId,
                    date: match.fixture.date,
                    teams: {
                        home: match.teams.home.name,
                        away: match.teams.away.name,
                    },
                    status: match.fixture.status.short,
                    score: match.goals,
                    lineups,
                    stats,  
                },
                {upsert:true, new:true}
            );
        }
        return NextResponse.json({message:'Matches updated successfully'},{status:200});
    } 
    catch(error){
        console.error('Error updating matches:', error);
        return NextResponse.json({message:'Error updating matches'},{status:500});
    }
}