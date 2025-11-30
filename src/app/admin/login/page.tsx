"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle, onAuthStateChange } from "@/lib/auth";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLogin() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// Check if user is already authenticated
		const unsubscribe = onAuthStateChange((user) => {
			if (user) {
				router.push("/admin/dashboard");
			}
		});

		return () => unsubscribe();
	}, [router]);

	const handleGoogleSignIn = async () => {
		setIsLoading(true);

		try {
			await signInWithGoogle();
			toast.success("Login successful! Redirecting to dashboard...");
			router.push("/admin/dashboard");
		} catch (error: any) {
			console.error("Error signing in:", error);
			toast.error(error.message || "Failed to sign in. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
			<Toaster position="top-right" />

			{/* Back to Portfolio Link */}
			<Link
				href="/"
				className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
			>
				<ArrowLeft className="w-4 h-4" />
				Back to Portfolio
			</Link>

			<div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
						<Shield className="w-8 h-8 text-blue-600" />
					</div>
					<h1 className="text-2xl font-bold text-gray-900 mb-2">
						Admin Access
					</h1>
					<p className="text-gray-600">
						Sign in with your authorized Google account to access the admin panel
					</p>
				</div>

				{/* Google Sign In Button */}
				<button
					onClick={handleGoogleSignIn}
					disabled={isLoading}
					className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					{isLoading ? (
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
							Signing in...
						</div>
					) : (
						<>
							<svg
								className="w-5 h-5"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									fill="#4285F4"
								/>
								<path
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									fill="#34A853"
								/>
								<path
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									fill="#FBBC05"
								/>
								<path
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									fill="#EA4335"
								/>
							</svg>
							Sign in with Google
						</>
					)}
				</button>

				{/* Footer */}
				<div className="mt-8 text-center">
					<p className="text-sm text-gray-500">
						Only authorized email addresses can access the admin panel.
					</p>
				</div>
			</div>
		</div>
	);
}
