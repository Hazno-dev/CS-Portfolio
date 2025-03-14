import { getCollection } from 'astro:content';

const allProjects = await getCollection('project', ({ data }) => {
	return data.visible;
});

function sortByDate(a: Date | undefined, b: Date | undefined) {
	if (!a) {
		if (!b) {
			return 0;
		}

		return -1;
	}

	if (!b) {
		return 1;
	}

	return a > b ? 1 : a < b ? -1 : 0;
}

allProjects.sort((a, b) => sortByDate(a.data.dateEnd, b.data.dateEnd));

export const projects = allProjects;
