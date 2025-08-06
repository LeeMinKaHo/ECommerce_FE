

export class CreateProductDTO {
 
   name!: string;
   description!: string;  
   quanlity!: number;
   price!: number;
   createBy!: string;
   categoryId! : string
   variants!: Variants[]
  
}
export class Variants {
   productId! : string
   sizeId!: string
   color! : string
   imgUrl! : string
   quantity! : number
}