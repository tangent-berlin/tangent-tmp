import Link from "next/link";
import React from "react";
import { allArticles } from "@contentlayer/generated";
import { Navigation } from "@components/nav";
import { Card } from "@components/card";
import { Article } from "./article";

export const revalidate = 60;
export default async function NewsPage() {

	const featured = allArticles.find(
		(article) => article.featured === "featured",
	)!;
	const top2 = allArticles.find((article) => article.featured === "top2")!;
	const top3 = allArticles.find((article) => article.featured === "top3")!;
	const sorted = allArticles
		.filter((p) => p.published)
		.filter(
			(article) =>
			featured && (article.slug !== featured.slug) &&
			top2 && (article.slug !== top2.slug) &&
			top3 &&	(article.slug !== top3.slug),
		)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
		);

	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h1 className="text-4xl space-x font-regular text-white sm:text-6xl font-display">
						News
					</h1>
					<p className="mt-4 text-zinc-400">
						Some of the articles are from work and some are on my own time.
					</p>
				</div>
				<div className="w-full h-px bg-zinc-800" />

				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
					{featured && <Card>
						<article className="relative h-full w-full p-4 md:p-8">
							<div className="flex justify-between gap-2 items-center">
								<div className="text-xs text-zinc-100">
									{featured.date ? (
										<time dateTime={new Date(featured.date).toISOString()}>
											{Intl.DateTimeFormat(undefined, {
												dateStyle: "medium",
											}).format(new Date(featured.date))}
										</time>
									) : (
										<span>SOON</span>
									)}
								</div>
							</div>

							<h2
								id="featured-post"
								className="mt-4 text-3xl font-bold  text-zinc-100 group-hover:text-white sm:text-4xl font-display"
							>
								{featured.title}
							</h2>
							<p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
								{featured.description}
							</p>
							<div className="absolute bottom-4 md:bottom-8">
								<Link
									className="text-zinc-200 hover:text-zinc-50 hidden lg:block"
									href={`/news/${featured.slug}`}
								>
									Read more <span aria-hidden="true">&rarr;</span>
								</Link>
							</div>
						</article>
					</Card>
}
					<div className="flex flex-col w-full gap-8  mx-auto border-t border-gray-900/10  lg:mx-0  lg:border-t-0 ">
						{[top2, top3].map((article) => (
							article && <Card key={article.slug}>
								<Article article={article} />
							</Card>
						))}
					</div>
				</div>
				<div className="hidden w-full h-px md:block bg-zinc-800" />

				<div className="grid  grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 0)
							.map((article) => (
								<Card key={article.slug}>
									<Article article={article} />
								</Card>
							))}
					</div>
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 1)
							.map((article) => (
								<Card key={article.slug}>
									<Article article={article} />
								</Card>
							))}
					</div>
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 2)
							.map((article) => (
								<Card key={article.slug}>
									<Article article={article} />
								</Card>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
