import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ICategoryItem} from "./types.ts";
import http_common from "../../../http_common.ts";
import { APP_ENV } from "../../../env/index.ts";
import ModalDelete from "../../common/ModalDelete.tsx";
// import ModalDelete from "../../../common/ModalDelete.tsx";

const CategoryListPage = () => {
    const [list, setList] = useState<ICategoryItem[]>([]);

    const getData = () => {
        http_common
            .get<ICategoryItem[]>("api/categories")
            .then((resp) => {
                //console.log("Categories", resp.data);
                setList(resp.data);
            });
    }
    useEffect(() => {
        getData();
    }, []);

    const DeleteCategoryHandler = (id: number | string | undefined) => {
        http_common
          .delete(`api/categories/${id}`)
          .then((resp) => {
            setList(list.filter((x) => x.id !== id));
          });
      };

    const content = list.map((c) => {
        return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            key={c.id}>
            <td className="w-32 p-4">
                <img src={`${APP_ENV.BASE_URL}/uploading/600_${c.image}`}
                    alt={`${c.name}`}/>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {c.name}
            </td>

            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {c.description}
            </td>
            <td className="px-6 py-4">
                <Link to={`category/edit/${c.id}`} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Змінить</Link>
                <ModalDelete
          id={c.id}
          deleteFunc={DeleteCategoryHandler}
          title="Видалення товара"
          text={`Ви дійсно бажаєте видалити категорію '${c.name}'?`}
        />
          &nbsp; &nbsp;
            </td>
        </tr>
        );
    });

    return (
        <>
            <div className="mx-auto text-center">
                <h1 className="text-3xl  font-bold text-black sm:text-5xl">Список категорій</h1>
            </div>
            <Link to="/create"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded">
                Додати
            </Link>

            <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Назва
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Опис
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {content}
                    </tbody>
                </table>
            </div>


        </>
    );
};

export default CategoryListPage;
