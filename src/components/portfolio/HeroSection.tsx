'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
	return (
		<section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
			</div>

			<div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<motion.h1
						className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						Aakash Gnanakumar
					</motion.h1>
				</motion.div>

				<motion.p
					className="text-xl md:text-3xl text-gray-700 mb-6 font-medium"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					Full Stack Developer (SWE & AI)
				</motion.p>

				<motion.div
					className="flex items-center justify-center gap-6 mb-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
				>
					<motion.a
						href="https://www.linkedin.com/in/aakgna/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-700 hover:text-blue-600 transition-all duration-300 p-3 rounded-full hover:bg-white/50 backdrop-blur-sm"
						whileHover={{ scale: 1.1, rotate: 5 }}
						whileTap={{ scale: 0.95 }}
						aria-label="LinkedIn"
					>
						<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
						</svg>
					</motion.a>
					<motion.a
						href="mailto:aakashappiah@gmail.com"
						className="text-gray-700 hover:text-blue-600 transition-all duration-300 p-3 rounded-full hover:bg-white/50 backdrop-blur-sm"
						whileHover={{ scale: 1.1, rotate: -5 }}
						whileTap={{ scale: 0.95 }}
						aria-label="Email"
					>
						<svg
							className="w-7 h-7"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</motion.a>
				</motion.div>

				<motion.div
					className="w-32 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mx-auto rounded-full"
					initial={{ width: 0 }}
					animate={{ width: 128 }}
					transition={{ duration: 1, delay: 0.8 }}
				/>
			</div>

			{/* Scroll indicator */}
			<motion.div
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.2, duration: 0.8 }}
			>
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 1.5, repeat: Infinity }}
					className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
				>
					<motion.div
						animate={{ y: [0, 12, 0] }}
						transition={{ duration: 1.5, repeat: Infinity }}
						className="w-1 h-3 bg-gray-400 rounded-full mt-2"
					/>
				</motion.div>
			</motion.div>
		</section>
	);
}

