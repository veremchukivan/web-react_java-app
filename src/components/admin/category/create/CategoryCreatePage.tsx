import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import http_common from "../../../../http_common.ts";
import { ChangeEvent } from "react";
import InputGroup from "../../../common/InputGroup.tsx";
import TextGroup from "../../../common/TextGroup.tsx";
import { ICategoryCreate } from "../../../category/types.ts";
import * as Yup from "yup";

const CategoryCreatePage = () => {
  const navigate = useNavigate();

  const init: ICategoryCreate = {
    name: "",
    image: null,
    description: "",
  };

  const createCategorySchema = Yup.object().shape({
    name: Yup.string().required("Назва обов'язкова"),
    image: Yup.mixed().required("Фото обов'язкове"),
    description: Yup.string(),
  });

  const onFormikSubmit = async (values: ICategoryCreate) => {
    try {
      await http_common.post("api/categories", values, {
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
    validationSchema: createCategorySchema, // Apply validation schema
  });

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    handleBlur,
  } = formik;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    if (files) {
      const file = files[0];
      setFieldValue(target.name, file);
    }
    target.value = "";
  };
  return (
    <>
      <div className="mx-auto text-center">
        <h1 className="text-3xl  font-bold text-black sm:text-4xl">
          Додати категорію
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <InputGroup
          label={"Назва"}
          value={values.name}
          field={"name"}
          error={errors.name} // Pass error and touched values
          touched={touched.name}
          handleBlur={handleBlur}
          handleChange={handleChange}
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
                  ? "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
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
            onChange={handleFileChange}
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
          Додати
        </button>
      </form>
    </>
  );
};

export default CategoryCreatePage;
