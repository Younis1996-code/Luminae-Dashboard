import { mainCtegories } from "../components/dbSchema";

interface Field{
  inputName:string;
  label:string;
  type:'text' | 'textArea' | 'number' | 'select' | 'multiSelect';
  options?:string[];
}

const mainCategoriesNames = mainCtegories.map((cat)=>cat.name);

export const addProductFormFields  : Field[] = [
  {
    inputName:'productName',
    label:'Product Name',
    type:'text',
  },
  {
    inputName:'mainCategoryId',
    label:'Main Category ID',
    type:'select',
    options:mainCategoriesNames,
  },
  {
    inputName:'subCategoryID',
    label : 'Sub Category ID',
    type:'select',
    //here the options are hardCoded, can be fetched then from firebase corresponding to the selected main category
    options:[
      'clothes', 'Shoe & Bag' ,'Bedroom','Grooming','Toys & Games',
    ]
  },
  {
    inputName:'topic',
    label:'Topic',
    type:'text'
  },
  {
    inputName:'price',
    label:'Price',
    type:'number'
  },
  {
    inputName:'discount',
    label:"Discount",
    type:'number'
  },
  {
    inputName:'model',
    label:"Model",
    type:'text'
  },
  {
    inputName:'brand',
    label:"Brand",
    type:'select',
    options:['Zara','Gouchi','BLABLA']
  },
  {
    inputName:'style',
    label:'Styles',
    type:'multiSelect',
    options:['Casual','Sport','...']
  },
  {
    inputName:'availableColors',
    label:'Available Colors',
    type:'multiSelect',
    options:[
      'red','black','blue','green','yellow','brown','pink','orange','purple','dark blue','...'
    ]
  },
  {
    inputName:'size',
    label:"Available Sizes",
    type:'multiSelect',
    options:[
      'XS','MD','Xl','2XL'
    ]
  },
  {
    inputName:'shippingInsurance',
    label:'Shipping Insurance Value',
    type:'number'
  },
  {
    inputName:'descriptionText',
    label:'Description Text For the product',
    type:'textArea'
  },
  {
    inputName:'composition',
    label:'Composition',
    type:'textArea'
  }
]