"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChange, logout } from "@/lib/auth";
import {
	getPortfolioData,
	getAllSectionItems,
	updateSectionItem,
	addSectionItem,
	deleteSectionItem,
	updateObjective,
	updateSkills,
} from "@/lib/firestore";
import { PortfolioItem } from "@/lib/firestore";
import { Timestamp } from "firebase/firestore";
import { LogOut, Plus, Edit, Trash2, Eye, EyeOff, Save, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface PortfolioData {
	objective: string;
	education: PortfolioItem[];
	experiences: PortfolioItem[];
	projects: PortfolioItem[];
	publications: PortfolioItem[];
	skills: string[];
}

export default function AdminDashboard() {
	const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [editingSection, setEditingSection] = useState<string | null>(null);
	const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
	const [editingSectionName, setEditingSectionName] = useState<string | null>(
		null
	);
	const [isNewItem, setIsNewItem] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// Check authentication
		const unsubscribe = onAuthStateChange((user) => {
			if (!user) {
				router.push("/admin/login");
				return;
			}
			loadPortfolioData();
		});

		return () => unsubscribe();
	}, [router]);

	const loadPortfolioData = async () => {
		try {
			setLoading(true);
			const [publicData, education, experiences, projects, publications] =
				await Promise.all([
					getPortfolioData(),
					getAllSectionItems("education"),
					getAllSectionItems("experiences"),
					getAllSectionItems("projects"),
					getAllSectionItems("publications"),
				]);

			setPortfolioData({
				...publicData,
				education,
				experiences,
				projects,
				publications,
			});
		} catch (error) {
			console.error("Error loading portfolio data:", error);
			toast.error("Failed to load portfolio data");
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = async () => {
		try {
			await logout();
			router.push("/");
			toast.success("Logged out successfully");
		} catch (error) {
			console.error("Error logging out:", error);
			toast.error("Failed to logout");
		}
	};

	const toggleVisibility = async (
		sectionName: string,
		itemId: string,
		currentVisibility: boolean
	) => {
		try {
			await updateSectionItem(sectionName, itemId, {
				visible: !currentVisibility,
			});
			toast.success(
				`Item ${!currentVisibility ? "shown" : "hidden"} successfully`
			);
			loadPortfolioData();
		} catch (error) {
			console.error("Error toggling visibility:", error);
			toast.error("Failed to update visibility");
		}
	};

	const deleteItem = async (sectionName: string, itemId: string) => {
		if (!confirm("Are you sure you want to delete this item?")) return;

		try {
			await deleteSectionItem(sectionName, itemId);
			toast.success("Item deleted successfully");
			loadPortfolioData();
		} catch (error) {
			console.error("Error deleting item:", error);
			toast.error("Failed to delete item");
		}
	};

	const handleAddItem = (sectionName: string) => {
		setEditingSectionName(sectionName);
		setIsNewItem(true);
		setEditingItem({
			id: "",
			title: "",
			description: "",
			institution: "",
			company: "",
			role: "",
			startDate: "",
			endDate: "",
			location: "",
			technologies: [],
			skills: [],
			link: "",
			imageUrl: "",
			visible: true,
			order: 0,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
		} as PortfolioItem);
	};

	const handleEditItem = (item: PortfolioItem, sectionName: string) => {
		setEditingSectionName(sectionName);
		setIsNewItem(false);
		setEditingItem({ ...item });
	};

	const handleSaveItem = async () => {
		if (!editingItem || !editingSectionName) return;

		try {
			// Determine order (max order + 1 for new items)
			let order = editingItem.order || 0;
			if (isNewItem) {
				const items =
					(portfolioData?.[
						editingSectionName as keyof PortfolioData
					] as PortfolioItem[]) || [];
				order =
					items.length > 0
						? Math.max(...items.map((i) => i.order || 0)) + 1
						: 1;
			}

			const itemData: Omit<PortfolioItem, "id" | "createdAt" | "updatedAt"> = {
				title: editingItem.title || "",
				description: editingItem.description || "",
				institution: editingItem.institution || "",
				company: editingItem.company || "",
				role: editingItem.role || "",
				startDate: editingItem.startDate || "",
				endDate: editingItem.endDate || "",
				location: editingItem.location || "",
				technologies: editingItem.technologies || [],
				skills: editingItem.skills || [],
				link: editingItem.link || "",
				imageUrl: editingItem.imageUrl || "",
				visible: editingItem.visible !== undefined ? editingItem.visible : true,
				order,
			};

			if (isNewItem) {
				await addSectionItem(editingSectionName, itemData);
				toast.success("Item added successfully");
			} else {
				await updateSectionItem(editingSectionName, editingItem.id, itemData);
				toast.success("Item updated successfully");
			}

			setEditingItem(null);
			setEditingSectionName(null);
			setIsNewItem(false);
			loadPortfolioData();
		} catch (error) {
			console.error("Error saving item:", error);
			toast.error("Failed to save item");
		}
	};

	const handleSaveObjective = async (content: string) => {
		try {
			await updateObjective(content);
			toast.success("Objective updated successfully");
			setEditingSection(null);
			loadPortfolioData();
		} catch (error) {
			console.error("Error updating objective:", error);
			toast.error("Failed to update objective");
		}
	};

	const handleSaveSkills = async (skills: string[]) => {
		try {
			await updateSkills(skills);
			toast.success("Skills updated successfully");
			setEditingSection(null);
			loadPortfolioData();
		} catch (error) {
			console.error("Error updating skills:", error);
			toast.error("Failed to update skills");
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-gray-600">Loading dashboard...</p>
				</div>
			</div>
		);
	}

	if (!portfolioData) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<p className="text-gray-600">Failed to load portfolio data</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Toaster position="top-right" />

			{/* Header */}
			<header className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<h1 className="text-xl font-semibold text-gray-900">
							Admin Dashboard
						</h1>
						<button
							onClick={handleLogout}
							className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							<LogOut className="w-4 h-4" />
							Logout
						</button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				<div className="space-y-8">
					{/* Objective Section */}
					<SectionCard
						title="Objective"
						description="Edit your personal objective statement"
						onEdit={() => setEditingSection("objective")}
					>
						{editingSection === "objective" ? (
							<ObjectiveEditor
								content={portfolioData.objective}
								onSave={handleSaveObjective}
								onCancel={() => setEditingSection(null)}
							/>
						) : (
							<p className="text-gray-700">{portfolioData.objective}</p>
						)}
					</SectionCard>

					{/* Education Section */}
					<SectionCard
						title="Education"
						description="Manage your educational background"
						onAdd={() => handleAddItem("education")}
					>
						<ItemsList
							items={portfolioData.education}
							sectionName="education"
							onToggleVisibility={toggleVisibility}
							onDelete={deleteItem}
							onEdit={(item) => handleEditItem(item, "education")}
						/>
					</SectionCard>

					{/* Experience Section */}
					<SectionCard
						title="Experience"
						description="Manage your work experience"
						onAdd={() => handleAddItem("experiences")}
					>
						<ItemsList
							items={portfolioData.experiences}
							sectionName="experiences"
							onToggleVisibility={toggleVisibility}
							onDelete={deleteItem}
							onEdit={(item) => handleEditItem(item, "experiences")}
						/>
					</SectionCard>

					{/* Projects Section */}
					<SectionCard
						title="Projects"
						description="Manage your portfolio projects"
						onAdd={() => handleAddItem("projects")}
					>
						<ItemsList
							items={portfolioData.projects}
							sectionName="projects"
							onToggleVisibility={toggleVisibility}
							onDelete={deleteItem}
							onEdit={(item) => handleEditItem(item, "projects")}
						/>
					</SectionCard>

					{/* Publications Section */}
					<SectionCard
						title="Publications"
						description="Manage your publications and articles"
						onAdd={() => handleAddItem("publications")}
					>
						<ItemsList
							items={portfolioData.publications}
							sectionName="publications"
							onToggleVisibility={toggleVisibility}
							onDelete={deleteItem}
							onEdit={(item) => handleEditItem(item, "publications")}
						/>
					</SectionCard>

					{/* Skills Section */}
					<SectionCard
						title="Skills"
						description="Manage your technical skills"
						onEdit={() => setEditingSection("skills")}
					>
						{editingSection === "skills" ? (
							<SkillsEditor
								skills={portfolioData.skills}
								onSave={handleSaveSkills}
								onCancel={() => setEditingSection(null)}
							/>
						) : (
							<div className="flex flex-wrap gap-2">
								{portfolioData.skills.map((skill, index) => (
									<span
										key={index}
										className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
									>
										{skill}
									</span>
								))}
							</div>
						)}
					</SectionCard>
				</div>
			</main>

			{/* Edit Item Modal */}
			{editingItem && editingSectionName && (
				<ItemEditor
					item={editingItem}
					sectionName={editingSectionName}
					isNew={isNewItem}
					onSave={handleSaveItem}
					onCancel={() => {
						setEditingItem(null);
						setEditingSectionName(null);
						setIsNewItem(false);
					}}
					onChange={(updates) => setEditingItem({ ...editingItem, ...updates })}
				/>
			)}
		</div>
	);
}

