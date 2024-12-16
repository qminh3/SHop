import { v2 as cloudinary } from "cloudinary";
import productModel from '../models/productModel.js'


// thêm sản phẩm
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];

    const image3 = req.files.image3 && req.files.image3[0];

    const image4 = req.files.image4 && req.files.image4[0];

    // console.log(
    //   name,description,price,category,subCategory,sizes,bestseller,image1,image2,image
    // )
    // console.log(image1,image2,image3,image4)
    // res.json({})

    const images = [image1, image2, image3, image4].filter((item)=>item !== undefined)

    let imageUrl = await Promise.all(
        images.map(async (item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
            return result.secure_url
        })
    )
    const productData = {
        name,
        description,
        price:Number(price),
        category,
        subCategory,
        sizes:JSON.parse(sizes),
        bestseller: bestseller === "true" ? true:false,
        image: imageUrl,
        date : Date.now()
      };
    const product = new productModel(productData)
    await product.save();
    // const product = await Product.create(productData);
    res.json({success:true,message:"them sp moi"});
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// sản phẩm
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
          });
    }
};

// sửa sản phẩm
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Xoa sp thành công" });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
          });
    }

};
//thong tin san pham
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
          });
    }
};
export { addProduct, listProduct, removeProduct, singleProduct };
