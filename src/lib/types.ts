export type Categories = 'Angular' | 'Other'

export type Post = {
	title: string
	slug: string
	description: string
	date: string
	categories: Categories[]
	published: boolean
	readingTime: {
		text: string
	}
}