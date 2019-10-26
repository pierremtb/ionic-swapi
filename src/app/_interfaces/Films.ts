import { Film } from './Film';

export interface Films {
    count: number;
    next?: any;
    previous?: any;
    results: Film[];
}
