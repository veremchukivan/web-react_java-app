import { ICategory, ICategoryCreate } from "../../../../entities/Category.ts";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import http_common from "../../../../http_common.ts";
import InputGroup from "../../../../common/InputGroup.tsx";
import TextAreaGroup from "../../../../common/TextAreaGroup.tsx";
import ImageGroup from "../../../../common/ImageGroup.tsx";

function CategoryCreate() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    http_common.get("api/categories").then((resp) => {
      setCategories(resp.data);
    });
  }, []);

  const initialValues: ICategoryCreate = {
    name: "",
    description: "",
    image: null,
  };

  const categorySchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(255, "Name must be smaller")
      .test("unique-category", "Category already exists", function (value) {
        if (!value) {
          return false;
        }
        const categoryExists = categories.some(
          (c: ICategory) => c.name.toLowerCase() === value.toLowerCase(),
        );
        return !categoryExists;
      }),
    description: Yup.string()
      .required("Description is required")
      .max(4000, "Description must be smaller"),
    image: Yup.mixed().required("Image is required"),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values: ICategoryCreate) => {
    try {
      await categorySchema.validate(values);

      await http_common.post("api/categories", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("..");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={categorySchema}
      >
        {({
          handleChange,
          values,
          errors,
          touched,
          setFieldValue,
          handleBlur,
        }) => (
          <Form>
            <i
              className="bi bi-arrow-left-circle-fill back-button"
              onClick={() => navigate("..")}
            ></i>
            <InputGroup
              label="Name"
              type="text"
              field="name"
              handleBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              handleChange={handleChange}
            ></InputGroup>
            <TextAreaGroup
              label="Description"
              field="description"
              handleChange={handleChange}
              error={errors.description}
              touched={touched.description}
              handleBlur={handleBlur}
            ></TextAreaGroup>
            <ImageGroup
              image={values.image}
              setFieldValue={setFieldValue}
              error={errors.image}
              touched={touched.image}
            ></ImageGroup>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CategoryCreate;
