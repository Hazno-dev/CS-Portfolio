import type { RehypePlugin } from '@astrojs/markdown-remark';
import { visit } from 'unist-util-visit';

export const emHype: RehypePlugin = () => {
	return (tree) => {
		visit(tree, (node) => {
			if (node.type != 'text') {
				return;
			}

			node.value = node.value.replace(/ \u2014/g, '\u00A0\u2014');
		});
	};
};
