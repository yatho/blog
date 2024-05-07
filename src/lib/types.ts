export type Categories = 'Angular' | 'Conference' | 'Other'

export type Post = {
	title: string
	slug: string
	description: string
	date: string
	categories: Categories[]
	published: boolean
	coverSrc?: string
	coverAlt?: string
	readingTime: {
		text: string
	}
}