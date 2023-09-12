import { FC } from "react";
import { IProductItem } from "../product/types";
import { Link } from "react-router-dom";
import { APP_ENV } from "../../env";
import ModalDelete from "./ModalDelete";

interface ListGroupProps {
  label: string;
  DeleteProductHandler: (id: number | string | undefined) => void;
  items: IProductItem[];
  // error?: string|undefined,
  // touched?: boolean|undefined
}

const ListGroup: FC<ListGroupProps> = ({
  label,
  items,
  DeleteProductHandler,
  // error,
  // touched
}) => {
  const content = items.map((item) => (
    <div key={item.id}>
      <Link to={`/products/view/${item.id}`}>
        <div className="group relative">
          <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
            <div className="picture-main">
              <img
                src={`${APP_ENV.BASE_URL}/uploading/600_${item.files[0]}`}
                alt={item.name}
                className="picture-container"
              />
            </div>
          </div>
          <h3 className="mt-6 text-sm text-gray-500">
            <a href="#">
              <span className="absolute inset-0" />
              {item.name}
            </a>
          </h3>
          <p className="text-base font-semibold text-gray-900">
            {item.price}&nbsp;$.
          </p>
        </div>
      </Link>

      <div className="mt-2">
        <Link
          to={"/products/edit/" + item.id}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Змінить
        </Link>
        <ModalDelete
          id={item.id}
          deleteFunc={DeleteProductHandler}
          title="Видалення товара"
          text={`Ви дійсно бажаєте видалити товар '${item.name}'?`}
        />
      </div>
    </div>
  ));

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Список {label}</h2>
            <div className="mt-2">
              <Link
                to="/products/create"
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
              >
                Додати
              </Link>
            </div>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListGroup;
