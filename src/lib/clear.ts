import { collection, getDocs, deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

// Collection names
const COLLECTIONS = {
	OBJECTIVE: "objective",
	EDUCATION: "education",
	EXPERIENCES: "experiences",
	PROJECTS: "projects",
	PUBLICATIONS: "publications",
	SKILLS: "skills",
	CONFIG: "config",
} as const;

export const clearFirestoreData = async () => {
	try {
		console.log("Clearing Firestore data (preserving config/auth)...");

		// Clear objective collection and recreate main document
		console.log("Clearing objective collection...");
		const objectiveRef = collection(db, COLLECTIONS.OBJECTIVE);
		const objectiveSnapshot = await getDocs(objectiveRef);
		for (const docSnap of objectiveSnapshot.docs) {
			await deleteDoc(doc(db, COLLECTIONS.OBJECTIVE, docSnap.id));
		}
		console.log(`✅ Deleted ${objectiveSnapshot.docs.length} objective document(s)`);
		
		// Recreate main objective document
		await setDoc(doc(db, COLLECTIONS.OBJECTIVE, "main"), {
			content: "",
			updatedAt: Timestamp.now(),
		});
		console.log("✅ Created empty objective/main document");

		// Clear education collection
		console.log("Clearing education collection...");
		const educationRef = collection(db, COLLECTIONS.EDUCATION);
		const educationSnapshot = await getDocs(educationRef);
		for (const docSnap of educationSnapshot.docs) {
			await deleteDoc(doc(db, COLLECTIONS.EDUCATION, docSnap.id));
		}
		console.log(`✅ Deleted ${educationSnapshot.docs.length} education document(s)`);

		// Clear experiences collection
		console.log("Clearing experiences collection...");
		const experiencesRef = collection(db, COLLECTIONS.EXPERIENCES);
		const experiencesSnapshot = await getDocs(experiencesRef);
		for (const docSnap of experiencesSnapshot.docs) {
			await deleteDoc(doc(db, COLLECTIONS.EXPERIENCES, docSnap.id));
		}
		console.log(`✅ Deleted ${experiencesSnapshot.docs.length} experience document(s)`);

		// Clear projects collection
		console.log("Clearing projects collection...");
		const projectsRef = collection(db, COLLECTIONS.PROJECTS);
		const projectsSnapshot = await getDocs(projectsRef);
		for (const docSnap of projectsSnapshot.docs) {
			await deleteDoc(doc(db, COLLECTIONS.PROJECTS, docSnap.id));
		}
		console.log(`✅ Deleted ${projectsSnapshot.docs.length} project document(s)`);

		// Clear publications collection
		console.log("Clearing publications collection...");
		const publicationsRef = collection(db, COLLECTIONS.PUBLICATIONS);
		const publicationsSnapshot = await getDocs(publicationsRef);
		for (const docSnap of publicationsSnapshot.docs) {
			await deleteDoc(doc(db, COLLECTIONS.PUBLICATIONS, docSnap.id));
		}
		console.log(`✅ Deleted ${publicationsSnapshot.docs.length} publication document(s)`);

		// Clear skills collection and recreate main document
		console.log("Clearing skills collection...");
		const skillsRef = collection(db, COLLECTIONS.SKILLS);
		const skillsSnapshot = await getDocs(skillsRef);
		for (const docSnap of skillsSnapshot.docs) {
			await deleteDoc(doc(db, COLLECTIONS.SKILLS, docSnap.id));
		}
		console.log(`✅ Deleted ${skillsSnapshot.docs.length} skills document(s)`);
		
		// Recreate main skills document
		await setDoc(doc(db, COLLECTIONS.SKILLS, "main"), {
			skills: [],
			updatedAt: Timestamp.now(),
		});
		console.log("✅ Created empty skills/main document");

		// Note: We're NOT clearing config/auth - that's preserved
		console.log("✅ Config/auth document preserved");

		console.log("✅ Firestore data cleared successfully!");
	} catch (error) {
		console.error("Error clearing Firestore:", error);
		throw error;
	}
};

