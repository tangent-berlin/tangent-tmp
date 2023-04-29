import { notFound } from "next/navigation";
import { allProjects } from "@contentlayer/generated";
import { Mdx } from "@components/mdx";
import { Header } from "./header";
import navLinks from "@content/navLinks.json"
import "@styles/post.css";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allProjects
		.filter((project) => project.published)
		.map((project) => ({
			slug: project.slug,
		}));
}

export default async function ProjectPage({ params }: Props) {
	const slug = params?.slug;
	const project = allProjects.find((project) => project.slug === slug);

	if (!project) {
		notFound();
	}

	return (
		<div className="bg-zinc-50 min-h-screen">
			<Header project={project} navLinks={navLinks}/>

			<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
				<Mdx code={project.body.code} />
			</article>
		</div>
	);
}
