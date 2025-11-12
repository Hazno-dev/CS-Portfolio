import type { RehypePlugin } from '@astrojs/markdown-remark';
import { visit } from 'unist-util-visit';
import type { Element } from 'hast';

export const liHype: RehypePlugin = () => {
	return (tree) => {
		visit(tree, (node) => {
			if (node.type != 'element') {
				return;
			}

			const element = node as Element;
			if (element.tagName != 'li') {
				return;
			}

			if (TryFindSplit(element)) {
				element.properties.class = `list-inside ml-0! ${element.properties.class ?? ''}`;
			}
		});
	};
};

function TryFindSplit(element: Element): boolean {
	if (element.children.length == 0) {
		return false;
	}

	if (element.children[0].type == 'element') {
		return TryFindSplit(element.children[0] as Element);
	}

	for (const child of element.children) {
		if (child.type != 'text') {
			if (child.type == 'element') {
				return TryFindSplit(child as Element);
			}

			continue;
		}

		if (!child.value.startsWith('|')) {
			continue;
		}

		//console.log(element);
		//console.log(firstChild);
		if (child.value.length == 1) {
			element.children.shift();
		} else {
			child.value = child.value.substring(1).trimStart();
		}

		return true;
	}

	return false;
}
