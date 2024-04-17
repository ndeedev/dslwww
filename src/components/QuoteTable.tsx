"use client"

//import { Product, columns } from "./columns";
import { Reorder } from "framer-motion"
import { useState } from "react";
import axios from 'axios'
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

//commonly used functions
import { buildURL, generateRandomLong } from "@/lib/commonfunctions";

//types and interfaces
import { Product, WithIndex, GroupHeading } from "@/types/product";

type dataInput = WithIndex | GroupHeading

export default function QuoteTable() {
  //State variables
  const [data, setData] = useState<dataInput[]>([]); //set data to state variable
  const [productSearchValue, setProductSearchValue] = useState('')
  const [groupValue, setGroupValue] = useState('')
  const [discount, setDiscount] = useState('1'); //default value will be set to list
  const [conditionalFormat, setConditionalFormat] = useState(false); //this is used to conditionally format css for validation when product isn't found

  function updateProductsWithNewProperties(obj: Product[], currentLength: number): WithIndex[] {
    const randNum = generateRandomLong();
    return obj.map((ndata) => ({
      index: randNum,
      quantity: 1, //default quantity will be 1 and user will never be able to enter a quantity on Add
      ...ndata,
    }));
  }

  // EVENT HANDLERS
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductSearchValue(event.target.value);
  };

  const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupValue(event.target.value);    
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, randomIndex: number) => {
    const updatedQuantity = parseInt(event.target.value, 10); // Parse the input value to an integer
    setData((prevData) => {
      const newData = [...prevData]; // Create a shallow copy of the data array
      const targetObject = newData.find((item) => item.index === randomIndex) as WithIndex;
      if (targetObject) {
        // If an object with the specified random index exists, update its quantity
        targetObject.quantity = updatedQuantity;
      }
      return newData; // Set the updated data
    });
  };

  function addGroup() {
    // Get random index
    const randNum = generateRandomLong();

    // Create a newGroup object
    const newGroup: GroupHeading = {
        index: randNum,
        heading: groupValue // Assuming groupValue is a string
    };

    // Add the newGroup object to the data array
    setData((prevData) => [...prevData, newGroup]);
    setGroupValue('')
}


  //This handles, product lookup and adding it to the list that holds the data for the table that is drawn.
  async function getNextProduct(): Promise<WithIndex[]> {
    try {
      const id = encodeURIComponent(productSearchValue) //cleanse the data so it can be read properly
      const url = buildURL()
      const response = await axios.get(`${url}/api/product/${id}`);
      const newProd = response.data.prod;
  
      if (newProd.length === 0) {
        console.log('No Product Found');
        setConditionalFormat(true); //turn flag on to tell your app the product wasn't found so you can validate data for the user
      } else {
        console.log('Product Found');
        const indexedData = updateProductsWithNewProperties(newProd, data.length);
        setData((prevData) => [...prevData, ...indexedData]); // Update state with spread operator
        setConditionalFormat(false); //turn flag to signal no error
        setProductSearchValue(''); //clear searchbox on success, only when product isn't found do you not clear
      }    
      return newProd;
    } catch (err) {
      console.log(`Unsuccessful API Call: ${err}`);
      return []; // Return an empty array or handle the error as needed
    }
  }

  const deleteProduct = (index: number) => {
    setData((prevData) =>
      prevData.filter((data) => data.index !== index) 
    );
  };

  function getPrice(num: number, quantity: number) {
    if(!quantity) { // We don't want to calculate when the user removes the number to type another in.
      quantity = 1
    }
    return ((num * Number(discount))*quantity).toFixed(2)
  }

  const getTotalPrice = () => {    
    return data.reduce((total, product) => {
        const newData = product as WithIndex;
        const price = isNaN(Number(newData.prodListPrice)) ? 0 : Number(newData.prodListPrice);
        const quantity = newData.quantity ? newData.quantity : 1;
        return total + price * quantity * Number(discount);
    }, 0);
};

  return (
    <> 
      <div className="w-8/10 mx-auto rounded-md max-w-screen-lg mt-6"> {/* encapsulating div (80% width, rounded corners) */}
      <div className="flex justify-end py-3 print:hidden"> {/* User Input Component */}
        <div className="px-3">
        <Select onValueChange={setDiscount}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Discount"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">List</SelectItem>
            <SelectItem value=".4">60%</SelectItem>
            <SelectItem value=".5">50%</SelectItem>
            <SelectItem value=".6">40%</SelectItem>
          </SelectContent>
        </Select>
        </div>
      <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Add</Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="product">Product</Label>          
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-4">              
            <input type="text" id="productInput" value={productSearchValue} onChange={handleInputChange} className={`border rounded-md w-36 pl-2 ${conditionalFormat ? 'text-red-500 border-red-500' : 'text-black border-gray-400'}`}></input>
            <Button variant="secondary" size="icon" onClick={(e) => getNextProduct()}><h4>Add</h4></Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="groupSection">Group Section</Label>           
          </div>
          <div className="flex items-center gap-4">   
            <input type="text" id="groupInput" value={groupValue} onChange={handleGroupChange} className="border rounded-md w-36 pl-2 border-gray-400"></input>          
            <Button variant="secondary" size="icon" onClick={(e) => addGroup()}><h4>Add</h4></Button>
          </div>            
        </div>
      </div>
      </PopoverContent>
    </Popover>

        {/* <input type="text" id="productInput" value={productSearchValue} onChange={handleInputChange} className={`${conditionalFormat ? 'text-red-500 border-red-500' : 'text-black border-gray-400'}`}></input>
        <Button variant="outline" onClick={(e) => getNextProduct()}>Add Product</Button> */}
      </div>
        <Reorder.Group values={data} onReorder={setData}>
          <div className="grid grid-cols-[8%_12%_65%_10%_5%] rounded-md border border-gray-400 mb-3"> {/* Grid container (5 columns, gap, border, rounded corners) */}
            <div className="px-2 py-1 text-left font-bold">Qty</div>
            <div className="px-2 py-1 text-left font-bold">ID</div>
            <div className="px-2 py-1 text-left font-bold">Description</div>
            <div className="px-2 py-1 text-left font-bold">Price</div>
            <div className="px-2 py-1 text-center font-bold"></div>
          </div>

          {data.map((item) => (
        <Reorder.Item key={item.index} value={item}>              
            <div className="grid grid-cols-[8%_12%_65%_10%_5%] border-b border-gray-400"> {/* Row (grid, 5 columns, gap, bottom border) */}
                { 'heading' in item ? (
                    <>                                        
                      <div className="py-1 text-center col-span-4">{item.heading}</div>
                      <div className="px-2 py-1 text-center print:hidden"><button onClick={(e) => deleteProduct(item.index)}><Image alt="Delete" height="24" width="24" src='/icons/iconmonstr-trash-can-lined-24.png' /></button></div>
                    </>
                ) : (
                    <>
                        <div className="py-1 text-center"><input className="border-gray-400 w-14 px-2" type="number" min="1" id={item.index.toString()} placeholder={item.quantity.toString()} onChange={(e) => handleQuantityChange(e, item.index)} /></div>
                        <div className="px-2 py-1 text-left">{(item as WithIndex).prodNumber}</div>
                        <div className="px-2 py-1 text-left">{(item as WithIndex).prodDescription}</div>
                        <div className="px-2 py-1 text-left">${getPrice((item as WithIndex).prodListPrice, (item as WithIndex).quantity)}</div>
                        <div className="px-2 py-1 text-center print:hidden"><button onClick={(e) => deleteProduct(item.index)}><Image alt="Delete" height="24" width="24" src='/icons/iconmonstr-trash-can-lined-24.png' /></button></div>
                    </>
                )}
            </div>
        </Reorder.Item>
))}

          <div className="grid grid-cols-[8%_12%_65%_10%_5%] rounded-md border-b border-gray-400"> {/* Grid container (5 columns, gap, border, rounded corners) */}
            <div className="px-2 py-1 text-center font-bold"></div>
            <div className="px-2 py-1 text-center font-bold"></div>
            <div className="px-4 py-1 text-right font-bold">Total: </div>
            <div className="px-2 py-1 text-center font-bold">${getTotalPrice().toFixed(2)}</div>
            <div className="px-2 py-1 text-center font-bold"></div>
          </div>
        </Reorder.Group>
      </div>
    </>
  );
}
