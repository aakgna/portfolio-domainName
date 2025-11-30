import {
	collection,
	doc,
	getDoc,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	query,
	orderBy,
	where,
	Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// Types for portfolio data
export interface PortfolioItem {
	id: string;
	title?: string;
	description?: string;
	institution?: string;
	company?: string;
	role?: string;
	startDate?: string;
	endDate?: string;
	location?: string;
	technologies?: string[];
	skills?: string[];
	link?: string;
	imageUrl?: string;
	visible: boolean;
	order: number;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface PortfolioSection {
	id: string;
	title: string;
	content?: string;
	items: PortfolioItem[];
}

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

// Get all portfolio data
export const getPortfolioData = async () => {
	try {
		const [objective, education, experiences, projects, publications, skills] =
			await Promise.all([
				getObjective(),
				getSectionItems(COLLECTIONS.EDUCATION),
				getSectionItems(COLLECTIONS.EXPERIENCES),
				getSectionItems(COLLECTIONS.PROJECTS),
				getSectionItems(COLLECTIONS.PUBLICATIONS),
				getSkills(),
			]);

		return {
			objective,
			education,
			experiences,
			projects,
			publications,
			skills,
		};
	} catch (error) {
		console.error("Error getting portfolio data:", error);
		throw error;
	}
};

// Get objective section
export const getObjective = async (): Promise<string> => {
	try {
		const docRef = doc(db, COLLECTIONS.OBJECTIVE, "main");
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap.data().content || "";
		}

		// Return default content if not found
		return "Passionate developer creating innovative solutions...";
	} catch (error) {
		console.error("Error getting objective:", error);
		return "";
	}
};

// Update objective section
export const updateObjective = async (content: string): Promise<void> => {
	try {
		const docRef = doc(db, COLLECTIONS.OBJECTIVE, "main");
		await updateDoc(docRef, {
			content,
			updatedAt: Timestamp.now(),
		});
	} catch (error) {
		console.error("Error updating objective:", error);
		throw error;
	}
};

// Get items from a section
export const getSectionItems = async (
	sectionName: string
): Promise<PortfolioItem[]> => {
	try {
		// Query without orderBy to avoid needing composite indexes
		// We'll sort in memory instead
		const q = query(
			collection(db, sectionName),
			where("visible", "==", true)
		);
		const querySnapshot = await getDocs(q);

		const items = querySnapshot.docs.map(
			(doc) =>
				({
					id: doc.id,
					...doc.data(),
				} as PortfolioItem)
		);

		// Sort by order in memory
		return items.sort((a, b) => (a.order || 0) - (b.order || 0));
	} catch (error) {
		console.error(`Error getting ${sectionName} items:`, error);
		return [];
	}
};

// Get all items from a section (including hidden ones for admin)
export const getAllSectionItems = async (
	sectionName: string
): Promise<PortfolioItem[]> => {
	try {
		const q = query(collection(db, sectionName), orderBy("order", "asc"));
		const querySnapshot = await getDocs(q);

		return querySnapshot.docs.map(
			(doc) =>
				({
					id: doc.id,
					...doc.data(),
				} as PortfolioItem)
		);
	} catch (error) {
		console.error(`Error getting all ${sectionName} items:`, error);
		return [];
	}
};

// Add new item to section
export const addSectionItem = async (
	sectionName: string,
	item: Omit<PortfolioItem, "id" | "createdAt" | "updatedAt">
): Promise<string> => {
	try {
		const docRef = await addDoc(collection(db, sectionName), {
			...item,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		});

		return docRef.id;
	} catch (error) {
		console.error(`Error adding item to ${sectionName}:`, error);
		throw error;
	}
};

// Update item in section
export const updateSectionItem = async (
	sectionName: string,
	itemId: string,
	updates: Partial<PortfolioItem>
): Promise<void> => {
	try {
		const docRef = doc(db, sectionName, itemId);
		await updateDoc(docRef, {
			...updates,
			updatedAt: Timestamp.now(),
		});
	} catch (error) {
		console.error(`Error updating item in ${sectionName}:`, error);
		throw error;
	}
};

// Delete item from section
export const deleteSectionItem = async (
	sectionName: string,
	itemId: string
): Promise<void> => {
	try {
		await deleteDoc(doc(db, sectionName, itemId));
	} catch (error) {
		console.error(`Error deleting item from ${sectionName}:`, error);
		throw error;
	}
};

// Get allowed email from config
export const getAllowedEmail = async (): Promise<string> => {
	try {
		const docRef = doc(db, COLLECTIONS.CONFIG, "auth");
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap.data().allowedEmail || "";
		}

		return "";
	} catch (error) {
		console.error("Error getting allowed email:", error);
		return "";
	}
};

// Get skills (special case - stored as a single document)
export const getSkills = async (): Promise<string[]> => {
	try {
		const docRef = doc(db, COLLECTIONS.SKILLS, "main");
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap.data().skills || [];
		}

		return [];
	} catch (error) {
		console.error("Error getting skills:", error);
		return [];
	}
};

// Update skills
export const updateSkills = async (skills: string[]): Promise<void> => {
	try {
		const docRef = doc(db, COLLECTIONS.SKILLS, "main");
		await updateDoc(docRef, {
			skills,
			updatedAt: Timestamp.now(),
		});
	} catch (error) {
		console.error("Error updating skills:", error);
		throw error;
	}
};
