import { DeepMap, FieldError, FieldValues, UseFormRegister } from "react-hook-form"

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

export interface UserType {
  name?: string;
  password?: string;
  email: string;
}

export interface Inputs {
  title: string;
  register: UseFormRegister<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  autoComplete?: string;
}