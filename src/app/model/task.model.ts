
export class Task {
    id: number;
    name: string;
    description: string;
    date: Date;
    categories: any[];
    status_id: number;
    created_at: Date;
    updated_at: Date;

    constructor(values: Object = {}) {
         Object.assign(this, values);
    }
    formattedTitle() {
      return this.name ?
        this.name[0].toUpperCase() + this.name.substr(1) : "";
    }
  }







