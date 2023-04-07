import React, { useEffect, useRef, useState } from "react";

import styles from "./Accordion.module.scss";

function Accordion(props) {
  const [active, setActive] = useState(false);
  const content = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    console.log("Height for ", props.title, ": ", height);
  }, [height]);

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? "0px" : `${content.current.scrollHeight}px`);
  }

  return (
    <div className={styles.accordion__section}>
      <div
        className={`${styles.accordion} ${active ? `${styles.active}` : ""}`}
        onClick={toggleAccordion}>
        <p className={styles.accordion__title}>{props.title}</p>
        <span style={{ marginLeft: "20px" }}>
          {active ? (
            <img
              src="img/faq-arr.svg"
              className={`${styles.accordion__icon} ${styles.rotate}`}
              alt=""
            />
          ) : (
            <img src="img/faq-arr.svg" className={`${styles.accordion__icon}`} alt="" />
          )}
        </span>
      </div>
      <div ref={content} style={{ maxHeight: `${height}` }} className={styles.accordion__content}>
        <div
          className={styles.accordion__text}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default Accordion;