// Section Card Component
function SectionCard({
	title,
	description,
	onEdit,
	onAdd,
	children,
}: {
	title: string;
	description: string;
	onEdit?: () => void;
	onAdd?: () => void;
	children: React.ReactNode;
}) {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200">
			<div className="px-6 py-4 border-b border-gray-200">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-lg font-medium text-gray-900">{title}</h3>
						<p className="text-sm text-gray-500">{description}</p>
					</div>
					<div className="flex items-center gap-2">
						{onAdd && (
							<button
								onClick={onAdd}
								className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								<Plus className="w-4 h-4" />
								Add
							</button>
						)}
						{onEdit && (
							<button
								onClick={onEdit}
								className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								<Edit className="w-4 h-4" />
								Edit
							</button>
						)}
					</div>
				</div>
			</div>
			<div className="px-6 py-4">{children}</div>
		</div>
	);
}

// Items List Component
function ItemsList({
	items,
	sectionName,
	onToggleVisibility,
	onDelete,
	onEdit,
}: {
	items: PortfolioItem[];
	sectionName: string;
	onToggleVisibility: (
		sectionName: string,
		itemId: string,
		visible: boolean
	) => void;
	onDelete: (sectionName: string, itemId: string) => void;
	onEdit: (item: PortfolioItem) => void;
}) {
	if (items.length === 0) {
		return <p className="text-gray-500 text-sm">No items added yet.</p>;
	}

	return (
		<div className="space-y-4">
			{items.map((item) => (
				<div
					key={item.id}
					className={`flex items-center justify-between p-4 border rounded-lg ${
						item.visible
							? "border-gray-200 bg-white"
							: "border-red-300 bg-red-50"
					}`}
				>
					<div className="flex-1">
						<h4
							className={`font-medium ${
								item.visible ? "text-gray-900" : "text-red-700"
							}`}
						>
							{item.title || item.role || item.company || item.institution}
						</h4>
						{item.description && (
							<p
								className={`text-sm mt-1 ${
									item.visible ? "text-gray-500" : "text-red-600"
								}`}
							>
								{item.description}
							</p>
						)}
						<div className="flex items-center gap-2 mt-1">
							{item.visible ? (
								<span className="inline-flex items-center gap-1 text-green-600 text-xs">
									<Eye className="w-3 h-3" />
									Visible
								</span>
							) : (
								<span className="inline-flex items-center gap-1 text-red-600 text-xs font-medium">
									<EyeOff className="w-3 h-3" />
									Hidden (Not visible to public)
								</span>
							)}
						</div>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={() =>
								onToggleVisibility(sectionName, item.id, item.visible)
							}
							className={`p-2 rounded-md text-sm font-medium ${
								item.visible
									? "text-green-600 hover:bg-green-50"
									: "text-red-600 hover:bg-red-100"
							}`}
							title={item.visible ? "Hide from public" : "Show to public"}
						>
							{item.visible ? (
								<Eye className="w-4 h-4" />
							) : (
								<EyeOff className="w-4 h-4" />
							)}
						</button>
						<button
							onClick={() => onEdit(item)}
							className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
							title="Edit item"
						>
							<Edit className="w-4 h-4" />
						</button>
						<button
							onClick={() => onDelete(sectionName, item.id)}
							className="p-2 text-red-600 hover:bg-red-50 rounded-md"
							title="Delete item"
						>
							<Trash2 className="w-4 h-4" />
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

// Item Editor Modal
function ItemEditor({
	item,
	sectionName,
	isNew,
	onSave,
	onCancel,
	onChange,
}: {
	item: PortfolioItem;
	sectionName: string;
	isNew: boolean;
	onSave: () => void;
	onCancel: () => void;
	onChange: (updates: Partial<PortfolioItem>) => void;
}) {
	const isEducation = sectionName === "education";
	const isExperience = sectionName === "experiences";
	const isProject = sectionName === "projects";
	const isPublication = sectionName === "publications";

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
					<h2 className="text-xl font-semibold text-gray-900">
						{isNew ? "Add New" : "Edit"}{" "}
						{sectionName === "education"
							? "Education"
							: sectionName === "experiences"
							? "Experience"
							: sectionName === "projects"
							? "Project"
							: "Publication"}
					</h2>
					<button
						onClick={onCancel}
						className="text-gray-400 hover:text-gray-600"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<div className="px-6 py-4 space-y-4">
					{/* Title */}
					{(isEducation || isProject || isPublication) && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Title *
							</label>
							<input
								type="text"
								value={item.title || ""}
								onChange={(e) => onChange({ title: e.target.value })}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-900 text-gray-900"
								placeholder="e.g., Bachelor of Science in Computer Science"
							/>
						</div>
					)}

					{/* Role (for experiences) */}
					{isExperience && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Role/Position *
							</label>
							<input
								type="text"
								value={item.role || ""}
								onChange={(e) => onChange({ role: e.target.value })}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-900 text-gray-900"
								placeholder="e.g., Senior Software Engineer"
							/>
						</div>
					)}

					{/* Institution (for education) */}
					{isEducation && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Institution *
							</label>
							<input
								type="text"
								value={item.institution || ""}
								onChange={(e) => onChange({ institution: e.target.value })}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-900 text-gray-900"
								placeholder="e.g., University of Technology"
							/>
						</div>
					)}

					{/* Company (for experiences) */}
					{isExperience && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Company *
							</label>
							<input
								type="text"
								value={item.company || ""}
								onChange={(e) => onChange({ company: e.target.value })}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-900 text-gray-900"
								placeholder="e.g., Tech Innovations Inc."
							/>
						</div>
					)}

					{/* Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Description
						</label>
						<textarea
							value={item.description || ""}
							onChange={(e) => onChange({ description: e.target.value })}
							rows={4}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-900 text-gray-900"
							placeholder="Enter a description..."
						/>
					</div>

					{/* Location */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Location
						</label>
						<input
							type="text"
							value={item.location || ""}
							onChange={(e) => onChange({ location: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-900 text-gray-900"
							placeholder="e.g., San Francisco, CA"
						/>
					</div>

					{/* Start Date */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Start Date
						</label>
						<input
							type="date"
							value={item.startDate || ""}
							onChange={(e) => onChange({ startDate: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
						/>
					</div>

					{/* End Date */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							End Date (leave empty for current/ongoing)
						</label>
						<input
							type="date"
							value={item.endDate || ""}
							onChange={(e) =>
								onChange({ endDate: e.target.value || undefined })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
						/>
					</div>

					{/* Link */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Website Link (optional)
						</label>
						<input
							type="url"
							value={item.link || ""}
							onChange={(e) => onChange({ link: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-900 text-gray-900"
							placeholder="https://example.com"
						/>
					</div>

					{/* Image URL */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Image URL or Local Path (optional)
						</label>
						<input
							type="text"
							value={item.imageUrl || ""}
							onChange={(e) => onChange({ imageUrl: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-900 text-gray-900"
							placeholder="https://example.com/image.jpg or /Kracked_logo.png"
						/>
						<p className="mt-1 text-xs text-gray-500">
							Add an image URL (https://...) or local path from public folder (e.g., /Kracked_logo.png or portfolio-domainName/public/Kracked_logo.png)
						</p>
					</div>

					{/* Technologies (for experiences and projects) */}
					{(isExperience || isProject) && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Technologies (comma-separated)
							</label>
							<input
								type="text"
								value={item.technologies?.join(", ") || ""}
								onChange={(e) =>
									onChange({
										technologies: e.target.value
											.split(",")
											.map((t) => t.trim())
											.filter((t) => t),
									})
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-900 text-gray-900"
								placeholder="e.g., React, Node.js, TypeScript"
							/>
						</div>
					)}

					{/* Visibility */}
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="visible"
							checked={item.visible !== false}
							onChange={(e) => onChange({ visible: e.target.checked })}
							className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
						/>
						<label
							htmlFor="visible"
							className="text-sm font-medium text-gray-700"
						>
							Visible to public
						</label>
					</div>
				</div>

				<div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
					<button
						onClick={onCancel}
						className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
					>
						Cancel
					</button>
					<button
						onClick={onSave}
						className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
					>
						<Save className="w-4 h-4" />
						{isNew ? "Add" : "Save"}
					</button>
				</div>
			</div>
		</div>
	);
}

// Objective Editor
function ObjectiveEditor({
	content,
	onSave,
	onCancel,
}: {
	content: string;
	onSave: (content: string) => void;
	onCancel: () => void;
}) {
	const [value, setValue] = useState(content);

	return (
		<div className="space-y-4">
			<textarea
				value={value}
				onChange={(e) => setValue(e.target.value)}
				rows={6}
				className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-900 text-gray-900"
				placeholder="Enter your objective statement..."
			/>
			<div className="flex items-center gap-3">
				<button
					onClick={() => onSave(value)}
					className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
				>
					<Save className="w-4 h-4" />
					Save
				</button>
				<button
					onClick={onCancel}
					className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
				>
					Cancel
				</button>
			</div>
		</div>
	);
}

// Skills Editor
function SkillsEditor({
	skills,
	onSave,
	onCancel,
}: {
	skills: string[];
	onSave: (skills: string[]) => void;
	onCancel: () => void;
}) {
	const [value, setValue] = useState(skills.join(", "));

	return (
		<div className="space-y-4">
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-900 text-gray-900"
				placeholder="e.g., JavaScript, React, Node.js, Python"
			/>
			<p className="text-sm text-gray-500">Enter skills separated by commas</p>
			<div className="flex items-center gap-3">
				<button
					onClick={() =>
						onSave(
							value
								.split(",")
								.map((s) => s.trim())
								.filter((s) => s)
						)
					}
					className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
				>
					<Save className="w-4 h-4" />
					Save
				</button>
				<button
					onClick={onCancel}
					className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
				>
					Cancel
				</button>
			</div>
		</div>
	);
}
