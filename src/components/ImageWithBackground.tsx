"use client";

import { useState, useEffect } from "react";
import { normalizeImagePath, getTopLeftPixelColor } from "@/lib/imageUtils";

interface ImageWithBackgroundProps {
	src: string;
	alt: string;
	className?: string;
	containerClassName?: string;
}

export default function ImageWithBackground({
	src,
	alt,
	className = "",
	containerClassName = "",
}: ImageWithBackgroundProps) {
	const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadImageColor = async () => {
			const normalizedSrc = normalizeImagePath(src);
			const color = await getTopLeftPixelColor(normalizedSrc);
			if (color) {
				setBackgroundColor(color);
			}
			setIsLoading(false);
		};

		if (src) {
			loadImageColor();
		}
	}, [src]);

	return (
		<div
			className={containerClassName}
			style={{
				backgroundColor: backgroundColor || "rgb(243, 244, 246)", // Default gray-100 if color extraction fails
			}}
		>
			<img
				src={normalizeImagePath(src)}
				alt={alt}
				className={className}
				loading="lazy"
			/>
		</div>
	);
}

