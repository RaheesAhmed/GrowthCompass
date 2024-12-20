import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma, supabase } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      console.log("Missing required fields:", {
        name: !!name,
        email: !!email,
        password: !!password,
      });
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists in Prisma
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    console.log("Creating new user with email:", email);

    // Use Supabase Auth to sign up the user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/callback`,
      },
    });

    if (signUpError) {
      console.error("Error signing up user:", signUpError);
      return NextResponse.json(
        { message: signUpError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { message: "No user data returned" },
        { status: 500 }
      );
    }

    // Hash password for Prisma storage
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user in Prisma database
    const prismaUser = await prisma.user.create({
      data: {
        id: authData.user.id,
        email: email,
        name: name,
        hashedPassword,
        emailVerified: new Date(), // Auto-verify for now
      },
    });

    console.log("User created successfully:", prismaUser.id);

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: prismaUser.id,
          email: prismaUser.email,
          name: prismaUser.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Detailed error in signup:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
