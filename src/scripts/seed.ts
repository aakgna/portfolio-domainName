import { seedFirestoreData } from '../lib/seed';

async function main() {
  try {
    await seedFirestoreData();
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

main();
