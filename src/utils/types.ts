export interface MovieType {
	_id: string | null
  owner: string | null
	nameEN: string
	nameRU: string
	duration: number
	image: { url: string; }
  country: string
  director: string
  year: string
  description: string
  trailerLink: string
  movieId: number
}