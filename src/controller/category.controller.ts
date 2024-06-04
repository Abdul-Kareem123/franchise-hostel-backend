import { validationResult } from 'express-validator';
import { response, convertUTCToIST } from '../helper/commonResponseHandler';
import { errorMessage, clientError } from '../helper/ErrorMessage';
import { Category, CategoryDocument } from '../models/category.model';
import { Brand, BrandDocument } from '../models/brand.model';

var activity = "CATEGORY";

/**
 * @author Haripriyan K
 * @date 29-04-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is use to Create Category.
 */
export const createCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const createCategory: CategoryDocument = req.body;
            const date = new Date();
            createCategory.createdOn = convertUTCToIST(date);
            const createdCategory = new Category(createCategory);
            const insertData = await createdCategory.save();
            response(req, res, activity, 'Level-2', 'Add-Category', true, 200, insertData, clientError.success.fetchedSuccessfully, 'Category added successfully');
        } catch (err) {
            response(req, res, activity, 'Level-3', 'Add-Category', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Add-Category', false, 422, {}, errorMessage.fieldValidation, 'Invalid data in the request');
    }
};

/**
 * @author Haripriyan K
 * @date  30-04-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get the category.
 * */
export const getCategories = async (req, res, next) => {
    try {
      const categories = await Category.find({isDeleted:false});
      response(req, res, activity, 'Level-2', 'Get-Categories', true, 200, categories, clientError.success.fetchedSuccessfully, 'Categories fetched successfully');
    } catch (error) {
      response(req, res, activity, 'Level-3', 'Get-Categories', false, 500, {}, errorMessage.internalServer, error.message);
    }
};

/**
 * @author Haripriyan K
 * @date  30-04-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update the category.
 * */
export const updateCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const updateCategory : CategoryDocument = req.body;
            const date = new Date(); 
            const update = await Category.findByIdAndUpdate({ _id: updateCategory._id }, {
                $set:{
                categoryName: req.body.categoryName,
                categoryImage: req.body.categoryImage,
                modifiedOn: convertUTCToIST(date) },
                $push:{
                    subCategory: req.body.subCategory
                }
            });
            response(req, res, activity, 'Level-2', 'Update-Category', true, 200, update, clientError.success.fetchedSuccessfully, 'Category updated successfully');
        } catch (err) {
            response(req, res, activity, 'Level-3', 'Update-Category', false, 500, {}, errorMessage.internalServer, err.message);
    }}
}

/**
 * @author Haripriyan K
 * @date   07-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get Filtered Category
 */
export let getFilteredCategory = async (req, res, next) => {
    try {
        var findQuery;
        var andList: any = []
        var limit = req.body.limit ? req.body.limit : 0;
        var page = req.body.page ? req.body.page : 0;
        andList.push({ isDeleted: false })
        andList.push({ status: 1 })
        if(req.query.category){
            andList.push({category:req.query.category})
        }
        if(req.query.investmentAmount){
            andList.push({investmentAmount:req.query.investmentAmount})
        }
        findQuery = (andList.length > 0) ? { $and: andList } : {}
        const BrandList = await Brand.find(findQuery).sort({ createdAt: -1 }).limit(limit).skip(page);
        const BrandCount = await   Brand.find(findQuery).countDocuments();
        response(req, res, activity, 'Level-1', 'Get-FilterCategory', true, 200, { BrandList, BrandCount }, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-FilterCategory', false, 500, {}, errorMessage.internalServer, err.message);
    }
};