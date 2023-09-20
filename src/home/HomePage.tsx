import { useEffect, useState } from "react";
import { ICategoryItem } from "../components/category/types";
import { APP_ENV } from "../env";
import http_common from "../http_common";



const HomePage = () => {
  const [list, setList] = useState<Array<ICategoryItem>>([]);

  useEffect(() => {
    http_common.get(`api/categories`).then((resp) => {
      console.log("resp = ", resp);
      setList(resp.data);
    });
  }, []);
  console.log("List ", list);

  const content = list.map((category) => (
    <div key={category.id} className="group relative">
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
        <div className="picture-main">
          <img
            src={`${APP_ENV.BASE_URL}/uploading/600_${category.image}`}
            alt={category.name}
            className="picture-container"
          />
        </div>
      </div>
      <h3 className="mt-6 text-sm text-gray-500">
        <a href="#">
          <span className="absolute inset-0" />
          {category.name}
        </a>
      </h3>
      <p className="text-base font-semibold text-gray-900">
        {category.description}
      </p>
    </div>
  ));

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">
              Списко категорій
            </h2>

            <div
              className="mt-6 space-y-12 
                sm:grid sm:grid-cols-2 sm:gap-x-2 sm:space-y-0 
                md:grid md:grid-cols-3 md:gap-x-4 md:space-y-0 
                lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0"
            >
              {content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;