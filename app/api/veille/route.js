import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

export const revalidate = 1800;

export async function GET() {
  try {
    let allEntries = [];
    let hasMore = true;
    let startCursor = undefined;

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: databaseId,
        sorts: [
          { property: 'Date', direction: 'descending' },
          { property: 'Rang', direction: 'ascending' },
        ],
        page_size: 100,
        ...(startCursor ? { start_cursor: startCursor } : {}),
      });

      const entries = response.results.map((page) => {
        const getText = (prop) => prop?.[0]?.plain_text || '';
        return {
          id: page.id,
          titre: getText(page.properties.Titre?.title),
          resume: getText(page.properties['Résumé']?.rich_text),
          canal: page.properties.Canal?.select?.name || '',
          categorie: page.properties['Catégorie']?.select?.name || 'Autre',
          importance: page.properties.Importance?.select?.name || 'MEDIUM',
          rang: page.properties.Rang?.number || 0,
          date: page.properties.Date?.date?.start || '',
          source: page.properties.Source?.url || '',
        };
      });

      allEntries = [...allEntries, ...entries];
      hasMore = response.has_more;
      startCursor = response.next_cursor;
    }

    return NextResponse.json(allEntries);
  } catch (error) {
    console.error('Notion API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
