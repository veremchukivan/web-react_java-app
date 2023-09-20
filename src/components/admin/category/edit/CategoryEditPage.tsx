import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import http_common from "../../../../http_common";
import { APP_ENV } from "../../../../env";
import defaultImage from "../../../../assets/default-image.jpg";
import InputGroup from "../../../common/InputGroup";
import TextGroup from "../../../common/TextGroup";
import { ICategoryEdit, ICategoryItem } from "../../../category/types";
import * as Yup from "yup"; // Import Yup

const CategoryEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [oldImage, setOldImage] = useState<string>("");

  const init: ICategoryEdit = {
    id: id ? Number(id) : 0,
    name: "",
    image: null,
    description: "",
  };

  const editCategorySchema = Yup.object().shape({
    name: Yup.string().required("Назва обов'язкова"),
    image: Yup.mixed(),
    description: Yup.string(),
  });

  const onFormikSubmit = async (values: ICategoryEdit) => {
    try {
      const result = await http_common.put(`/category/${id}`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch {
      console.log("Server error");
    }
  };

  const formik = useFormik({
    initialValues: init,
    onSubmit: onFormikSubmit,
    validationSchema: editCategorySchema, // Apply validation schema
  });

  const { values, handleChange, handleSubmit, setFieldValue, errors, touched, handleBlur } = formik;

  useEffect(() => {
    http_common.get<ICategoryItem>(`api/categories/${id}`).then((resp) => {
      const { data } = resp;
      setFieldValue("name", data.name);
      setOldImage(`${APP_ENV.BASE_URL}/uploading/600_${data.image}`);
      setFieldValue("description", data.description);
    });
  }, [id]);

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      if (file) {
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
        ];
        if (!allowedTypes.includes(file.type)) {
          alert("Не допустимий тип файлу");
          return;
        }
        setFieldValue(e.target.name, file);
      }
    }
  };

  const imgView = oldImage ? oldImage : defaultImage;

  return (
    <>
      <div className="mx-auto text-center">
        <h1 className="text-3xl  font-bold text-black sm:text-4xl">
          Зміна категорії
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <InputGroup
          label={"Назва"}
          value={values.name}
          handleChange ={handleChange}
          field={"name"}
          error={ errors.name} // Pass error and touched values
          touched={touched.name}
          handleBlur={handleBlur}
        />

        <div className="relative z-0 w-full mb-6 group">
          <label htmlFor="image" className={"cursor-pointer"}>
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Фото
            </span>
            <img
              className="h-36 rounded-lg object-fit-contain  shadow-xl shadow-blue-gray-900/50"
              src={
                values.image == null
                  ? imgView
                  : URL.createObjectURL(values?.image)
              }
              alt="nature image"
            />
          </label>

          <input
            type="file"
            id={"image"}
            name={"image"}
            className="hidden"
            onChange={onChangeFileHandler}
          />
        </div>

        <TextGroup
          label={"Опис"}
          field={"description"}
          onChange={handleChange}
          rows={4}
        />

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Змінити
        </button>
      </form>
    </>
  );
};

export default CategoryEditPage;
