// api/getAllUsers/route.js

import { NextResponse } from 'next/server';
import connectToDatabase from '../../utils/mongodb';

export async function GET() {
    try {
        const db = await connectToDatabase();
        const User = db.model('User'); 

        const users = await User.find({}).exec();
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
