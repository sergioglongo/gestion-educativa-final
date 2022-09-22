import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./ItemDb";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../redux/actions";

//a

const NewsCarusel = (props) => {
  let dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <Carousel sx={{ m: 3 }}>
                {
                    news.map( (news, i) => <Item key={i} news={news} /> )
                }
    </Carousel>
  );
};

export default NewsCarusel;
