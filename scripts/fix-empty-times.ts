import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const defaultTimes = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

async function main() {
    const emptyOnes = await prisma.employee.findMany({
        where: { times: { equals: [] } },
    });
    console.log("Employees sem horários:", emptyOnes.length);

    if (emptyOnes.length > 0) {
        const result = await prisma.employee.updateMany({
            where: { times: { equals: [] } },
            data: { times: defaultTimes },
        });
        console.log("Corrigidos:", result.count);
    } else {
        console.log("Nenhum employee para corrigir.");
    }

    await prisma.$disconnect();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
