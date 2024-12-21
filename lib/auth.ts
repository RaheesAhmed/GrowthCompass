import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

// This is a simple admin user check - in production, use a proper database
const isValidAdminUser = (email: string, password: string) => {
  // In production, replace with actual database lookup and proper password hashing
  const validAdmins = [
    {
      id: "1",
      email: "admin@growthcompass.co",
      name: "Admin User",
      password: "admin123", // In production, use hashed passwords
    },
  ];

  return validAdmins.find(
    (admin) => admin.email === email && admin.password === password
  );
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const user = isValidAdminUser(credentials.email, credentials.password);

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        throw new Error("Invalid credentials");
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        // Add admin flag if using credentials provider
        if (account?.provider === "credentials") {
          token.isAdmin = true;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
