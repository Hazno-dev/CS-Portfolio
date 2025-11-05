import { type CollectionEntry, getCollection } from 'astro:content';
import { asProject } from '@/content.extensions.ts';

const allMedia = await getCollection('media');
const mediaMap = new Map<string, CollectionEntry<'media'>>();
allMedia.forEach((media) => mediaMap.set(media.id, media));

const foundProjects = await getCollection('project', ({ data }) => {
	return data.meta.visible;
});

function sortByDate(a: Date | null | undefined, b: Date | null | undefined) {
	if (!a) {
		if (!b) {
			return 0;
		}

		return -1;
	}

	if (!b) {
		return 1;
	}

	return a > b ? -1 : a < b ? 1 : 0;
}

const priorityTools = ['Unity', 'UnrealEngine', 'Radiant'];

function sortTools(a: string, b: string) {
	if (priorityTools.includes(a)) {
		if (priorityTools.includes(b)) {
			return -a.localeCompare(b);
		}

		return -1;
	}

	if (priorityTools.includes(b)) {
		return 1;
	}

	return -a.localeCompare(b);
}

foundProjects.sort((a, b) => sortByDate(a.data.dateEnd, b.data.dateEnd));

foundProjects.forEach((project) => {
	project.data.projectInfo.languages?.sort((a, b) => a.localeCompare(b));
	project.data.projectInfo.tools.sort((a, b) => sortTools(a, b));
	if (!mediaMap.has(project.id)) {
		throw new Error('Media not found for project ' + project.id);
	}
});

export const allProjects = foundProjects.map((project) => asProject(project, mediaMap.get(project.id)!));
export const projects = new Map<string, Project>();
allProjects.forEach((project) => projects.set(project.id, project));

// @ts-ignore
export const professionalProjects = allProjects.filter((project) => project.data.meta.professional);
// @ts-ignore
export const personalProjects = allProjects.filter(
	(project) => !project.data.meta.professional && project.data.meta.type === 'personal_highlight'
);
// @ts-ignore
export const personalCardProjects = allProjects.filter(
	(project) => !project.data.meta.professional && project.data.meta.type === 'personal_card'
);
//
// projects.forEach((project) => console.log(project.data.meta.type));
// professionalProjects.forEach((project) => console.log(project.data.meta.type));
