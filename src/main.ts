import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() { 
	const user = await prisma.user.create({
		data: {
			name: "Peter",
			email: "test@hotmail.com",
			password: "test",
			meditationDuration: 50,
            meditations: {}            
		},
	});
    console.log('created a new user:', user)

    const allUsers = await prisma.user.findMany({
    include: { meditations: true },
  })
  console.log('All users: ')
  console.dir(allUsers, { depth: null })
}




main()
	.catch(e => console.error(e))
	.finally(async () => await prisma.$disconnect());
