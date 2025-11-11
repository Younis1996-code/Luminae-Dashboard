
// export type categoryIdValues = "woman" | "ShoeAndBag" |"luxuryAndDesigner" | "homeTextile"
// | "clothes" | "partySupplies"  | "sportAndOutdoors"  | "cosmetics"  | "male"  | "shoesAndAccessories"
//   | "grooming"  | "sportswear"  | "motherChild" | "babyEssentials" | "childrenClothing" | "toysAndGames" | "maternity" 


interface Category{
  id: string;
  name: string;
  paren:null | string;
  cat_image?: string;
}

export interface Product{
  productId:string;
  productName:string;
  mainCategoryId:string;
  subCategoryID:string;
  topic:string;
  categories:string;
  price:number;
  discount:number;
  finalPrice?:number; // price - discount
  reviewsCount:number;
  model:string;
  brand:string;
  style:string[] | string;
  availableColors:string[];
  size:string[]; // XL | SM | 3XL
  images:string[]; // 5 images
  availableQuatity:number; // EX: 150 pecies Available.
  soldQuantity:number; // sold 20 pecies
  shippingInsurance:number;
  productDetails:{
    descriptionText:string;
    descriptionList:Array<{prop:string;val:string}>; // EX: Fit | Regular fit
    composition:string;
    careInstructions:Array<{icon:string,text:string}>
  };
}

// shipping detials for the product, it's not related to the product
interface ShippingCompany{
  companyId:string;
  companyName:string
  companyLogo:string;
  backetInsurance:boolean;
  companyLink:string;
}

interface City{
  cityId:string;
  cityName:string;
  cityCountry:string;
}


interface ShippingRate{
  companyId:string;
  cityId:string;
  cost:number;
  currency:string;
  estimatedDays:string // ranger from x to y
}



// Reviews

interface ReviewObject{
  reviewId:string;
  userId:string;
  productId:string;
  reviewTitle:string;
  userName:string;
  starsCount:number; // 0 -> 5
  advantages:string[];
  disAdvantages:string;
  reviewText:string;
  imagesOfUser:string[] | string;
}



// additional types and type-related structuers:

export const mainCtegories : Array<{name:string,id:string}> = [

  {
    name:"Woman",
    id:'woman'
  },
  {
    name:'Male',
    id:'male'
  },
  {
    name:'Mother-child',
    id:'mother-child'
  },
  {
    name:'Home & funiture',
    id:'homeAndFurniture'
  },
  {
    name:"Super Market",
    id:'superMarket'
  },
  {
    name:'Cosmetics',
    id:"cosmetics"
  },
  {
    name:'shoe & bag',
    id:'shoeAndBag'
  },
  {
    name:'electronic',
    id:'electronic'
  },
  {
    name:"sport & outdoor",
    id:'sportAndOutdoor'
  },
  {
    name:'best seller',
    id:'bestSeller'
  }
] 


// Query Exmaples:
// 1-get all products where category is woman:
// db.collection("products").where('categories','array-contains','woman').get()

// description:
// the product may be under more than one category, so there is an array contains all the categories of the product.


// 2-get 'clothes' for woman:
// db.collection("products")
// .where('mainCategoryId', '==' , 'woman')
// .where('subCategoryID', '==' , 'clothes')
// .get()

// description:
// each product has the mainCategory and the subCategory properties, thoes props indicates where the product is,
// in what category. you can get the products of any category or sub-category by modifing the query.



// 3-get T-Shirts and Tops for woman:
// db.collection("products")
// .where('mainCategoryId','==','woman')
// .where('subCategoryID', '==' , 'clothes')
// .where('topic' == 'tshirtsAndTops')
// .get()

// ===OR===:get the clothes for woman and filter based on the topic prop.



// 4-get each category with it's subCategories and the topics inside the subCategories:

// db.collection("categories").get()

// description:
// you will get all the categories in one array, then you must filter them to get the top-level 
// category wich has ' parent:'' ' and the seconde level will have for example parent:'woman',
// the third level will have the parent:'clothes',
// so each category is a subCategory of it's parent, and the top-level will not have a parent.

// example code to get the categories:
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [mainCategories, setMainCategories] = useState<Category[]>([]);
//   const [subCategories, setSubCategories] = useState<Category[]>([]);
//   const [topics, setTopics] = useState<Category[]>([]);

//   useEffect(() => {
//     const categoriesRef = ref(db, "categories");

//     const unsubscribe = onValue(categoriesRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const allCategories: Category[] = Object.values(data);

//         // top-level categories
//         const main = allCategories.filter((cat) => cat.parent === "");
//         // second level (subCategories)
//         const subs = allCategories.filter(
//           (cat) =>
//             cat.parent !== "" &&
//             main.some((mainCat) => mainCat.id === cat.parent)
//         );
//         // third level (topics)
//         const third = allCategories.filter(
//           (cat) =>
//             cat.parent !== "" &&
//             subs.some((subCat) => subCat.id === cat.parent)
//         );

//         setCategories(allCategories);
//         setMainCategories(main);
//         setSubCategories(subs);
//         setTopics(third);
//       } else {
//         console.log("No categories found");
//       }
//     });

//     return () => unsubscribe();
//   }, []);



