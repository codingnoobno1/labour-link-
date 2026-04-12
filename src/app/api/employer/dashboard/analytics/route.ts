import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Trend: Applications per day for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: trendData, error: trendError } = await supabase
      .from('applications')
      .select(`
        created_at,
        works!inner (
          companies!inner (
            owner_id
          )
        )
      `)
      .eq('works.companies.owner_id', user.id)
      .gte('created_at', sevenDaysAgo.toISOString());

    // Analytics: Average bid amount for active jobs
    const { data: bidData, error: bidError } = await supabase
      .from('applications')
      .select(`
        bid_amount,
        works!inner (
          id,
          title,
          companies!inner (
            owner_id
          )
        )
      `)
      .eq('works.companies.owner_id', user.id);

    if (trendError || bidError) {
      return NextResponse.json({ error: 'Error fetching analytics' }, { status: 400 });
    }

    // Process trend data
    const dailyTrends: Record<string, number> = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dailyTrends[dateStr] = 0;
    }

    trendData.forEach(app => {
      const dateStr = new Date(app.created_at).toISOString().split('T')[0];
      if (dailyTrends[dateStr] !== undefined) {
        dailyTrends[dateStr]++;
      }
    });

    // Process average bids per job
    const jobStats: Record<string, { title: string, count: number, totalBid: number }> = {};
    bidData.forEach(app => {
      const job = app.works as any;
      if (!jobStats[job.id]) {
        jobStats[job.id] = { title: job.title, count: 0, totalBid: 0 };
      }
      jobStats[job.id].count++;
      jobStats[job.id].totalBid += app.bid_amount;
    });

    const averageBids = Object.values(jobStats).map(stat => ({
      title: stat.title,
      averageBid: stat.count > 0 ? Math.round(stat.totalBid / stat.count) : 0,
    }));

    return NextResponse.json({
      trends: Object.entries(dailyTrends).map(([date, count]) => ({ date, count })).reverse(),
      averageBids,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Employer analytics error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
