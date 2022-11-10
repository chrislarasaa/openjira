
interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Amet dolore ex velit eiusmod deserunt culpa proident do.',
            createdAt: Date.now(),
            status: 'pending'
        },
        {
            description: 'Consequat non voluptate ipsum et proident enim amet adipisicing excepteur nostrud consectetur.',
            createdAt: Date.now() - 1000000,
            status: 'in-progress'
        },
        {
            description: 'Quis nostrud reprehenderit laboris irure est officia officia velit eu Lorem anim aliquip aliquip.',
            createdAt: Date.now() - 100000,
            status: 'finished'
        }
    ]
}
