import { AuthenticatedHandler, withAuth } from "@/server/lib/auth";

const handler: AuthenticatedHandler = async (_req, res, ctx) => {
    return res.status(200).json(ctx.user)
}

export default withAuth(handler);