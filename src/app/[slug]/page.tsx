import React from "react";
import { allPages } from "@contentlayer/generated";
import { Navigation } from "@components/nav";
import { notFound } from "next/navigation";
import { Card } from "@components/card";
import { Article } from "./article";

export const revalidate = 60;
export async function generateStaticParams(): Promise<Props["params"][]> {
	return allPages
		.filter((page) => page.published)
		.map((page) => ({
			slug: page.slug,
		}));
}

export default async function Page({ params }: Props) {
	const slug = params?.slug;
	const page = allPages.find((page) => page.slug === slug);

	if (!page) {
		notFound();
	}

	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h1 className="text-4xl space-x font-regular text-white sm:text-6xl font-display">
						{page.title}
					</h1>
					<p className="mt-4 text-zinc-400">
						{page.description}
					</p>
				</div>
				<div className="hidden w-full h-px md:block bg-zinc-800" />
				<Card key={page.slug}>
								<Article page={page} />
							</Card>
			</div>
		</div>
	);
}
