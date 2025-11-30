import { getPortfolioData } from "@/lib/firestore";
import Navigation from "@/components/Navigation";
import ObjectiveSection from "@/components/portfolio/ObjectiveSection";
import EducationSection from "@/components/portfolio/EducationSection";
import ExperiencesSection from "@/components/portfolio/ExperiencesSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import PublicationsSection from "@/components/portfolio/PublicationsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ContactsSection from "@/components/portfolio/ContactsSection";
import HeroSection from "@/components/portfolio/HeroSection";

// Enable static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
	// Fetch portfolio data from Firestore
	const portfolioData = await getPortfolioData();

	return (
		<div className="min-h-screen bg-white">
			<Navigation />
			<HeroSection />
			{/* Portfolio Sections */}
			<ObjectiveSection content={portfolioData.objective} />
			<EducationSection education={portfolioData.education} />
			<ExperiencesSection experiences={portfolioData.experiences} />
			<ProjectsSection projects={portfolioData.projects} />
			<PublicationsSection publications={portfolioData.publications} />
			<SkillsSection skills={portfolioData.skills} />
			<ContactsSection />
		</div>
	);
}
