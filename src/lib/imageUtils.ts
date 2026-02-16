/**
 * Normalizes image paths to handle both URLs and local public folder paths
 * @param imagePath - Can be a full URL, local path like "portfolio-domainName/public/image.png", or just "image.png"
 * @returns Normalized path for Next.js Image component
 */
export function normalizeImagePath(imagePath: string | undefined): string {
	if (!imagePath) return "";
	
	// If it's already a full URL (http:// or https://), return as is
	if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
		return imagePath;
	}
	
	// If it contains "public/" or looks like a local path, extract the filename
	// Handle paths like "portfolio-domainName/public/image.png" or "public/image.png"
	const publicMatch = imagePath.match(/(?:.*\/)?public\/(.+)$/);
	if (publicMatch) {
		// Extract filename and prepend with / for Next.js public folder
		return `/${publicMatch[1]}`;
	}
	
	// If it's just a filename or path starting with /, ensure it starts with /
	if (imagePath.startsWith("/")) {
		return imagePath;
	}
	
	// Otherwise, treat as local file in public folder
	return `/${imagePath}`;
}

/**
 * Gets the top-left pixel color from an image
 * @param imageSrc - The image source URL
 * @returns Promise that resolves to an RGB color string (e.g., "rgb(255, 255, 255)") or null if failed
 */
export function getTopLeftPixelColor(imageSrc: string): Promise<string | null> {
	return new Promise((resolve) => {
		const img = new Image();
		img.crossOrigin = "anonymous"; // Allow CORS for external images
		
		img.onload = () => {
			try {
				const canvas = document.createElement("canvas");
				canvas.width = 1;
				canvas.height = 1;
				const ctx = canvas.getContext("2d");
				
				if (!ctx) {
					resolve(null);
					return;
				}
				
				// Draw only the top-left pixel
				ctx.drawImage(img, 0, 0, 1, 1, 0, 0, 1, 1);
				
				// Get the pixel data
				const imageData = ctx.getImageData(0, 0, 1, 1);
				const [r, g, b] = imageData.data;
				
				// Return as RGB string
				resolve(`rgb(${r}, ${g}, ${b})`);
			} catch (error) {
				console.error("Error getting pixel color:", error);
				resolve(null);
			}
		};
		
		img.onerror = () => {
			resolve(null);
		};
		
		img.src = imageSrc;
	});
}
