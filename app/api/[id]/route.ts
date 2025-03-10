// app/api/accounts/[id]/balance/route.ts
import { NextResponse } from 'next/server';

interface RequestParams {
    params: {
        id: string;
    };
}

interface AccountResponse {
    balance: number;
}

export async function GET(request: Request, { params }: RequestParams): Promise<NextResponse> {
    try {
        const { id } = params;
        
        // Call Mono API to get the latest balance
        const response = await fetch(`https://api.withmono.com/accounts/${id}`, {
            headers: {
                'mono-sec-key': process.env.MONO_SECRET_KEY as string
            }
        });
        
        const account: AccountResponse = await response.json();
        
        return NextResponse.json({ balance: account.balance });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 });
    }
}