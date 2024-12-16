import { AuthenticatedHandler, withAuth } from "@/server/lib/auth";
import { prisma } from "@/server/lib/prisma";

const handler: AuthenticatedHandler = async (req, res, ctx) => {
    const { id } = req.query as {
        id: string;
    };

    if (id !== ctx.user.id) {
        return res.status(403).json({ message: "Not authorized."});
    }

    const user = await prisma.user.findUnique({
        where: {
            id,
        }
    });

    return res.status(200).json(user);
}

export default withAuth(handler);