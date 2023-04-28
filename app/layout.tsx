import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
	title: {
		default: "Tangent",
		template: "%s | Tangent",
	},
	description: "Bootstrapping LLM services and solutions from ideation to validation",
	openGraph: {
		title: "Tangent",
		description:
			"Bootstrapping LLM services and solutions from ideation to validation",
		url: "https://tangent.center",
		siteName: "Tangent",
		images: [
			{
				url: "https://chronark.com/tangent.png",
				width: 1024,
				height: 1024,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Tangent",
		card: "summary_large_image",
	},
	icons: {
		icon: [
			{
				url: "/favicon.ico",
				sizes: "48x48",
				type: "image/x-icon"
			},
			{
				url: "/favicon-32x32.png",
				sizes: "32x32",
				type: 'image/png'
			},
			{
				url: "/favicon-16x16.png",
				sizes: "16x16",
				type: 'image/png'
			},
		],
		shortcut: ["/tangent.png"],
		apple: [
			{ url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
			{ url: '/android-chrome-180x180.png', sizes: '180x180', type: 'image/png' },
		],
	}
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/BebasNeue-Regular.ttf",
	variable: "--font-bebas-neue",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				<Analytics />
				{children}
			</body>
		</html>
	);
}
