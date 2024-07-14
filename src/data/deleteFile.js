import { deleteObject, ref } from "firebase/storage";
import { storage } from "../pages/upload";

const deleteFileFromFB = async (filepath) => {
    try {
        if (!filepath) {
            return false;
        }
        const fileRef = ref(storage,filepath)
        await deleteObject(fileRef);
        return true;
        
    } catch (err) {
        console.log(err)
        return false
    }

}


const result = deleteFileFromFB("https://firebasestorage.googleapis.com/v0/b/khatmia-firebase.appspot.com/o/books%2F%D8%B9%D9%84%D9%88%D9%85%20%D8%A7%D9%84%D8%AA%D8%B2%D9%83%D9%8A%D8%A9%2F%D8%A7%D9%84%D8%B1%D8%B3%D8%A7%D8%A6%D9%84%20%D8%A7%D9%84%D9%85%D9%8A%D8%B1%D8%BA%D9%86%D9%8A%D8%A9%2F%D8%A7%D9%84%D8%B1%D8%B3%D8%A7%D8%A6%D9%84%20%D8%A7%D9%84%D9%85%D9%8A%D8%B1%D8%BA%D9%86%D9%8A%D8%A9?alt=media&token=8699183a-fd56-4539-a98d-d89f6f0416a7")

console.log(result)