import { ReactNode } from "react";
import { DeepMap, FieldError, FieldValues, UseFormRegister } from "react-hook-form"

export interface ChildrenType {
  children: ReactNode;
}

export interface MovieType {
  id?: string | null;
	_id?: string;
  movieId?: number;
  owner?: string | null;
	nameEN: string;
	nameRU: string;
	duration: number;
	image: { url: string; };
  country: string;
  director: string;
  year: string;
  description: string;
  trailerLink: string;
}

export interface UserType {
  name?: string;
  password?: string;
  email?: string;
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

export interface LocalStorageDataType {
  IS_USER_LOGGED: boolean | null;
  ALL_MOVIES: MovieType[];
  SHORT_MOVIES: MovieType[]; 
  SEARCH_LIST: MovieType[]; 
  SEARCH_QUERY: string | '';
  IS_TOGGLED: boolean | null;
}