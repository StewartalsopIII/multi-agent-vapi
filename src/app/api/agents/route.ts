import { NextRequest, NextResponse } from 'next/server';
import { getAllAgents, setAgent, deleteAgent } from '@/lib/kv';

// Get all agents
export async function GET() {
  try {
    const agents = await getAllAgents();
    return NextResponse.json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}

// Create or update agent
export async function POST(request: NextRequest) {
  try {
    const { name, assistantId } = await request.json();

    if (!name || !assistantId) {
      return NextResponse.json(
        { error: 'Name and assistantId are required' },
        { status: 400 }
      );
    }

    // Validate name format (lowercase letters, numbers, hyphens only)
    const namePattern = /^[a-z0-9-]+$/;
    if (!namePattern.test(name)) {
      return NextResponse.json(
        { error: 'Name must contain only lowercase letters, numbers, and hyphens' },
        { status: 400 }
      );
    }

    const agent = await setAgent(name, assistantId);
    return NextResponse.json(agent);
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json(
      { error: 'Failed to create agent' },
      { status: 500 }
    );
  }
}

// Delete agent
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json(
        { error: 'Name parameter is required' },
        { status: 400 }
      );
    }

    const success = await deleteAgent(name);

    if (success) {
      return NextResponse.json({ message: 'Agent deleted successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete agent' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting agent:', error);
    return NextResponse.json(
      { error: 'Failed to delete agent' },
      { status: 500 }
    );
  }
}