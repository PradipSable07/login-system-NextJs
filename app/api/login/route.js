// api/login/route.js

import connectToDatabase from '../../utils/mongodb';
import { NextResponse } from 'next/server';
import User from '../../utils/model';

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const db = await connectToDatabase();
    const UserModel = db.model('User', User.schema);

    const user = await UserModel.findOne({ email, password }).exec();

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
