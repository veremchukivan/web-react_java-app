import { ChangeEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IPorductCreate, IProductItem } from "../types";
import { ICategoryItem } from "../../category/list/types";
import http_common from "../../../http_common";
import InputGroup from "../../common/InputGroup";
import SelectGroup from "../../common/SelectGroup";
import TextGroup from "../../common/TextGroup";
import InputFileGroup from "../../common/InputFileGroup";

const ProductCreatePage = () => {
  const navigator = useNavigate();

  const [model, setModel] = useState<IPorductCreate>({
    name: "",
    description: "",
    files: [],
    price: 0,
    category_id: 1,
  });

  const [categories, setCategories] = useState<Array<ICategoryItem>>([]);

  useEffect(() => {
    http_common.get<Array<ICategoryItem>>(`/category`).then((resp) => {
      console.log("resp = ", resp);
      setCategories(resp.data);
    });
  }, []);

  const onChangeHandler = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    setModel({ ...model, [e.target.name]: e.target.value });
  };

  const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target.files) {
      const file = target.files[0];
      setModel({ ...model, files: [...model.files, file] });
    }
    target.value = "";
  };

  const onSubmitHandler = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // console.log("Send Server form", model);
      const result = await http_common.post<IProductItem>(
        `api/products`,
        model,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Result ", result);
      navigator("/");
    } catch (error: any) {}
  };

  const filesContent = model.files.map((f, index) => (
    <div key={index} className="mb-4">
      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          setModel({ ...model, files: model.files.filter((x) => x !== f) });
          console.log("click delete", f);
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

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="font-medium text-3xl">Додати товар</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="mt-8 grid lg:grid-cols-1 gap-4">
          <InputGroup
            label={"Назва"}
            value={model.name}
            onChange={onChangeHandler}
            field={"name"}
          />

          <InputGroup
            label={"Ціна"}
            value={model.price}
            onChange={onChangeHandler}
            field={"price"}
            type={"number"}
          />

          <SelectGroup
            label={"Категорія"}
            field={"category_id"}
            onChange={onChangeHandler}
            items={categories}
          />

          <TextGroup
            label={"Опис"}
            field={"description"}
            onChange={onChangeHandler}
            rows={4}
          />
           <InputFileGroup
            label={"Фото"}
            filesContent={filesContent}
            onChange={onFileChangeHandler} field={"selectImage"} filesOldContent={null}/>
          
        </div>
        <div className="space-x-4 mt-8">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
          >
            Додати
          </button>
          <Link
            to="/"
            className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
          >
            Скасувати
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProductCreatePage;
