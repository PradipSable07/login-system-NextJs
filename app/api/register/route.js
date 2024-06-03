// api/register/route.js

import { NextResponse } from 'next/server';
import connectToDatabase from '../../utils/mongodb';
import User from '../../utils/model';

export async function POST(request) {
  await connectToDatabase();

  const { fullName, email, mobile, password } = await request.json();

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create a new user instance
    user = new User({
      fullName,
      email,
      mobile,
      password,
    });

    // Save the user to the database
    await user.save();

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
