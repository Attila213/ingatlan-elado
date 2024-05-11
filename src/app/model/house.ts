import { HouseFeatures } from "./house_features"
import { HouseImage } from "./house_images"
import { HouseLocation } from "./house_location"
import { User } from "./user"



export interface House {
    id:string,
    price:number
    owner:User
    images:HouseImage[]
    features:HouseFeatures
    location:HouseLocation
}
