"use client";

import { motion } from "framer-motion";
import { PortfolioItem } from "@/lib/firestore";
import { normalizeImagePath } from "@/lib/imageUtils";
import { GraduationCap, MapPin, Calendar, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCard from "@/components/AnimatedCard";
import ImageWithBackground from "@/components/ImageWithBackground";

interface EducationSectionProps {
	education: PortfolioItem[];
}

export default function EducationSection({ education }: EducationSectionProps) {
	if (education.length === 0) return null;

	return (
		<section id="education" className="py-32 relative">
			<AnimatedSection>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<motion.div
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4"
							whileHover={{ scale: 1.05 }}
						>
							<GraduationCap className="w-4 h-4 text-teal-400" />
							<span className="text-sm text-gray-300">Academic Journey</span>
						</motion.div>
						<h2 className="text-5xl md:text-6xl font-bold mb-6">
							<span className="gradient-text">Education</span>
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 mx-auto rounded-full"></div>
					</motion.div>

					<div className="space-y-8">
						{education.map((item, index) => (
							<AnimatedCard
								key={item.id}
								delay={index * 0.1}
								className="group"
							>
								<motion.div
									className="glass-strong rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
									whileHover={{ y: -5 }}
								>
									<div className="flex flex-col md:flex-row">
										{/* Image Section */}
										{item.imageUrl ? (
											<div className="md:w-1/3 relative overflow-hidden flex items-center justify-center p-6">
												<ImageWithBackground
													src={item.imageUrl}
													alt={item.institution || item.title || "Education"}
													className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
													containerClassName="w-full h-full flex items-center justify-center"
												/>
											</div>
										) : (
											<div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center relative overflow-hidden">
												<motion.div
													className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
													animate={{ rotate: [0, 360] }}
													transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
												/>
												<GraduationCap className="w-16 h-16 text-white opacity-80 relative z-10" />
											</div>
										)}

										{/* Content Section */}
										<div className="flex-1 p-6 md:p-8">
											<div className="flex items-start gap-4">
												{item.imageUrl ? (
													<div className="flex-shrink-0">
														<img
															src={normalizeImagePath(item.imageUrl)}
															alt={item.institution || item.title || "Education"}
															className="w-14 h-14 rounded-xl object-cover shadow-lg"
															loading="lazy"
														/>
													</div>
												) : (
													<div className="flex-shrink-0">
														<div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
															<GraduationCap className="w-7 h-7 text-white" />
														</div>
													</div>
												)}

												<div className="flex-grow">
													<div className="flex items-center gap-2 mb-2">
														<Sparkles className="w-5 h-5 text-teal-400" />
														<h3 className="text-2xl font-bold text-white">
															{item.title}
														</h3>
													</div>

													<div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
														<div className="flex items-center gap-2">
															<GraduationCap className="w-4 h-4 text-teal-400" />
															{item.link ? (
																<Link
																	href={item.link}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="hover:text-teal-400 transition-colors font-medium"
																>
																	{item.institution}
																</Link>
															) : (
																<span className="font-medium">
																	{item.institution}
																</span>
															)}
														</div>

														{item.location && (
															<div className="flex items-center gap-2">
																<MapPin className="w-4 h-4 text-teal-400" />
																<span>{item.location}</span>
															</div>
														)}

														{item.startDate && (
															<div className="flex items-center gap-2">
																<Calendar className="w-4 h-4 text-teal-400" />
																<span>
																	{new Date(item.startDate).getFullYear()} -{" "}
																	{item.endDate
																		? new Date(item.endDate).getFullYear()
																		: "Present"}
																</span>
															</div>
														)}
													</div>

													{item.description && (
														<p className="text-gray-300 leading-relaxed mb-4 whitespace-pre-line">
															{item.description.replace(/<br\s*\/?>/gi, "\n")}
														</p>
													)}

													{item.link && (
														<Link
															href={item.link}
															target="_blank"
															rel="noopener noreferrer"
															className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium group/link"
														>
															<ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
															Visit Institution Website
														</Link>
													)}
												</div>
											</div>
										</div>
									</div>
								</motion.div>
							</AnimatedCard>
						))}
					</div>
				</div>
			</AnimatedSection>
		</section>
	);
}
