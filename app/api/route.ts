// app/api/mono/auth/route.ts
import { NextResponse } from 'next/server';

interface PostRequest {
  reference: string;
}

interface PostResponse {
  id: string;
  status: string;
  auth_url: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const data: PostRequest = await request.json();
    
    // Call Mono API to initialize authentication
    const response = await fetch('https://api.withmono.com/account/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'mono-sec-key': process.env.MONO_SECRET_KEY || ''
      },
      body: JSON.stringify({
        reference: data.reference
      })
    });
    
    const responseData: PostResponse = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to authenticate with bank' }, { status: 500 });
  }
}


export async function GET() {
  try {
    // Fetch connected accounts from your database or directly from Mono
    const response = await fetch('https://api.withmono.com/accounts', {
      headers: new Headers({
        'mono-sec-key': process.env.MONO_SECRET_KEY || ''
      })
    });
    
    const accounts = await response.json();
    
    // Transform the data to match your frontend structure
    interface Account {
      id: string;
      institution: {
        name: string;
      };
      accountNumber: string;
      balance: number;
      updatedAt: string;
    }

    interface TransformedAccount {
      id: string;
      name: string;
      account_number: string;
      balance: number;
      currency: string;
      lastUpdated: string;
    }

    const transformedAccounts: TransformedAccount[] = accounts.data.map((account: Account) => ({
      id: account.id,
      name: account.institution.name,
      account_number: account.accountNumber,
      balance: account.balance,
      currency: "NGN",
      lastUpdated: new Date(account.updatedAt).toISOString()
    }));
    
    return NextResponse.json(transformedAccounts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 });
  }
}