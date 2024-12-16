import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export type AuthUser = {
    id: string;
    name: string;
    emailVerified: boolean | null;
    email: string;
    imageUrl: string;
}

export type AuthContext = {
    user: AuthUser;
}

export type AuthenticatedHandler = (
    req: NextApiRequest, 
    res: NextApiResponse,
    ctx: AuthContext,
) => Promise<void>

export function withAuth(
    handler: AuthenticatedHandler
) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(403).json({ message: "Not authorized."});
        }

        // We add the ID and additional data in the callback
        const user = session.user as AuthUser;
        const ctx = { user };

        return handler(req, res, ctx);
    }
}