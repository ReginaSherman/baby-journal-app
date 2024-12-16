import { prisma } from "@/server/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method=== "GET") {
        const users = await prisma.user.findMany()

        return res.status(200).json({
            users
        })
    } else if (req.method === "POST") {
        const body = req.body;

        const user = await prisma.user.create({
            data: {
                email: body.email,
            }
        });

        return res.status(200).json({
            user
        })
    } 
        
    return res.status(405)
}