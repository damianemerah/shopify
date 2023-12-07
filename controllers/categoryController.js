const Category = require('../models/categoryModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

function createCategory(categories, parentId = null) {
  const categoryList = [];
  let category;

  if (!parentId) {
    category = categories.filter((cat) => cat.parentId === undefined);
    console.log(1, category);
  } else {
    category = categories.filter(
      (cat) => JSON.stringify(cat.parentId) === JSON.stringify(parentId)
    );
    console.log(2, category);
  }

  category.map((cat) =>
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      children: createCategory(categories, cat._id),
    })
  );

  return categoryList;
}

exports.createCategory = catchAsync(async (req, res, next) => {
  const cat = await Category.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      cat,
    },
  });
});

exports.getAllCategory = catchAsync(async (req, res, next) => {
  Category.find().exec((err, category) => {
    if (err) return next(new AppError('Error', 404));

    const categories = createCategory(category);

    res.status(200).json({
      status: 'success',
      len: categories.length,
      categories,
    });
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate('parentId');
  // console.log(mongoose.Types.ObjectId(category.parentId));

  res.status(200).json({
    status: 'success',
    category,
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const cat = await Category.findByIdAndDelete(req.params.id);

  if (!cat) return next(new AppError('No category with the ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const cat = await Category.findOneAndUpdate(req.params.id, req.body);

  if (!cat) return next(new AppError('No category with the ID', 404));

  res.status(204).json({
    status: 'success',
    data: cat,
  });
});
