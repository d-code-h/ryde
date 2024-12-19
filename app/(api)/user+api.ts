import { neon } from '@neondatabase/serverless';

/**
 * Handles the POST request to create a new user.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - The response object.
 *
 * @throws {Response} - Throws a 400 response if the JSON is invalid or required fields are missing.
 * @throws {Response} - Throws a 500 response if the database URL is not set or an internal server error occurs.
 *
 * The function performs the following steps:
 * 1. Parses the JSON body of the request to extract `name`, `email`, and `clerkId`.
 * 2. Checks if the `DATABASE_URL` environment variable is set.
 * 3. Validates that `name`, `email`, and `clerkId` are provided.
 * 4. Inserts the new user into the `users` table in the database.
 * 5. Returns a 200 response with the result of the insertion.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    let name, email, clerkId;
    try {
      const body = await request.json();
      name = body.name;
      email = body.email;
      clerkId = body.clerkId;
    } catch {
      return new Response('Invalid JSON', { status: 400 });
    }

    if (!databaseUrl) {
      return new Response('Database URL not set', { status: 500 });
    }

    const sql = neon(databaseUrl);

    if (!name || !email || !clerkId) {
      return new Response('Missing required fields', { status: 400 });
    }

    const response = await sql`
    INSERT INTO users (name, email, clerk_id) VALUES (${name}, ${email}, ${clerkId})
    `;

    return new Response(JSON.stringify({ data: response }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating user', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
