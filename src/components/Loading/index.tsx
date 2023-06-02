import { CSSProperties } from "react";
import { FaSpinner } from "react-icons/fa";
import classNames from "classnames";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  style?: CSSProperties;
};

export const Loading = (props: Props) => {
  const { className, style } = props;

  return (
    <FaSpinner
      className={classNames(className, styles.spinner)}
      style={style}
    />
  );
};
