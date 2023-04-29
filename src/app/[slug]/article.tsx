"use client";
import type { Page } from "@/.contentlayer/generated";
import Link from "next/link";
import { Mdx } from "@components/mdx";
import "@styles/page.css";

type Props = {
	page: Page;
};

export const Article: React.FC<Props> = ({ page }) => {
	return (
		<Link href={`/${page.slug}`}>
			<article className="p-4 md:p-8">
				<div className="flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{page.date ? (
							<time dateTime={new Date(page.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(page.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
				</div>
			<Mdx code={page.body.code} />
			
			</article>
		</Link>
	);
};
