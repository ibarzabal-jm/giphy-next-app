import React from "react";
import Masonry from "react-masonry-css";

import {Gif} from "../../types/ApiResponse";
import GifCard from "../GifCard/GifCard";

import styles from "./ListGifs.module.scss";

interface Props {
  gifs: Gif[];
  keyword?: string;
  className?: string;
  style?: React.CSSProperties;
  masonry?: boolean;
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const ListOfGifs: React.FC<Props> = ({keyword, gifs, className, style, masonry = true}) => {
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {keyword && (
        <h3 aria-label={keyword} className={styles.title} role="heading">
          {keyword.split("").map((char, index) => (
            <span
              key={index}
              aria-hidden="false"
              className={index % 2 === 0 ? "" : index % 3 === 0 ? styles.blink2 : styles.blink3}
            >
              {char}
            </span>
          ))}
        </h3>
      )}
      {masonry ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonry_grid}
          columnClassName={styles.masonry_grid_column}
        >
          {gifs.map((gif) => (
            <GifCard key={gif.id} image={gif} />
          ))}
        </Masonry>
      ) : (
        <div className={styles.grid}>
          {gifs.map((gif) => (
            <GifCard
              key={gif.id}
              height={masonry ? undefined : "300px"}
              image={gif}
              width={masonry ? undefined : "300px"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListOfGifs;
