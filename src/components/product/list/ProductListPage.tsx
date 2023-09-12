import { useEffect, useState } from "react";

import { IProductItem } from "../types";
import http_common from "../../../http_common";
import ListGroup from "../../common/ListGroup";

const ProductListPage = () => {
  const [list, setList] = useState<Array<IProductItem>>([]);

  useEffect(() => {
    http_common
      .get<Array<IProductItem>>(`api/products`)
      .then((resp) => {
        console.log("resp = ", resp);
        setList(resp.data);
      });
  }, []);
  console.log("List data: ", list);

  const DeleteProductHandler = (id: number | string | undefined) => {
    http_common
      .delete(`api/products/${id}`)
      .then((resp) => {
        setList(list.filter((x) => x.id !== id));
      });
  };

  return (
    <>
    <ListGroup label={"Товарів"} DeleteProductHandler={DeleteProductHandler} items={list}/>
    </>
  );
};

export default ProductListPage;