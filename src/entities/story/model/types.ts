import type { Common } from '@shared/lib/types';

export interface Story extends Common {
	previewImageUrl: string;
	items: StoryItem[];
}

export interface StoryItem extends Common {
	sourceUrl: string;
	storyId: number;
}
