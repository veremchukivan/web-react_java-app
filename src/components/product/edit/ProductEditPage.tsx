import { ChangeEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IPorductEdit, IProductItem } from "../types";
import { ICategoryItem } from "../../category/list/types";
import http_common from "../../../http_common";
import { APP_ENV } from "../../../env";
import InputGroup from "../../common/InputGroup";
import SelectGroup from "../../common/SelectGroup";
import InputFileGroup from "../../common/InputFileGroup";
import TextGroup from "../../common/TextGroup";

const ProductEditPage = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  console.log("id", id);

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
      //console.log("resp = ", resp);
      setCategories(resp.data);
    });

    http_common.get<IProductItem>(`api/products/${id}`).then((resp) => {
      const { files, name, price, category_id, description } = resp.data;
      setOldImages(files);
      setModel({ ...model, name, price, description, category_id });
      console.log("data", resp.data);
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
    //console.log("files", e.target.files);
    const { target } = e;
    if (target.files) {
      const file = target.files[0];
      setModel({ ...model, files: [...model.files, file] });
    }
  };
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await http_common.put(`api/products/${id}`, model, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigator("/");
    } catch (e: any) {}
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

  const DataProductsOld = oldImages.map((product, index) => (
    <div key={index} className="mb-4">
      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          setModel({ ...model, removeFiles: [...model.removeFiles, product] });
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
            onChange={onFileChangeHandler}
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
