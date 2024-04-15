export interface Product {
    _id: string;
    prodNumber: string;
    prodDescription: string;
    prodListPrice: number;
  }
  
  //Interfaces for managing the data / array
  export interface WithIndex extends Product {
    index: number,
    quantity: number,
  }