/*
 * @Author: marineyulxl
 * @Date: 2023-04-01 19:26:53
 * @LastEditTime: 2023-04-03 20:24:48
 */
const categoryModel = require('../models/category')

class CategoryController {
    //添加分类
    async createCategory(req, res) {
        const { name } = req.body;
        try {
            const existingCategory = await categoryModel.findOne({ name });

            if (existingCategory) {
                return res.status(400).json({
                    code: 400,
                    message: '该分类已经存在'
                });
            }
            const createdCategory = await categoryModel.create({ name });

            res.status(200).json({
                code: 200,
                message: '创建成功',
                data: createdCategory
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                code: 500,
                message: '服务器错误'
            });
        }
    }
    // 查询
    async findAllCategories(req, res) {
        try {
          const categories = await categoryModel.find();
      
          if (!categories.length) {
            return res.status(404).json({
              code: 404,
              message: '分类不存在'
            });
          }
      
          res.status(200).json({
            code: 200,
            message: '查询成功',
            data: categories
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({
            code: 500,
            message: '服务器错误'
          });
        }
      }
    //  修改
    async updateCategory(req, res) {
        const { id } = req.params;
        const { name } = req.body;
      
        try {
          const category = await categoryModel.findById(id);
      
          if (!category) {
            return res.status(404).json({
              code: 404,
              message: '分类不存在'
            });
          }
      
          category.name = name;
          await category.save();
      
          res.status(200).json({
            code: 200,
            message: '修改成功',
            data: category
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({
            code: 500,
            message: '服务器错误'
          });
        }
      }
    // 删除       
    async deleteCategory(req, res) {
        const { id } = req.params;
      
        try {
          const category = await categoryModel.findById(id);
      
          if (!category) {
            return res.status(404).json({
              code: 404,
              message: '分类不存在'
            });
          }
      
          await category.remove();
      
          res.status(200).json({
            code: 200,
            message: '删除成功'
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({
            code: 500,
            message: '服务器错误'
          });
        }
      }
      
}
module.exports = new CategoryController()