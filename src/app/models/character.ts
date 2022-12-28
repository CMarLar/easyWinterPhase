export class Character {

    constructor(

        public character_id:number,
        public house_id:number,
        public year_id:number,
        public char_name:string,
        public age:number,
        public char_status:number,
        public isMarried:number,
        public marriageGlory:number,
        public courtesyMod:number,
        public role:string
        //cambio booleans a number para ver si funciona en la base de datos
    ){}
}
