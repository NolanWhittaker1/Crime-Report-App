export class nuisanceReport {
    id: string
    reporter: string
    phone: string
    longitude: number
    lattitude: number
    location: string
    picture: string
    time: Date
    processed: boolean
    
    constructor(id: string, reporter: string, phone: string, longitude: number, lattitude: number, location:string, picture: string, time: Date, processed: boolean) {
        if(id == '') {
        let temp = '';
        const Characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for(let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * Characters.length);
           temp += Characters.charAt(randomIndex)
        }
        this.id = temp;
        } else {
            this.id = id;
        }
        this.reporter = reporter;
        this.phone = phone; 
        this.longitude = longitude;
        this.lattitude = lattitude;
        this.location = location;
        this.picture = picture;
        this.time = time;
        this.processed = processed;
    }

    
}