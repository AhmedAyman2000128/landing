import type { HeadingHierarchy } from '@/types/index';
import type { MarkdownHeading } from 'astro';

// Create headings for table of contents
export function createHeadingHierarchy(headings: MarkdownHeading[]) {
    const topLevelHeadings: HeadingHierarchy[] = [];

    for (const heading of headings) {
        const h = {
            ...heading,
            subheadings: [],
        };

        if (h.depth >= 2) {
            topLevelHeadings.push(h);
        } else {
            const parent = topLevelHeadings[topLevelHeadings.length - 1];
            if (parent) {
                parent.subheadings.push(h);
            }
        }
    }

    return topLevelHeadings;
}
