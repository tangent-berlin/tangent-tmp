import { notFound } from "next/navigation";
import { allArticles } from "@contentlayer/generated";
import { Mdx } from "@components/mdx";
import { Header } from "./header";
import "@styles/post.css";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allArticles
		.filter((article) => article.published)
		.map((article) => ({
			slug: article.slug,
		}));
}

export default async function PostPage({ params }: Props) {
	const slug = params?.slug;
	const article = allArticles.find((article) => article.slug === slug);

	if (!article) {
		notFound();
	}

	return (
		<div className="bg-zinc-50 min-h-screen">
			<Header article={article} />

			<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
				<Mdx code={article.body.code} />
			</article>
		</div>
	);
}
