export class Band {
    constructor(
        private id: string,
        private name: string,
        private music_genre: string,
        private responsible: string
    ){};

    getId = () => {
        return this.id;
    };

    getName = () => {
        return this.name;
    };

    getMusicGenre = () => {
        return this.music_genre;
    };

    getResponsible = () => {
        return this.responsible;
    };
};