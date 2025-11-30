"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navigationItems = [
	{ name: "About", href: "#objective" },
	{ name: "Education", href: "#education" },
	{ name: "Experience", href: "#experiences" },
	{ name: "Projects", href: "#projects" },
	{ name: "Publications", href: "#publications" },
	{ name: "Skills", href: "#skills" },
	{ name: "Contact", href: "#contact" },
];

export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (href: string) => {
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
		setIsMenuOpen(false);
	};

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
			className={`fixed top-0 w-full z-50 transition-all duration-300 ${
				isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo/Name */}
					<motion.div
						className="shrink-0"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<a
							href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
							target="_blank"
							rel="noopener noreferrer"
							className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all"
						>
							Click for a Surprise!
						</a>
					</motion.div>

					{/* Desktop Navigation */}
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-1">
							{navigationItems.map((item, index) => (
								<motion.button
									key={item.name}
									onClick={() => scrollToSection(item.href)}
									className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative group"
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									whileHover={{ y: -2 }}
								>
									{item.name}
									<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
								</motion.button>
							))}

							{/* Admin Link */}
							<motion.div
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7 }}
							>
								<Link
									href="/admin/login"
									className="text-gray-400 hover:text-gray-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 hover:bg-gray-100"
								>
									<Settings className="w-4 h-4" />
									Admin
								</Link>
							</motion.div>
						</div>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<motion.button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
							whileTap={{ scale: 0.95 }}
						>
							{isMenuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</motion.button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-hidden"
					>
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							{navigationItems.map((item, index) => (
								<motion.button
									key={item.name}
									onClick={() => scrollToSection(item.href)}
									className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-gray-50"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.05 }}
								>
									{item.name}
								</motion.button>
							))}

							{/* Admin Link for Mobile */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: navigationItems.length * 0.05 }}
							>
								<Link
									href="/admin/login"
									className="text-gray-400 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 hover:bg-gray-50"
								>
									<Settings className="w-4 h-4" />
									Admin
								</Link>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
}
