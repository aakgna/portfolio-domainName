import { doc, setDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export const seedFirestoreData = async () => {
	try {
		console.log("Seeding Firestore with initial data...");

		// Seed objective
		await setDoc(doc(db, "objective", "main"), {
			content:
				"Passionate software developer with expertise in full-stack development, cloud technologies, and user experience design. Committed to creating innovative solutions that make a positive impact.",
			updatedAt: Timestamp.now(),
		});

		// Seed education
		const educationRef = collection(db, "education");
		await addDoc(educationRef, {
			title: "Bachelor of Science in Computer Science",
			institution: "University of Technology",
			location: "San Francisco, CA",
			startDate: "2018-09-01",
			endDate: "2022-05-15",
			description:
				"Graduated Magna Cum Laude. Relevant coursework: Data Structures, Algorithms, Software Engineering, Web Development.",
			link: "https://example-university.edu",
			visible: true,
			order: 1,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		});

		// Seed experiences
		const experiencesRef = collection(db, "experiences");
		await addDoc(experiencesRef, {
			title: "Senior Software Engineer",
			company: "Tech Innovations Inc.",
			location: "San Francisco, CA",
			role: "Full-Stack Developer",
			startDate: "2022-06-01",
			endDate: null,
			description:
				"Leading development of scalable web applications using React, Node.js, and AWS. Mentoring junior developers and implementing best practices for code quality and testing.",
			technologies: ["React", "Node.js", "AWS", "TypeScript", "MongoDB"],
			link: "https://techinnovations.com",
			visible: true,
			order: 1,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		});

		await addDoc(experiencesRef, {
			title: "Software Engineer",
			company: "StartupXYZ",
			location: "Remote",
			role: "Frontend Developer",
			startDate: "2021-01-01",
			endDate: "2022-05-31",
			description:
				"Developed responsive web applications and collaborated with cross-functional teams to deliver high-quality user experiences.",
			technologies: ["Vue.js", "JavaScript", "Firebase", "Tailwind CSS"],
			link: "https://startupxyz.com",
			visible: true,
			order: 2,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		});

		// Seed projects
		const projectsRef = collection(db, "projects");
		await addDoc(projectsRef, {
			title: "E-Commerce Platform",
			description:
				"A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
			technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
			link: "https://github.com/username/ecommerce-platform",
			visible: true,
			order: 1,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		});

		await addDoc(projectsRef, {
			title: "Task Management App",
			description:
				"A collaborative task management application with real-time updates and team collaboration features.",
			technologies: ["React", "Socket.io", "Express", "MongoDB"],
			link: "https://github.com/username/task-manager",
			visible: true,
			order: 2,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		});

		// Seed publications
		const publicationsRef = collection(db, "publications");
		await addDoc(publicationsRef, {
			title: "Optimizing React Performance: A Comprehensive Guide",
			description:
				"Published article on Medium discussing advanced React optimization techniques and best practices.",
			link: "https://medium.com/@username/react-performance-guide",
			visible: true,
			order: 1,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		});

		// Seed skills
		await setDoc(doc(db, "skills", "main"), {
			skills: [
				"JavaScript",
				"TypeScript",
				"React",
				"Next.js",
				"Node.js",
				"Python",
				"AWS",
				"Docker",
				"Git",
				"MongoDB",
				"PostgreSQL",
			],
			updatedAt: Timestamp.now(),
		});

		// Seed config (allowed email)
		await setDoc(doc(db, "config", "auth"), {
			allowedEmail: process.env.ALLOWED_EMAIL || "aakashappiah@gmail.com",
			updatedAt: Timestamp.now(),
		});

		console.log("Firestore seeded successfully!");
	} catch (error) {
		console.error("Error seeding Firestore:", error);
		throw error;
	}
};
