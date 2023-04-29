"use client";
import { ArrowLeft, Twitter, Linkedin, Globe } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
	project: {
		title: string;
		description: string;
		slug: string;
		url?: string;
		twitter?: string;
		linkedin?: string;
		wellfound?: string;
	};
};
export const Header: React.FC<Props> = ({ project, navLinks }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
		>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-white/10  border-zinc-200 lg:border-transparent"
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						{project.url && <Link target="_blank" href={project.url}>
							<Globe
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>}
						{project.twitter && <Link target="_blank" href={`https://twitter.com/${project.twitter}`}>
							<Twitter
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>}
						{project.linkedin && <Link target="_blank" href={`https://www.linkedin.com/company/${project.linkedin}`}>
							<Linkedin
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>}
						{project.wellfound && <Link target="_blank" href={`https://wellfound.com/company/${project.wellfound}`}>
							<span
								className={`w-6 h-6 border-solid border-2 rounded-md duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 border-zinc-400 hover:text-zinc-100 hover:border-zinc-100"
										: "text-zinc-600 border-zinc-600 hover:text-zinc-900 hover:border-zinc-900"
								} `}
							>w:</span>
						</Link>}
					</div>

					<Link
						href="/incubator"
						className={`duration-200 hover:font-medium ${
							isIntersecting
								? " text-zinc-400 hover:text-zinc-100"
								: "text-zinc-600 hover:text-zinc-900"
						} `}
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
			<div className="container mx-auto relative isolate overflow-hidden  py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
							{project.title}
						</h1>
						<p className="mt-6 text-lg leading-8 text-zinc-300">
							{project.description}
						</p>
					</div>

				</div>
			</div>
		</header>
	);
};
