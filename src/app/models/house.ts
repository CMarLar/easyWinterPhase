export class House {

    constructor(
        public house_name : string,
        public activeChar : number,// Miguel, esto estaba puesto como string, pero tiene que ser un number porque hace referencia aun character_id. Espero no haberte roto nada :(
        public holding_name : string,
        public familyCharacteristic : string,
        public shield : string,
        public economyLevels : string,
        public house_id : number = null){
            
        }
    
}
