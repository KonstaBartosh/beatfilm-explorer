export const URL_MOVIES_REQUEST: string = 'https://api.nomoreparties.co/beatfilm-movies';
export const URL_MOVIE_SERVER: string = 'https://api.nomoreparties.co';
export const BASE_URL: string = 'https://api.moviexplorer.nomoreparties.co';
export const GITHUB_URL: string = 'https://github.com/KonstaBartosh';
export const BEAT_FILM_URL:string = 'https://beatfilmfestival.ru/';

export const JSON_HEADERS = {
	'Content-Type': 'application/json',
	'Accept': 'application/json'
}

export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
}

export const SUCCES_REGISTRATION_MESSAGE: string = 'Вы успешно зарегистрировались!';
export const INVALID_EMAIL_MESSAGE: string = `Адрес электронной почты должен содержать символ ' @ ' и минимум 2 символа для домена`;
export const MOVIES_NOT_FOUND_MESSAGE: string = 'Ничего не найдено';
export const MOVIES_SERVER_ERR_MESSAGE: string = `Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`;
export const FOOTER_TITLE: string = 'Beat Film Festival — международный фестиваль документального кино о новой культуре';
export const SIGN_IN_MESSAGE: string = 'Войдите в личный кабинет чтобы добавлять фильмы в избранное';

export const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
export const SHORT_MOVIE_LENGTH: number = 40;
export const AMMOUNT_OF_CARDS: number = 16;

export const PATH = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  SAVED_MOVIES: '/saved-movies'
}

export const SCREEN_WIDTH = {
  LARGE: 1280,
  TABLET: 989,
  TABLET_SMALL: 768,
  MOBILE: 480,
};

export const ADD_MORE_CARDS= {
  FOUR: 4,
  THREE: 3,
  TWO: 2,
};

export const CARDS_AMMOUNT = {
  LARGE: 16,
  MEDIUM: 12,
  SMALL: 8,
  X_SMALL: 5,
};

