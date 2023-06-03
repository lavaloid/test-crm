import { ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Metadata } from "next";
import Link from "next/link";

import styles from "./layout.module.scss";

type LayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Client Info",
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className={styles.pageContainer}>
        <Link href="/" className={styles.backButton}>
          <FaArrowLeft className={styles.backIcon} />
          <span>Back</span>
        </Link>
        {children}
      </main>
    </>
  );
}
