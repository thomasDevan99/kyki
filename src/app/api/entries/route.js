import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const { rarities } = await req.json();

    if (!Array.isArray(rarities)) {
      return new Response(
        JSON.stringify({ error: "Invalid payload, expected rarities array" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Count occurrences of each rarity
    const counts = rarities.reduce((acc, rarity) => {
      acc[rarity] = (acc[rarity] || 0) + 1;
      return acc;
    }, {});


    // Build summary string "Common 4, Rare 3, Epic 3"
    const summaryString = Object.entries(counts)
      .map(([rarity, count]) => `${rarity} ${count}`)
      .join(", ");

      
    // Example: insert the summaryString as a single record (optional)
    const { data, error } = await supabase
      .from("entries")
      .insert([{ rarity: summaryString }]);

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, summary: summaryString, inserted: data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
