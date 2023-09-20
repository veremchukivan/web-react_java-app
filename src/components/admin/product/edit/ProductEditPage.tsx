import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import http_common from "../../../../http_common";
import InputGroup from "../../../common/InputGroup";
import SelectGroup from "../../../common/SelectGroup";
import InputFileGroup from "../../../common/InputFileGroup";
import TextGroup from "../../../common/TextGroup";
import { ICategoryItem } from "../../../category/types";
import { IPorductEdit, IProductItem } from "../../../product/types";
import { APP_ENV } from "../../../../env";

const ProductEditPage = () => {
  const navigator = useNavigate();
  const { id } = useParams();

  const [model, setModel] = useState<IPorductEdit>({
    name: "",
    category_id: "",
    price: 0,
    description: "",
    files: [],
    removeFiles: [],
  });

  const [oldImages, setOldImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Array<ICategoryItem>>([]);

  useEffect(() => {
    http_common.get<Array<ICategoryItem>>(`api/categories`).then((resp) => {
      setCategories(resp.data);
    });

    http_common.get<IProductItem>(`api/products/${id}`).then((resp) => {
      const { files, name, price, category_id, description } = resp.data;
      setOldImages(files);
      setModel({ ...model, name, price, description, category_id });
    });
  }, []);

  const createProductSchema = Yup.object().shape({
    name: Yup.string().required("Назва обов'язкова"),
    price: Yup.number().required("Ціна обов'язкова"),
    category_id: Yup.number().required("Категорія обов'язкова"),
    description: Yup.string(),
  });

  const formik = useFormik({
    initialValues: model,
    validationSchema: createProductSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price.toString());
        formData.append("category_id", values.category_id.toString());
        formData.append("description", values.description);

        for (let i = 0; i < values.files.length; i++) {
          formData.append("files", values.files[i]);
        }

        const result = await http_common.put(`api/products/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        navigator("/");
      } catch (error: any) {
        console.error("Error: ", error);
      }
    },
  });

  const filesContent = model.files.map((f, index) => (
    <div key={index} className="mb-4">
      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          formik.setFieldValue(
            "files",
            model.files.filter((x) => x !== f)
          );
        }}
      >
        <FaTrash className="m-2 " />
      </Link>
      <div className="relative">
        <div style={{ height: "150px" }}>
          <div className="picture-main">
            <img
              src={URL.createObjectURL(f)}
              className="picture-container"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  ));

  const DataProductsOld = oldImages.map((product, index) => (
    <div key={index} className="mb-4">
      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          formik.setFieldValue(
            "removeFiles",
            [...model.removeFiles, product]
          );
          setOldImages(oldImages.filter((x) => x !== product));
        }}
      >
        <FaTrash className="m-2 " />
      </Link>
      <div className="relative">
        <div style={{ height: "150px" }}>
          <div className="picture-main">
            <img
              src={`${APP_ENV.BASE_URL}/uploading/300_${product}`}
              className="picture-container"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="mx-auto max-w-7xl px-6">
      <h1 className="font-medium text-3xl">Зміна товару</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-8 grid lg:grid-cols-1 gap-4">
          <InputGroup
            label={"Назва"}
            value={formik.values.name}
            handleChange={formik.handleChange}
            field={"name"}
            error={ formik.errors.name}
            handleBlur={formik.handleBlur}
          />

          <InputGroup
            label={"Ціна"}
            value={formik.values.price}
            handleChange={formik.handleChange}
            field={"price"}
            type={"number"}
            error={formik.errors.price}
            handleBlur={formik.handleBlur}
          />

          <SelectGroup
            label={"Категорія"}
            field={"category_id"}
            value={formik.values.category_id}
            onChange={formik.handleChange}
            items={categories}
          />

          <TextGroup
            label={"Опис"}
            field={"description"}
            value={formik.values.description}
            onChange={formik.handleChange}
            rows={4}
          />
          <InputFileGroup
            label={"Фото"}
            filesContent={filesContent}
            onChange={(e) => {
              const fileList = e.target.files;
              if (fileList) {
                formik.setFieldValue("files", [...fileList]);
              }
            }}
            field={"selectImage"}
            filesOldContent={DataProductsOld}
          />
        </div>
        <div className="space-x-4 mt-8">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
          >
            Save
          </button>
          <button className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEditPage;
