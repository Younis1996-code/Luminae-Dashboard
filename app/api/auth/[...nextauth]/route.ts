// Import NextAuth and necessary types/interfaces for authentication configuration.
// NextAuth is the main function for setting up authentication in Next.js.
// AuthOptions is the type for configuration options, SessionStrategy specifies how sessions are handled.
import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";

// Import CredentialsProvider from next-auth/providers for credential-based authentication.
// This provider allows custom login with username/password.
import CredentialsProvider from "next-auth/providers/credentials";

// Export the authentication options object, typed as AuthOptions.
// This config defines how authentication works, including providers, pages, session strategy, and secret.
export const authOptions: AuthOptions = {
  // Array of authentication providers.
  // Here, only CredentialsProvider is used for username/password login.
  providers: [
    CredentialsProvider({
      // Name of the provider, displayed on the sign-in page.
      name: "Credentials",
      // Define the form fields for credentials (username and password).
      // Each field has a label and type for rendering in the UI (though custom UI is used here).
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Async function to authorize the user based on provided credentials.
      // This is where you validate the username and password.
      async authorize(credentials) {
        // Check if credentials match hardcoded values (for demo; in production, use database or secure check).
        // If valid, return a user object (with id and name); otherwise, return null to indicate failure.
        if (
          credentials?.username === "admin" &&
          credentials?.password === "1234"
        ) {
          return { id: "1", name: "Admin User" };
        }
        return null;
      },
    }),
  ],
  // Custom pages configuration.
  // Specifies the sign-in page URL (overrides default NextAuth page).
  pages: { signIn: "/signin"},
  // Session configuration.
  // Uses JWT (JSON Web Token) strategy for sessions, which is stateless and secure.
  session: { strategy: "jwt" as SessionStrategy },
  // Secret key for signing JWTs and encrypting sessions.
  // Pulled from environment variables for security (set in .env file).
  secret: process.env.NEXTAUTH_SECRET,
};

// Create the NextAuth handler using the defined options.
// This handler processes all authentication requests (sign-in, sign-out, etc.).
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST methods.
// In Next.js API routes, this allows the route to handle both HTTP methods for auth operations.
export { handler as GET, handler as POST };
