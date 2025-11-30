import { clearFirestoreData } from '../lib/clear';

async function main() {
  try {
    await clearFirestoreData();
    console.log('✅ Database cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
}

main();

