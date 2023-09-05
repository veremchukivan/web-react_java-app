import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ICategoryEdit } from "./types";
import http_common from "../../../http_common";
import { ICategoryItem } from "../list/types";
import { APP_ENV } from "../../../env";
import defaultImage from "../../../assets/default-image.jpg";

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

  const onFormikSubmit = async (values: ICategoryEdit) => {
    //console.log("Send Formik Data", values);
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
  });

  const { values, handleChange, handleSubmit, setFieldValue } = formik;

  useEffect(() => {
    http_common.get<ICategoryItem>(`category/${id}`).then((resp) => {
      const { data } = resp;
      setFieldValue("name", data.name);
      //setFieldValue("image", data.image);
      //посилання на фото, яке було у категорії
      setOldImage(`${APP_ENV.BASE_URL}/uploading/600_${data.image}`);
      setFieldValue("description", data.description);
    });
  }, [id]);

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      if (file) {
        //Перевірка на тип обраного файлу - допустимий тип jpeg, png, gif
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
          Зміна категорій
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Назва
          </label>
          <input
            type="text"
            id="name"
            name={"name"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Назва"
            value={values.name}
            onChange={handleChange}
          />
        </div>

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

        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Опис
          </label>
          <textarea
            id="description"
            rows={4}
            name={"description"}
            onChange={handleChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={values.description}
            placeholder="Опис"
          ></textarea>
        </div>

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
